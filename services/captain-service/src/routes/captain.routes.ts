/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import {
  approveCaptain,
  createCaptainProfile,
  getProfile,
  submitOnboarding,
  upsertCaptainProfile,
  upsertOutlet,
  upsertVehicleType,
  upsertWorkCity,
} from "../controllers/captain.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { USER_ROLES } from "../constants";

const router = Router();

router.post(
  "/create-captain-profile",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  createCaptainProfile
);
router.post(
  "/upsert-captain-profile",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  upsertCaptainProfile
);

// router.put(
//   "/update-captain-profile/:captainId",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   updateCaptainProfile
// );

// router.delete(
//   "/delete-captain-profile/:captainId",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   deleteCaptainProfile
// );

// router.get(
//   "/get-all-captains-profile",
//   authenticate,
// authorize([USER_ROLES.CAPTAIN]),
//   getCaptainProfileById
// );

// router.get(
//   "/get-captain-profile-by-id/:captainId",
//   authenticate,
// authorize([USER_ROLES.CAPTAIN]),
//   getCaptainProfileById
// );

// router.get(
//   "/get-captain-profile-by-userId/:userId",
//   authenticate,
// authorize([USER_ROLES.CAPTAIN]),
//   getCaptainProfileByUserId
// );

router.get(
  "/get-profile",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  getProfile
);

// router.get(
//   "/update-profile",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   updateProfile
// );

router.post(
  "/select-vehicle-type",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  upsertVehicleType
);

router.post(
  "/select-outlet",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  upsertOutlet
);

router.post(
  "/select-work-city",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  upsertWorkCity
);

//  router.patch("/update-profile-picture",authenticate,
//  authorize([USER_ROLES.CAPTAIN]), uploadProfilePicture);

router.patch(
  "/submit-onboarding",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  submitOnboarding
);

router.patch(
  "/approve-captain/:captainId",
  authenticate,
  authorize([USER_ROLES.OUTLET_ADMIN]),
  approveCaptain
);

export default router;
