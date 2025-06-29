/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { USER_ROLES } from "../constants";
import {
  initiateAadhaar,
  uploadLiveSelfie,
  upsertBankDetails,
  verifyAadhaar,
  verifyManualPan,
} from "../controllers/kycdetails.controller";
import { getUploadMiddleware } from "../middlewares/upload.middlware";

const router = Router();

router.post(
  "/aadhaar/initiate-aadhaar",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  initiateAadhaar
);
router.post(
  "/aadhaar/verify-aadhaar",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  verifyAadhaar
);
// router.get(
//   "/aadhaar/get-aadhaar-status",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   getAadhaarStatus
// );

// router.post(
//   "/pan/upload-pan",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   getUploadMiddleware("captains-kyc/pan-card", "panCardImage")
//   uploadPan
// );
router.post(
  "/pan/verify-manual-pan",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  verifyManualPan
);
// router.get(
//   "/pan/get-pan-status",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   getPanStatus
// );

// router.post(
//   "/license/upload-license",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   uploadLicense
// );
// router.get(
//   "/license/get-license-status",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   getLicenseStatus
// );

// router.post(
//   "/address/enter-manual-address",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   enterManualAddress
// );
// router.post(
//   "/address/upload-address-proof",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   uploadAddressProof
// );
// router.get(
//   "/address/get-address-proof-status",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   getAddressProofStatus
// );

router.post(
  "/upload-live-selfie",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  getUploadMiddleware("captains/selfies", "selfieUrl"),
  uploadLiveSelfie
);

// router.post(
//   "/add-bank-details",
//   authenticate,
//   authorize([USER_ROLES.CAPTAIN]),
//   addBankDetails
// );

router.post(
  "/add-bank-details",
  authenticate,
  authorize([USER_ROLES.CAPTAIN]),
  upsertBankDetails
);
export default router;
