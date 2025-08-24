/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import {
  selectLoginOption,
  sendOtp,
  verifyOtp,
} from "../controllers/auth.controller";
import { authenticateTempToken } from "../middlewares/auth.middleware";

const router = Router();

// Auth Routes

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/select-login-option", authenticateTempToken, selectLoginOption);
// router.post("/switch-account", authenticate, switchAccount);

export default router;
