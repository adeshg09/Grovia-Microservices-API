/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/auth.controller";

const router = Router();

// Auth Routes

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
