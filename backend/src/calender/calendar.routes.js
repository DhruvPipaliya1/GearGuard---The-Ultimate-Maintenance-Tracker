import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { ROLES } from "../config/roles.js";
import { getCalendarEvents } from "./calendar.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.TECHNICIAN, ROLES.MANAGER]),
  getCalendarEvents
);

export default router;
