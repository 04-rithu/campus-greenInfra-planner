require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campusGreenDB";

const checkUsers = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const users = await User.find({}, { password: 0 }); // Don't log passwords
        console.log("Current Users in DB:");
        console.log(JSON.stringify(users, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("Error checking users:", err);
        process.exit(1);
    }
};

checkUsers();
