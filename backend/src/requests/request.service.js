import MaintenanceRequest from "../models/MaintenanceRequest.model.js";
import Equipment from "../models/Equipment.model.js";
import { REQUEST_STATUS, REQUEST_TYPES } from "../utils/constants.js";
import { ROLES } from "../config/roles.js";

/**
 * EMPLOYEE / MANAGER
 * Create maintenance request
 */
export const createRequestService = async (data, user) => {
  const { subject, equipmentId, requestType, scheduledDate } = data;

  const equipment = await Equipment.findById(equipmentId);
  if (!equipment) {
    throw { statusCode: 404, message: "Equipment not found" };
  }

  return MaintenanceRequest.create({
    subject,
    equipment: equipmentId,
    requestType,
    scheduledDate: requestType === REQUEST_TYPES.PREVENTIVE ? scheduledDate : null,
    maintenanceTeam: equipment.maintenanceTeam,
    createdBy: user.id
  });
};

/**
 * TECHNICIAN / MANAGER
 * Get requests for Kanban
 */
export const getRequestsService = async (user) => {
  if (user.role === ROLES.TECHNICIAN) {
    return MaintenanceRequest.find({
      maintenanceTeam: user.teamId
    })
      .populate("equipment", "name")
      .populate("assignedTo", "name");
  }

  return MaintenanceRequest.find()
    .populate("equipment", "name")
    .populate("assignedTo", "name");
};

/**
 * TECHNICIAN
 * Assign request to self
 */
export const assignRequestService = async (requestId, user) => {
  const request = await MaintenanceRequest.findById(requestId);
  if (!request) {
    throw { statusCode: 404, message: "Request not found" };
  }

  request.assignedTo = user.id;
  await request.save();

  return request;
};

/**
 * TECHNICIAN
 * Move request status
 */
export const updateStatusService = async (requestId, status, duration) => {
  const request = await MaintenanceRequest.findById(requestId);
  if (!request) {
    throw { statusCode: 404, message: "Request not found" };
  }

  request.status = status;

  if (status === REQUEST_STATUS.REPAIRED && duration) {
    request.duration = duration;
  }

  await request.save();
  return request;
};
