import express from "express";

import authRoutes from "./auth/auth.routes.js";
import userRoutes from "./users/user.routes.js";
import teamRoutes from "./teams/team.routes.js";
import equipmentRoutes from "./equipment/equipment.routes.js";
import requestRoutes from "./requests/request.routes.js";
import reportRoutes from "./reports/report.routes.js";
import calendarRoutes from "./calendar/calendar.routes.js";



const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/requests", requestRoutes);
router.use("/reports", reportRoutes);
router.use("/calendar", calendarRoutes);

export default router;
