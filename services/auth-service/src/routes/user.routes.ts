/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/auth.controller";
import { get } from "http";
import { getUserDetailsById } from "../controllers/user.controller";

const router = Router();

router.get("/user-details/:userId", getUserDetailsById);

export default router;
