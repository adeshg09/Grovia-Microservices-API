import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  initiateAadhaarService,
  submitKycDetailsService,
  verifyAadhaarService,
  verifyManualPanService,
} from "../services/kycdetails.service";

export const initiateAadhaar = async (req: Request, res: Response) => {
  try {
    const result = await initiateAadhaarService(
      req.body?.aadhaarNumber,
      req.user?.id
    );

    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.AADHAAR_INITIATED,
      {
        referenceId: result.referenceId,
        message: result.message,
        expiresIn: "10 minutes",
      }
    );
  } catch (error: any) {
    console.log("error", error);
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      {}
    );
  }
};

export const verifyAadhaar = async (req: Request, res: Response) => {
  try {
    const result = await verifyAadhaarService(
      req.body.referenceId,
      req.body.otp,
      req.user?.id
    );

    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.AADHAAR_VERIFIED,
      {
        verified: result.verified,
        userDetails: result.userDetails,
        message: result.message,
        verificationTimestamp: new Date().toISOString(),
      }
    );
  } catch (error: any) {
    console.log("error", error);
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      {}
    );
  }
};

// export const uploadPan = async (req: Request, res: Response) => {
//   try {
//     const result = await uploadPanService(req.user?.id, req.file?.path);
//     return successResponse(
//       res,
//       STATUS_CODES.OK,
//       RESPONSE_MESSAGES.SUCCESS,
//       RESPONSE_SUCCESS_MESSAGES.PAN_UPLOADED_VERIFIED,
//       {}
//     );
//   } catch (error: any) {
//     return errorResponse(
//       res,
//       STATUS_CODES.BAD_REQUEST,
//       RESPONSE_MESSAGES.BAD_REQUEST,
//       error.message,
//       error
//     );
//   }
// };

export const verifyManualPan = async (req: Request, res: Response) => {
  try {
    const result = await verifyManualPanService(req.body, req.user?.id);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.PAN_VERIFIED,
      {}
    );
  } catch (error: any) {
    console.log("error", error);
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      {}
    );
  }
};

export const submitKycDetails = async (req: Request, res: Response) => {
  try {
    const { captainId, kycSubmittedAt } = await submitKycDetailsService(
      req.user?.id
    );

    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.KYC_DETAILS_SUBMITTED,
      {
        captainId,
        kycSubmittedAt,
      }
    );
  } catch (err: any) {
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      err.message,
      {}
    );
  }
};
