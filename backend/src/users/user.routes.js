import express from "express";
import { createUser } from "./user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

// Create Employee / Technician
router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  createUser
);

export default router;
