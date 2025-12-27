import { tool } from "@langchain/core/tools";
import Equipment from "../../models/Equipment.model.js";
import MaintenanceRequest from "../../models/MaintenanceRequest.model.js";

export default tool({
  name: "auto_fill_team",
  description: "Fetch maintenance team from equipment and update request",
  func: async ({ requestId }) => {
    const request = await MaintenanceRequest.findById(requestId);
    const equipment = await Equipment.findById(request.equipment);

    request.maintenanceTeam = equipment.maintenanceTeam;
    await request.save();

    return "Team auto-filled";
  }
});
