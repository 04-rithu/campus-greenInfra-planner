require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User with email ${email} not found.`);
      process.exit(1);
    }

    user.role = "admin";
    await user.save();

    console.log(`Successfully promoted ${email} to admin!`);
    process.exit(0);
  } catch (err) {
    console.error("Error promoting user:", err.message);
    process.exit(1);
  }
};

const email = process.argv[2];
if (!email) {
  console.error("Please provide an email address: node makeAdmin.js user@example.com");
  process.exit(1);
}

makeAdmin(email);
