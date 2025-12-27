import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.model.js";
import { ROLES } from "../config/roles.js";

dotenv.config();

const seedManager = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const existingManager = await User.findOne({
      role: ROLES.MANAGER
    });

    if (existingManager) {
      console.log("Manager already exists");
      process.exit();
    }

    await User.create({
      name: "Admin",
      email: "manager@gearguard.com",
      password: "password123",
      role: ROLES.MANAGER
    });

    console.log("✅ Manager user created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding manager:", error);
    process.exit(1);
  }
};

seedManager();
