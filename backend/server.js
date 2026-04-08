const express = require("express");
require("dotenv").config();
const cors = require("cors");
const demoMiddleware = require("./middleware/demoMode");

const connectDB = require("./config/db");

// Route imports
const plannerRoutes = require("./routes/plannerRoutes");
const wateringRoutes = require("./routes/wateringRoutes");
const pesticideRoutes = require("./routes/pesticideRoutes");
const trimmingRoutes = require("./routes/trimmingRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
const authRoutes = require("./routes/authRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();

// ✅ SIMPLE CORS
app.use(cors({ origin: "*" }));
app.use(express.json());

// 🚨 DEMO MODE (For Staff Presentation - 300 records per module)
// app.use(demoMiddleware);

// ✅ Health Check
app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Backend is running" }));

// ✅ DB Diagnostic Check
app.get("/api/db-test", async (req, res) => {
  try {
    const User = require("./models/User");
    await User.findOne();
    res.json({ status: "Success", message: "Database is connected!" });
  } catch (err) {
    res.status(500).json({ 
      status: "Failed", 
      message: "Database connection failed", 
      error: err.message,
      tip: "Check your MONGO_URI and Atlas IP Whitelist (0.0.0.0/0)"
    });
  }
});

// Database connection moved to server start for bypass stability
// connectDB(); // Deactivating here to avoid blocking startup

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api", plannerRoutes);
app.use("/api/watering", wateringRoutes);
app.use("/api/pesticide", pesticideRoutes);
app.use("/api/trimming", trimmingRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/export", exportRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("CRITICAL ERROR:", err.message);
  res.status(500).json({
    message: "Server Error",
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// ✅ Server Start (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? "Set" : "Missing"}`);
  console.log(`MONGO_URI: ${process.env.MONGO_URI ? "Set" : "Missing"}`);
  
  // Connect to DB in the background to avoid blocking login bypass
  connectDB();
});