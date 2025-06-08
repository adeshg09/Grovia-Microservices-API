import { Request, Response } from "express";
import {
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import { successResponse, errorResponse } from "../utils/response";
import { getUserDetailsByIdService } from "../services/user.service";

export const getUserDetailsById = async (req: Request, res: Response) => {
  try {
    const userDetails = await getUserDetailsByIdService(req.params.userId);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.USER_DETAILS_FETCHED,
      { ...userDetails }
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
