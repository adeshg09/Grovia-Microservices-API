/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { USER_ROLES } from "../constants";
import {
  createOutletAdminProfile,
  getAllOutletAdminsProfile,
  getOutletAdminProfileById,
  getoutletAdminProfileByUserId,
  getProfile,
} from "../controllers/admin.controller";

const router = Router();

router.post(
  "/create-outlet-admin-profile",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  createOutletAdminProfile
);

// router.put(
//   "/update-outlet-admin-profile/:outletAdminId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   updateOutletAdminProfile
// );

// router.delete(
//   "/delete-outlet-admin-profile/:outletAdminId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   deleteOutletAdminProfile
// );

router.get(
  "/get-outlet-admin-profile-by-id/:adminId",
  authenticate,
  authorize([
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.OUTLET_ADMIN,
    USER_ROLES.CAPTAIN,
  ]),
  getOutletAdminProfileById
);

router.get(
  "/get-outlet-admin-profile-by-userId/:userId",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN, USER_ROLES.OUTLET_ADMIN]),
  getoutletAdminProfileByUserId
);

router.get(
  "/get-all-outlet-admins-profile",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getAllOutletAdminsProfile
);

router.get(
  "/get-profile",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN, USER_ROLES.OUTLET_ADMIN]),
  getProfile
);

// router.get(
//   "/update-profile",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN, USER_ROLES.OUTLET_ADMIN]),
//   updateProfile
// );

export default router;
