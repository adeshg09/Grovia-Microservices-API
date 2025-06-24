/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createOutlet,
  getAllOutletDetails,
  getOutletDetailsByAdminId,
  getOutletDetailsById,
} from "../controllers/outlet.controller";
import { USER_ROLES } from "../constants";

const router = Router();

router.post(
  "/create-outlet",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  createOutlet
);

// router.put(
//   "/update-outlet/:outletId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   updateOutlet
// );

// router.delete(
//   "/delete-outlet/:outletId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   deleteOutlet
// );

router.get(
  "/get-outlet-details-by-id/:outletId",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN, USER_ROLES.OUTLET_ADMIN]),
  getOutletDetailsById
);

router.get(
  "/get-outlet-details-by-adminId/:adminId",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN, USER_ROLES.OUTLET_ADMIN]),
  getOutletDetailsByAdminId
);

router.get(
  "/get-all-outlet-details",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN, USER_ROLES.CAPTAIN]),
  getAllOutletDetails
);

export default router;
