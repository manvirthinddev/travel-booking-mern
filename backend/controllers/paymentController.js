import Booking from "../models/Booking.js";

// Fake payment 

export const fakePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "paid";
    await booking.save();

    res.status(200).json({
      message: "Payment successful (simulated)",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment simulation failed",
      error: error.message,
    });
  }
};
