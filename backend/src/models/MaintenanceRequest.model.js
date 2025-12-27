import mongoose from "mongoose";
import { REQUEST_STATUS, REQUEST_TYPES } from "../utils/constants.js";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true
    },

    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true
    },

    requestType: {
      type: String,
      enum: Object.values(REQUEST_TYPES),
      required: true
    },

    maintenanceTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    scheduledDate: {
      type: Date,
      default: null
    },

    duration: {
      type: Number,
      default: 0 // hours spent
    },

    status: {
      type: String,
      enum: Object.values(REQUEST_STATUS),
      default: REQUEST_STATUS.NEW
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isOverdue: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);
