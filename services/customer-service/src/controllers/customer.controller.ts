import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  RESPONSE_ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  createCustomerProfileService,
  getCustomerProfile,
} from "../services/customer.service";

export const createCustomerProfile = async (req: Request, res: Response) => {
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
    const { customer } = await createCustomerProfileService(
      req.body,
      req.user?.id,
      token
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.CUSTOMER_PROFILE_CREATED,
      { customer }
    );
  } catch (error: any) {
    console.log("Error in createCustomerProfile:", error);
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      {}
    );
  }
};

export const getProfile = async (req: Request, res: Response) => {
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
    const customerProfile = await getCustomerProfile(req.user?.id, token);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.CUSTOMER_PROFILE_FETCHED,
      { ...customerProfile }
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
