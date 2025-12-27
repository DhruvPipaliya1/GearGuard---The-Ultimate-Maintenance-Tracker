import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/User.model.js";
import Team from "../models/Team.model.js";
import Equipment from "../models/Equipment.model.js";
import MaintenanceRequest from "../models/MaintenanceRequest.model.js";
import { ROLES } from "../config/roles.js";
import { REQUEST_TYPES } from "../utils/constants.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // CLEAN DB
    await User.deleteMany();
    await Team.deleteMany();
    await Equipment.deleteMany();
    await MaintenanceRequest.deleteMany();

    // MANAGER
    const manager = await User.create({
      name: "Admin",
      email: "manager@gearguard.com",
      password: "password123",
      role: ROLES.MANAGER
    });

    // TEAM
    const itTeam = await Team.create({ name: "IT Support" });

    // TECHNICIAN
    const technician = await User.create({
      name: "Amit Technician",
      email: "amit@company.com",
      password: "password123",
      role: ROLES.TECHNICIAN,
      teamId: itTeam._id
    });

    itTeam.members.push(technician._id);
    await itTeam.save();

    // EMPLOYEE
    const employee = await User.create({
      name: "Rahul Employee",
      email: "rahul@company.com",
      password: "password123",
      role: ROLES.EMPLOYEE
    });

    // EQUIPMENT
    const printer = await Equipment.create({
      name: "Office Printer",
      serialNumber: "PR-001",
      department: "Admin",
      location: "Floor 2",
      maintenanceTeam: itTeam._id,
      defaultTechnician: technician._id,
      assignedEmployee: employee._id
    });

    // PREVENTIVE REQUEST
    await MaintenanceRequest.create({
      subject: "Monthly Printer Check",
      equipment: printer._id,
      maintenanceTeam: itTeam._id,
      requestType: REQUEST_TYPES.PREVENTIVE,
      scheduledDate: new Date(),
      createdBy: manager._id
    });

    console.log("✅ FULL DATABASE SEEDED");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
