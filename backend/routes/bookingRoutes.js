import express from "express";
import {
  createBooking,
  getMyBookings,
  updateBookingStatus,
  getAllBookings,
} from "../controllers/bookingController.js";

import protect from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/authMiddleware.js";
import { cancelBooking } from "../controllers/bookingController.js";
import { markBookingPaid } from "../controllers/bookingController.js";

const router = express.Router();

// ADMIN ROUTE
router.get("/", protect, adminOnly, getAllBookings);

// USER ROUTES
router.get("/my", protect, getMyBookings);
router.post("/", protect, createBooking);

// ADMIN UPDATE
router.put("/:id/status", protect, adminOnly, updateBookingStatus);

router.put("/cancel/:id", protect, cancelBooking);

router.put("/pay/:id", protect, markBookingPaid);

export default router;
