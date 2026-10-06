import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],


    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
