import { tool } from "@langchain/core/tools";
import MaintenanceRequest from "../../models/MaintenanceRequest.model.js";
import Equipment from "../../models/Equipment.model.js";
import { REQUEST_STATUS } from "../../utils/constants.js";

export default tool({
  name: "scrap_equipment",
  description: "Scrap equipment and close request",
  func: async ({ requestId }) => {
    const request = await MaintenanceRequest.findById(requestId);
    const equipment = await Equipment.findById(request.equipment);

    request.status = REQUEST_STATUS.SCRAP;
    equipment.isScrapped = true;

    await request.save();
    await equipment.save();

    return "Equipment scrapped";
  }
});
