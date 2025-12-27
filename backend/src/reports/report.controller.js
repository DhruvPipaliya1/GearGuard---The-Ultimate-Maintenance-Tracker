import MaintenanceRequest from "../models/MaintenanceRequest.model.js";

/**
 * Requests per Team
 */
export const requestsPerTeam = async (req, res, next) => {
  try {
    const data = await MaintenanceRequest.aggregate([
      {
        $group: {
          _id: "$maintenanceTeam",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

/**
 * Requests per Equipment
 */
export const requestsPerEquipment = async (req, res, next) => {
  try {
    const data = await MaintenanceRequest.aggregate([
      {
        $group: {
          _id: "$equipment",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

/**
 * Status distribution
 */
export const statusDistribution = async (req, res, next) => {
  try {
    const data = await MaintenanceRequest.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

/**
 * Technician workload
 */
export const technicianWorkload = async (req, res, next) => {
  try {
    const data = await MaintenanceRequest.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          jobs: { $sum: 1 },
          totalHours: { $sum: "$duration" }
        }
      }
    ]);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
