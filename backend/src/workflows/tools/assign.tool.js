import { tool } from "@langchain/core/tools";
import MaintenanceRequest from "../../models/MaintenanceRequest.model.js";

export default tool({
  name: "assign_request",
  description: "Assign request to technician",
  func: async ({ requestId, technicianId }) => {
    const request = await MaintenanceRequest.findById(requestId);
    request.assignedTo = technicianId;
    await request.save();

    return "Request assigned";
  }
});
