import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  MODEL_ENTITIES,
  RESPONSE_ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import { createProductRequestService } from "../services/productRequest.service";

export const createProductRequest = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return errorResponse(
        res,
        STATUS_CODES.UNAUTHORIZED,
        RESPONSE_MESSAGES.UNAUTHORIZED,
        RESPONSE_ERROR_MESSAGES.ACCESS_TOKEN_REQUIRED,
        {}
      );
    }
    const { productRequest } = await createProductRequestService(
      req.body,
      req.user?.id,
      token
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.created(MODEL_ENTITIES.PRODUCT_REQUEST),
      { productRequest }
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
