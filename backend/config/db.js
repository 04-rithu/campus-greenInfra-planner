const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'campusGreenDB'
    });
    console.log("MongoDB Connected to campusGreenDB");
  } catch (error) {
    console.error("CRITICAL: MongoDB connection failed:", error.message);
    console.error("Check your MONGO_URI in Render environment variables!");
    // Don't exit(1), let the server stay alive for diagnostics
  }
};

module.exports = connectDB;
