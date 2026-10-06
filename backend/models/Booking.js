import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    checkInDate: Date,
    checkOutDate: Date,
    guests: Number,
    totalPrice: Number,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },


    bookingStatus: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },


    cancelReason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
