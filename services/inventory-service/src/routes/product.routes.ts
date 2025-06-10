/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createProduct,
  getAllProductDetails,
  getProductDetailsById,
} from "../controllers/product.controller";
import { USER_ROLES } from "../constants";

const router = Router();

router.post(
  "/create-product",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  createProduct
);

// router.put(
//   "/update-product/:productId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   updateProduct
// );

// router.delete(
//   "/delete-product/:productId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   deleteProduct
// );

router.get(
  "/get-product-details-by-id/:productId",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getProductDetailsById
);

router.get(
  "/get-all-product-details",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getAllProductDetails
);

export default router;
