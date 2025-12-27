import MaintenanceRequest from "../models/MaintenanceRequest.model.js";
import { REQUEST_TYPES } from "../utils/constants.js";
import { ROLES } from "../config/roles.js";

export const getCalendarEvents = async (req, res, next) => {
  try {
    const query = {
      requestType: REQUEST_TYPES.PREVENTIVE,
      scheduledDate: { $ne: null }
    };

    // Technician sees only own team
    if (req.user.role === ROLES.TECHNICIAN) {
      query.maintenanceTeam = req.user.teamId;
    }

    const events = await MaintenanceRequest.find(query)
      .populate("equipment", "name")
      .populate("assignedTo", "name")
      .select("scheduledDate status");

    const calendarData = events.map((e) => ({
      id: e._id,
      title: e.equipment.name,
      date: e.scheduledDate,
      status: e.status,
      technician: e.assignedTo?.name || null
    }));

    res.json({ success: true, data: calendarData });
  } catch (err) {
    next(err);
  }
};
