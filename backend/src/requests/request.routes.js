import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { ROLES } from "../config/roles.js";

import {
  createRequest,
  getRequests,
  assignRequest,
  updateStatus
} from "./request.controller.js";

const router = express.Router();

// EMPLOYEE / MANAGER → create request
router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.EMPLOYEE, ROLES.MANAGER]),
  createRequest
);

// TECHNICIAN / MANAGER → view requests
router.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.TECHNICIAN, ROLES.MANAGER]),
  getRequests
);

// TECHNICIAN → assign to self
router.patch(
  "/:id/assign",
  authMiddleware,
  roleMiddleware([ROLES.TECHNICIAN]),
  assignRequest
);

// TECHNICIAN → update status
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware([ROLES.TECHNICIAN]),
  updateStatus
);

export default router;
