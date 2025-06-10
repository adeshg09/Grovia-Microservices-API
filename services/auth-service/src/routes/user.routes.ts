/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { createUser, getUserById } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create-user", createUser);

// router.put("/update-user/:userId", updateUser);

// router.delete("/delete-user/:userId", deleteUser);

router.get("/get-user-by-id/:userId", getUserById);

// router.get("/get-all-users", authenticate, getAllUsers);

export default router;
