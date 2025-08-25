import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  MODEL_ENTITIES,
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  createProductCategory,
  getAllCategoriesService,
  getCategoryDetailsByIdService,
} from "../services/category.service";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { category } = await createProductCategory(req.body);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.created(MODEL_ENTITIES.CATEGORY),
      { category }
    );
  } catch (error: any) {
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      error
    );
  }
};

export const getCategoryDetailsById = async (req: Request, res: Response) => {
  try {
    const categoryDetails = await getCategoryDetailsByIdService(
      req.params.categoryId
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.CATEGORY),
      { ...categoryDetails }
    );
  } catch (error: any) {
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      error
    );
  }
};

export const getAllCategoryDetails = async (req: Request, res: Response) => {
  try {
    console.log("req.query", req.query);
    const allCategoryDetails = await getAllCategoriesService(req.query);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.CATEGORY),
      allCategoryDetails
    );
  } catch (error: any) {
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      error
    );
  }
};
