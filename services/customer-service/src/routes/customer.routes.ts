/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { createProfile, getProfile } from "../controllers/customer.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create-profile", authenticate, createProfile);
router.get("/get-profile", authenticate, getProfile);
// router.put("/update-profile", updateProfile);
// router.post("/upload-profile-picture", uploadProfilePicture);

export default router;
