import dns from "dns";
dns.setServers(["8.8.8.8"]);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "./config/cloudinary.js"; 

// Routes
import authRoutes from "./routes/authRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Middleware
import protect from "./middlewares/authMiddleware.js";

const app = express();

//  Connect DB
connectDB();

//  Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

//  Test Route
app.get("/", (req, res) => {
  res.send("🌍 Travel Booking Backend API Running...");
});

//  Protected Route
app.get("/api/test/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route ✅",
    user: req.user,
  });
});

//  Debug 
console.log("Cloud:", process.env.CLOUDINARY_CLOUD_NAME);

//  Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
