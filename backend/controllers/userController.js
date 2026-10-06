import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Get logged-in user profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

// Change user password

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Get logged-in user
    const user = await User.findById(req.user._id);

    // Check current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to change password",
    });
  }
};