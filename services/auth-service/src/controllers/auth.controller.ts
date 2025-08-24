import { Request, Response } from "express";
import {
  initiateSelectLoginOption,
  initiateSendOtp,
  initiateVerifyOtp,
} from "../services/auth.service";
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
    const result = await initiateVerifyOtp(req.body);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.OTP_VERIFIED,
      { ...result }
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

// Select Login Option(roles and/or outlets)
export const selectLoginOption = async (req: Request, res: Response) => {
  try {
    const result = await initiateSelectLoginOption(req.body);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.LOGGED_IN,
      { ...result }
    );
  } catch (error: any) {
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      {}
    );
  }
};

// export const switchAccount = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const result = await initiateSwitchAccount({
//       ...req.body,
//       currentUserId: req.user?.id,
//     });

//     return successResponse(
//       res,
//       STATUS_CODES.OK,
//       RESPONSE_MESSAGES.SUCCESS,
//       RESPONSE_SUCCESS_MESSAGES.ACCOUNT_SWITCHED,
//       { ...result }
//     );
//   } catch (error: any) {
//     return errorResponse(
//       res,
//       STATUS_CODES.BAD_REQUEST,
//       RESPONSE_MESSAGES.BAD_REQUEST,
//       error.message,
//       {}
//     );
//   }
// };
