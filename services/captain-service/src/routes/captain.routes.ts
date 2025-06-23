/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import {
  addBankDetails,
  createCaptainProfile,
  getProfile,
  selectOutlet,
  selectVehicleType,
  uploadLiveSelfie,
} from "../controllers/captain.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { USER_ROLES } from "../constants";
import { getUploadMiddleware } from "../middlewares/upload.middlware";

const router = Router();

router.post(
  "/create-captain-profile",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  createCaptainProfile
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
  selectVehicleType
);

router.post(
  "/select-outlet",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  selectOutlet
);

router.post(
  "/upload-live-selfie",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  getUploadMiddleware("captains/selfies", "selfieUrl"),
  uploadLiveSelfie
);

router.post(
  "/add-bank-details",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  addBankDetails
);

//  router.patch("/update-profile-picture",authenticate,
//  authorize([USER_ROLES.CAPTAIN]), uploadProfilePicture);

// router.patch(
//   "/approve-captain/:captainId",
//   authenticate,
//   authorize([USER_ROLES.OUTLET_ADMIN]),
//   approveCaptain
// );

export default router;
