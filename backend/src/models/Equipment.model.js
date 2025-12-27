import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true
    },

    department: {
      type: String,
      required: true
    },

    // Equipment assigned to an employee
    assignedEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    location: {
      type: String,
      required: true
    },

    purchaseDate: {
      type: Date
    },

    warrantyExpiry: {
      type: Date
    },

    // Default maintenance team
    maintenanceTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    // Default technician
    defaultTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    isScrapped: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
