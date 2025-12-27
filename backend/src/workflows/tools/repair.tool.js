import { tool } from "@langchain/core/tools";
import MaintenanceRequest from "../../models/MaintenanceRequest.model.js";
import { REQUEST_STATUS } from "../../utils/constants.js";

export default tool({
  name: "mark_repaired",
  description: "Mark request as repaired",
  func: async ({ requestId, duration }) => {
    const request = await MaintenanceRequest.findById(requestId);
    request.status = REQUEST_STATUS.REPAIRED;
    request.duration = duration || 0;
    await request.save();

    return "Request repaired";
  }
});
