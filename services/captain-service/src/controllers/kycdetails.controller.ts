import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  addBankDetailsService,
  initiateAadhaarService,
  uploadLiveSelfieService,
  upsertBankDetailsService,
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

export const uploadLiveSelfie = async (req: Request, res: Response) => {
  try {
    const { selfieUrl } = await uploadLiveSelfieService(
      req.file?.path as string,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.SELFIE_UPLOADED,
      { selfieUrl }
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

export const addBankDetails = async (req: Request, res: Response) => {
  try {
    const { bankDetails } = await addBankDetailsService(req.body, req.user?.id);

    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.BANK_DETAILS_ADDED,
      { bankDetails }
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

export const upsertBankDetails = async (req: Request, res: Response) => {
  try {
    const { updatedBankDetails } = await upsertBankDetailsService(
      req.body,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      null,
      { bankDetails: updatedBankDetails }
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
