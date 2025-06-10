/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import {
  createCustomerProfile,
  getProfile,
} from "../controllers/customer.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { USER_ROLES } from "../constants";

const router = Router();

router.post(
  "/create-customer-profile",
  authenticate,
  authorize([USER_ROLES.CUSTOMER]),
  createCustomerProfile
);

// router.put(
//   "/update-customer-profile/:customerId",
//   authenticate,
//   authorize([USER_ROLES.CUSTOMER]),
//   updateCustomerProfile
// );

router.get(
  "/get-profile",
  authenticate,
  authorize([USER_ROLES.CUSTOMER]),
  getProfile
);

// router.get(
//   "/get-customer-profile-by-id/:customerId",
//   authenticate,
// authorize([USER_ROLES.CUSTOMER]),
//   getCustomerProfileById
// );

// router.get(
//   "/get-customer-profile-by-userId/:userId",
//   authenticate,
// authorize([USER_ROLES.CUSTOMER]),
//   getCustomerProfileByUserId
// );

//  router.patch("/update-profile-picture",authenticate,
//  authorize([USER_ROLES.CUSTOMER]), uploadProfilePicture);

export default router;
