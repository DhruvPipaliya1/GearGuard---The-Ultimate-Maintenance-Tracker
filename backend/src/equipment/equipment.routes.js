import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { ROLES } from "../config/roles.js";

import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  scrapEquipment
} from "./equipment.controller.js";

const router = express.Router();

// Manager only
router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  createEquipment
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  getAllEquipment
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  getEquipmentById
);

router.patch(
  "/:id/scrap",
  authMiddleware,
  roleMiddleware([ROLES.MANAGER]),
  scrapEquipment
);

export default router;
