import { Request, Response } from "express";
import { initiateSendOtp, initiateVerifyOtp } from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/response";
import {
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";

// Send OTP
export const sendOtp = async (req: Request, res: Response) => {
  try {
    await initiateSendOtp(req.body);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.OTP_SENT
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

// Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { user, tokens } = await initiateVerifyOtp(req.body);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.OTP_VERIFIED,
      { user, tokens }
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
