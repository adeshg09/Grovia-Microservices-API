/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { USER_ROLES } from "../constants";
import { createProductRequest } from "../controllers/productRequest.controller";

const router = Router();

router.post(
  "/create-product-request",
  authenticate,
  authorize([USER_ROLES.OUTLET_ADMIN]),
  createProductRequest
);

// router.put(
//   "/update-product-request/:productRequestId",
//   authenticate,
//   authorize([USER_ROLES.OUTLET_ADMIN]),
//   updateProductRequest
// );

// router.delete(
//   "/delete-product-request/:productRequestId",
//   authenticate,
//   authorize([USER_ROLES.OUTLET_ADMIN]),
//   deleteProductRequest
// );

// router.get(
//   "/get-product-request-by-id/:productRequestId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   getProductRequestById
// );

// router.get(
//   "/get-All-product-requests",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   getAllProductRequests
// );

// router.get(
//   "/get-product-requests-by-outletId/:outletId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   getProductRequestsByOutletId
// );

// router.get(
//   "/get-product-requests-by-productId/:productId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   getProductRequestsByProductId
// );

// router.put(
//   "/approve-product-request/:productRequestId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   approveProductRequest
// );

// router.put(
//   "/reject-product-request/:productRequestId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   rejectProductRequest
// );

// router.get(
//   "/get-my-product-requests",
//   authenticate,
//   authorize([USER_ROLES.OUTLET_ADMIN]),
//   getMyProductRequests
// );

export default router;
