import express from "express";
import {
  createDestination,
  updateDestination,
  deleteDestination,
  getAllDestinationsAdmin,
} from "../controllers/destinationController.js";

import protect, { adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

import {
  getAdminStats,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/destinations", protect, adminOnly, getAllDestinationsAdmin);
router.get("/stats", protect, adminOnly, getAdminStats);

router.post(
  "/destinations",
  protect,
  adminOnly,
  upload.array("images", 5),
  createDestination
);

router.put(
  "/destinations/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateDestination
);

router.delete(
  "/destinations/:id",
  protect,
  adminOnly,
  deleteDestination
);

export default router;
