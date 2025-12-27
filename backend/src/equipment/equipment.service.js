import Equipment from "../models/Equipment.model.js";
import Team from "../models/Team.model.js";
import User from "../models/User.model.js";

export const createEquipmentService = async (data) => {
  const {
    name,
    serialNumber,
    department,
    location,
    assignedEmployee,
    maintenanceTeam,
    defaultTechnician,
    purchaseDate,
    warrantyExpiry
  } = data;

  const existing = await Equipment.findOne({ serialNumber });
  if (existing) {
    throw { statusCode: 400, message: "Equipment already exists" };
  }

  const team = await Team.findById(maintenanceTeam);
  if (!team) {
    throw { statusCode: 404, message: "Maintenance team not found" };
  }

  if (defaultTechnician) {
    const tech = await User.findById(defaultTechnician);
    if (!tech) {
      throw { statusCode: 404, message: "Technician not found" };
    }
  }

  return Equipment.create({
    name,
    serialNumber,
    department,
    location,
    assignedEmployee,
    maintenanceTeam,
    defaultTechnician,
    purchaseDate,
    warrantyExpiry
  });
};

export const getAllEquipmentService = async () => {
  return Equipment.find()
    .populate("maintenanceTeam", "name")
    .populate("defaultTechnician", "name email")
    .populate("assignedEmployee", "name email");
};

export const getEquipmentByIdService = async (id) => {
  const equipment = await Equipment.findById(id)
    .populate("maintenanceTeam", "name")
    .populate("defaultTechnician", "name email")
    .populate("assignedEmployee", "name email");

  if (!equipment) {
    throw { statusCode: 404, message: "Equipment not found" };
  }

  return equipment;
};

export const scrapEquipmentService = async (id) => {
  const equipment = await Equipment.findById(id);
  if (!equipment) {
    throw { statusCode: 404, message: "Equipment not found" };
  }

  equipment.isScrapped = true;
  await equipment.save();

  return equipment;
};
