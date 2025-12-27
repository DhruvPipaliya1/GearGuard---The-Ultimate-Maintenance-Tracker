import express from "express";
import { login } from "./auth.controller.js";

const router = express.Router();

// ONLY LOGIN (NO SIGNUP)
router.post("/login", login);

export default router;
