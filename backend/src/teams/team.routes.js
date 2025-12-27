import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { ROLES } from "../config/roles.js";

import {
  createTeam,
  getAllTeams,
  addTechnicianToTeam,
  getMyTeam
} from "./team.controller.js";

const router = express.Router();

// Manager only
router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  createTeam
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  getAllTeams
);

// Add technician to team (Manager)
router.post(
  "/:teamId/add-technician",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  addTechnicianToTeam
);

// Technician: view own team
router.get(
  "/my",
  authMiddleware,
  roleMiddleware([ROLES.TECHNICIAN]),
  getMyTeam
);

export default router;
