/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { addAddress } from "../controllers/address.controller";
import { USER_ROLES } from "../constants";

const router = Router();

router.post(
  "/add-address",
  authenticate,
  authorize([USER_ROLES.CUSTOMER]),
  addAddress
);

// router.put(
//   "/update-address/:addressId",
//   authenticate,
//   authorize([USER_ROLES.CUSTOMER]),
//   updateAddress
// );

// router.delete(
//   "/delete-address/:addressId",
//   authenticate,
//   authorize([USER_ROLES.CUSTOMER]),
//   deleteAddress
// );

// router.get(
//   "/get-address-by-id/:addressId",
//   authenticate,
//   authorize([USER_ROLES.CUSTOMER]),
//   getAddressById
// );

// router.get(
//   "/get-address-by-customerId/:customerId",
//   authenticate,
//   authorize([USER_ROLES.CUSTOMER]),
//   getAddressByCustomerId
// );

// router.get(
//   "/get-all-addresses",
//   authenticate,
//   authorize([USER_ROLES.CUSTOMER]),
//   getAllAddresses
// );

export default router;
