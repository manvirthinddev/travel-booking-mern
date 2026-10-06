import Booking from "../models/Booking.js";

// Create new booking

export const createBooking = async (req, res) => {
  try {
    const {
      destination,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
    } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      destination,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// Get logged-in user's bookings
export const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate({
        path: "destination",
        select: "title country images pricePerNight",
      })
      .populate({
        path: "user",
        select: "email name",
      });

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};

export const markBookingPaid = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.paymentStatus = "paid";

    await booking.save();

    res.json({
      message: "Payment recorded successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



//  Update booking payment status (Admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = paymentStatus;
    await booking.save();

    res.status(200).json({
      message: "Booking payment status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update booking status",
    });
  }
};

//  Cancel booking (User)
export const cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

 
    booking.bookingStatus = "cancelled";
    booking.cancelReason = reason || "No reason provided";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Cancellation failed",
    });
  }
};


// Get all bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "email")
      .populate("destination", "title country")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};

// Delete booking (Admin)
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete booking",
    });
  }
};
