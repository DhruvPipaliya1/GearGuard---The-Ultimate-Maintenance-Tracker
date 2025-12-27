import {
  createTeamService,
  getAllTeamsService,
  addTechnicianToTeamService,
  getMyTeamService
} from "./team.service.js";

export const createTeam = async (req, res, next) => {
  try {
    const team = await createTeamService(req.body);
    res.status(201).json({
      success: true,
      data: team
    });
  } catch (err) {
    next(err);
  }
};

export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await getAllTeamsService();
    res.json({ success: true, data: teams });
  } catch (err) {
    next(err);
  }
};

export const addTechnicianToTeam = async (req, res, next) => {
  try {
    const team = await addTechnicianToTeamService({
      teamId: req.params.teamId,
      technicianId: req.body.technicianId
    });

    res.json({ success: true, data: team });
  } catch (err) {
    next(err);
  }
};

export const getMyTeam = async (req, res, next) => {
  try {
    const team = await getMyTeamService(req.user.teamId);
    res.json({ success: true, data: team });
  } catch (err) {
    next(err);
  }
};
