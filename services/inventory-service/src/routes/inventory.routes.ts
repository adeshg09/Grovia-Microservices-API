/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createInventory,
  getAllInventoryDetails,
  getInventoryDetailsById,
  getInventoryDetailsByOutletId,
  getInventoryDetailsByProductId,
} from "../controllers/inventory.controller";
import { USER_ROLES } from "../constants";

const router = Router();

router.post(
  "/create-inventory",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  createInventory
);

// router.post(
//   "/update-inventory/:inventoryId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   updateInventory
// );

// router.post(
//   "/delete-inventory/:inventoryId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   deleteInventory
// );

router.get(
  "/get-inventory-details-by-id/:inventoryId",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getInventoryDetailsById
);

router.get(
  "/get-inventory-details-by-outletId/:outletId",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getInventoryDetailsByOutletId
);

router.get(
  "/get-inventory-details-by-productId/:productId",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getInventoryDetailsByProductId
);

router.get(
  "/get-all-inventory-details",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getAllInventoryDetails
);

export default router;
