require("dotenv").config();
const mongoose = require("mongoose");
const Zone = require("./models/Zone");
const Watering = require("./models/Watering");
const Pesticide = require("./models/Pesticide");
const Trimming = require("./models/Trimming");
const Waste = require("./models/Waste");
const Suggestion = require("./models/Suggestion");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campusGreenDB";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected for production seeding...");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDatabase = async () => {
  try {
    console.log("Starting production data seeding...");

    // 1. Clear existing data (optional, but requested "i need the same datas")
    // If the user wants to ADD to existing, I should avoid deleteMany.
    // However, they said "i dont hav the datas", so clearing and starting fresh with their zones is better.
    await Zone.deleteMany({});
    await Watering.deleteMany({});
    await Pesticide.deleteMany({});
    await Trimming.deleteMany({});
    await Waste.deleteMany({});
    await Suggestion.deleteMany({});
    await User.deleteMany({});
    console.log("Existing module and user data cleared.");

    // 2. Ensure Users
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        admin = await User.create({
            name: "Admin User",
            email: "admin@campus.com",
            password: hashedPassword,
            role: "admin"
        });
        console.log("Admin user created: admin@campus.com / admin123");
    }

    let userAccount = await User.findOne({ role: "user" });
    if (!userAccount) {
        const hashedPassword = await bcrypt.hash("user123", 10);
        userAccount = await User.create({
            name: "Eco Student",
            email: "user@campus.com",
            password: hashedPassword,
            role: "user"
        });
        console.log("Regular user created: user@campus.com / user123");
    }

    // 3. Create Zones
    const specificZones = [
      "ib block", "asblock", "mech", "sf block", "research park", 
      "cafetaria", "playground 1", "playground 2", "agri area 1", 
      "agri area 2", "girls hostel", "boys hostel"
    ];
    const waterSources = ["Rainwater Harvesting", "Borewell", "Recycled Water Pipeline", "Municipal Connection"];
    
    const zoneDocs = specificZones.map(name => ({
        zoneName: name,
        currentGreenCover: Math.floor(Math.random() * 40) + 30, // 30-70%
        requiredGreenCover: Math.floor(Math.random() * 20) + 70, // 70-90%
        waterSource: getRandomElement(waterSources)
    }));
    await Zone.insertMany(zoneDocs);
    console.log(`${specificZones.length} Zones inserted.`);

    const now = new Date();
    const pastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const numRecords = 300; // Increased to 300 as requested

    // 4. Watering
    const wateringTasks = ["Morning Drip", "Evening Sprinkler", "Deep Root Hydration", "Manual Watering", "System Maintenance Check"];
    const waterings = [];
    for (let i = 0; i < numRecords; i++) {
        waterings.push({
            zone: getRandomElement(specificZones),
            task_description: getRandomElement(wateringTasks),
            duration_minutes: Math.floor(Math.random() * 90) + 20,
            schedule_date: getRandomDate(pastMonth, nextMonth),
            status: getRandomElement(["Pending", "In Progress", "Completed"]),
            enteredBy: "Admin User"
        });
    }
    await Watering.insertMany(waterings);
    console.log("Watering data seeded.");

    // 5. Pesticide
    const pesticideTypes = ["Neem Oil Extract", "Organic Fungicide", "Eco-friendly Herbicide", "Natural Insecticide"];
    const quantities = ["500ml", "1L", "2L", "5L", "250ml"];
    const pesticides = [];
    for (let i = 0; i < numRecords; i++) {
        pesticides.push({
            zone: getRandomElement(specificZones),
            pesticide_type: getRandomElement(pesticideTypes),
            quantity: getRandomElement(quantities),
            schedule_date: getRandomDate(pastMonth, nextMonth),
            status: "Scheduled",
            enteredBy: "Admin User"
        });
    }
    await Pesticide.insertMany(pesticides);
    console.log("Pesticide data seeded.");

    // 6. Trimming
    const trimmingTypes = ["Pruning", "Hedge Shaping", "Lawn Mowing", "Deadheading", "Branch Clearing"];
    const staff = ["Ramesh", "Suresh", "John", "Ali", "Maria", "Anju"];
    const trimmings = [];
    for (let i = 0; i < numRecords; i++) {
        trimmings.push({
            zone: getRandomElement(specificZones),
            trimming_type: getRandomElement(trimmingTypes),
            staff_assigned: getRandomElement(staff),
            schedule_date: getRandomDate(pastMonth, nextMonth),
            status: getRandomElement(["Scheduled", "Completed", "Pending"]),
            enteredBy: "Admin User"
        });
    }
    await Trimming.insertMany(trimmings);
    console.log("Trimming data seeded.");

    // 7. Waste
    const wasteAmounts = ["5kg", "12kg", "20kg", "50kg", "2 Bags", "1 Bin"];
    const wastes = [];
    for (let i = 0; i < numRecords; i++) {
        wastes.push({
            zone: getRandomElement(specificZones),
            waste_amount: getRandomElement(wasteAmounts),
            collection_date: getRandomDate(pastMonth, nextMonth),
            status: getRandomElement(["Collected", "Pending"])
        });
    }
    await Waste.insertMany(wastes);
    console.log("Waste data seeded.");

    // 8. Suggestions
    const suggestionTypes = ["Maintenance Issue", "New Planting", "Infrastructure Improvement", "Other"];
    const suggestions = [];
    for (let i = 0; i < numRecords; i++) {
        const status = getRandomElement(["Pending", "Assigned", "Resolved"]);
        suggestions.push({
            user_id: userAccount._id,
            user_name: userAccount.name,
            zone: getRandomElement(specificZones),
            suggestion_type: getRandomElement(suggestionTypes),
            description: `We should consider adding more ${getRandomElement(["shade trees", "flowering plants", "recycling bins", "seating benches"])} in the ${getRandomElement(specificZones)} area.`,
            status: status,
            admin_response: status !== "Pending" ? "We are looking into this and have assigned staff to evaluate." : "",
            date_submitted: getRandomDate(pastMonth, now)
        });
    }
    await Suggestion.insertMany(suggestions);
    console.log("Suggestions data seeded.");

    console.log("All data seeded successfully!");
    process.exit(0);

  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
};

connectDB().then(seedDatabase);
