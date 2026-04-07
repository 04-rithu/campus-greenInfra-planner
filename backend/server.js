const express = require("express");
require("dotenv").config();
const cors = require("cors");

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

// 🚨 EMERGENCY BYPASS (For Staff Presentation)
app.post("/api/auth/login", (req, res) => {
  res.json({
    message: "Login successful",
    token: "demo-token",
    user: { id: "demo", name: "Staff Demo", email: req.body.email, role: "user" }
  });
});

// ✅ Mock Data for Dashboards
app.get("/api/zones", (req, res) => res.json([
  { _id: "1", zoneId: "Z-01", name: "Main Garden", status: "Healthy" },
  { _id: "2", zoneId: "Z-02", name: "Hostel Lawn", status: "Healthy" }
]));
app.get("/api/watering", (req, res) => res.json([]));
app.get("/api/trimming", (req, res) => res.json([]));
app.get("/api/waste", (req, res) => res.json([]));

// ✅ Health Check
app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Backend is running" }));

// ✅ Connect DB
connectDB();

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
  console.error("ERROR:", err.message);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message
  });
});

// ✅ Server Start (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? "Set" : "Missing"}`);
  console.log(`MONGO_URI: ${process.env.MONGO_URI ? "Set" : "Missing"}`);
});