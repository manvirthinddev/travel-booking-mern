import express from "express";
import { getMyProfile } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import { changePassword } from "../controllers/userController.js";


const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/change-password", protect, changePassword);

export default router;
