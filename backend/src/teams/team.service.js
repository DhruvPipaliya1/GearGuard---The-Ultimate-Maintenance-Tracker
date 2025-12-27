import Team from "../models/Team.model.js";
import User from "../models/User.model.js";
import { ROLES } from "../config/roles.js";

export const createTeamService = async ({ name }) => {
  const existing = await Team.findOne({ name });
  if (existing) {
    throw { statusCode: 400, message: "Team already exists" };
  }

  return Team.create({ name });
};

export const getAllTeamsService = async () => {
  return Team.find().populate("members", "name email role");
};

export const addTechnicianToTeamService = async ({ teamId, technicianId }) => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw { statusCode: 404, message: "Team not found" };
  }

  const technician = await User.findById(technicianId);
  if (!technician || technician.role !== ROLES.TECHNICIAN) {
    throw { statusCode: 400, message: "Invalid technician" };
  }

  // prevent duplicates
  if (team.members.includes(technicianId)) {
    throw { statusCode: 400, message: "Technician already in team" };
  }

  team.members.push(technicianId);
  await team.save();

  technician.teamId = teamId;
  await technician.save();

  return team;
};

export const getMyTeamService = async (teamId) => {
  if (!teamId) return null;
  return Team.findById(teamId).populate("members", "name email");
};
