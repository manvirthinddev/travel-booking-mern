import Destination from "../models/Destination.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";


export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDestinations = await Destination.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const cancelledBookings = await Booking.countDocuments({
      bookingStatus: "cancelled",
    });

    const confirmedBookings = await Booking.countDocuments({
      bookingStatus: "confirmed",
    });

    const pendingBookings = await Booking.countDocuments({
      paymentStatus: "pending",
    });

    //  ONLY PAID BOOKINGS COUNTED
    const paidBookings = await Booking.find({
      paymentStatus: "paid",
    });

    const totalRevenue = paidBookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      totalUsers,
      totalDestinations,
      totalBookings,
      cancelledBookings,
      confirmedBookings,
      pendingBookings,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load admin stats",
    });
  }
};

