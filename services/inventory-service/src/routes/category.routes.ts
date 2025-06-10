/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createCategory,
  getAllCategoryDetails,
  getCategoryDetailsById,
} from "../controllers/category.controller";
import { USER_ROLES } from "../constants";

const router = Router();

router.post(
  "/create-category",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  createCategory
);

// router.post(
//   "/create-bulk-categories",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   createBulkCategories
// );

// router.put(
//   "/update-category/:categoryId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   updateCategory
// );

// router.delete(
//   "/delete-category/:categoryId",
//   authenticate,
//   authorize([USER_ROLES.SUPER_ADMIN]),
//   deleteCategory
// );

router.get(
  "/get-category-details-by-id/:categoryId",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getCategoryDetailsById
);

router.get(
  "/get-all-category-details",
  authenticate,
  authorize([USER_ROLES.SUPER_ADMIN]),
  getAllCategoryDetails
);

export default router;
