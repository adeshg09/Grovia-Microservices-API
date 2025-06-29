/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUserActivation,
  updateUserStatus,
} from "../controllers/user.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { USER_ROLES } from "../constants";

const router = Router();

router.post(
  "/create-user",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  createUser
);

// router.put("/update-user/:userId", updateUser);

// router.delete("/delete-user/:userId", deleteUser);

router.get(
  "/get-user-by-id/:userId",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getUserById
);

// router.get("/get-all-users", authenticate, getAllUsers);

router.patch(
  "/update-status/:userId",
  authenticate,
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN, USER_ROLES.OUTLET_ADMIN]),
  updateUserStatus
);

router.patch("/update-activation/:userId", authenticate, updateUserActivation);

export default router;
