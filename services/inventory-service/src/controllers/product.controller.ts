import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  MODEL_ENTITIES,
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  createNewProduct,
  getAllProductsService,
  getProductDetailsByIdService,
} from "../services/product.service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = await createNewProduct(req.body);
    return successResponse(
      res,
      STATUS_CODES.CREATED,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.created(MODEL_ENTITIES.PRODUCT),
      { product }
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

export const getProductDetailsById = async (req: Request, res: Response) => {
  try {
    const productDetails = await getProductDetailsByIdService(
      req.params.productId
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.PRODUCT),
      { ...productDetails }
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.statusCode || STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      error
    );
  }
};

export const getAllProductDetails = async (req: Request, res: Response) => {
  try {
    const { products } = await getAllProductsService();
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.PRODUCT),
      { products }
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.statusCode || STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      error
    );
  }
};
