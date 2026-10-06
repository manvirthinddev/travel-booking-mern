import express from "express";
import {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

import protect, { adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();


//  Get all destinations
router.get("/", getAllDestinations);

//  Get single destination
router.get("/:id", getDestinationById);

// ADMIN ROUTES

// Create
router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  createDestination
);

// Update
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateDestination
);

// Delete
router.delete("/:id", protect, adminOnly, deleteDestination);

export default router;
