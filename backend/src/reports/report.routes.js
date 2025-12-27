import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { ROLES } from "../config/roles.js";

import {
  requestsPerTeam,
  requestsPerEquipment,
  statusDistribution,
  technicianWorkload
} from "./report.controller.js";

const router = express.Router();

router.get(
  "/requests-per-team",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  requestsPerTeam
);

router.get(
  "/requests-per-equipment",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  requestsPerEquipment
);

router.get(
  "/status-distribution",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  statusDistribution
);

router.get(
  "/technician-workload",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  technicianWorkload
);

export default router;
