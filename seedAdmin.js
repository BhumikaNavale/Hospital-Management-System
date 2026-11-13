
require("dotenv").config();

const connectDB = require("./config/db");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Admin details
    const name = "Hospital Admin";
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const phone = "9876543210";

    if (!email || !password) {
      throw new Error(
        "Please set ADMIN_EMAIL and ADMIN_PASSWORD in .env"
      );
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin account already exists!");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "Admin",
      isActive: true,
    });

    console.log("Admin created successfully!");
    console.log("Admin Email:", admin.email);
    console.log("Admin Role:", admin.role);
  } catch (error) {
    console.error("Admin creation failed:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();
