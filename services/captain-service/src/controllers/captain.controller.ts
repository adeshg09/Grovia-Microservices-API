import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  RESPONSE_ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  addBankDetailsService,
  createCaptainProfileService,
  getCaptainProfile,
  selectOutletService,
  selectVehicleTypeService,
  uploadLiveSelfieService,
} from "../services/captain.service";

export const createCaptainProfile = async (req: Request, res: Response) => {
  try {
    const { captain } = await createCaptainProfileService(
      req.body,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.CAPTAIN_PROFILE_CREATED,
      { captain }
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
    const captainProfile = await getCaptainProfile(req.user?.id, token);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.CAPTAIN_PROFILE_FETCHED,
      { ...captainProfile }
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

export const selectVehicleType = async (req: Request, res: Response) => {
  try {
    const { selectedVehicleType } = await selectVehicleTypeService(
      req.body?.vehicleType,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      null,
      { selectedVehicleType }
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

export const selectOutlet = async (req: Request, res: Response) => {
  try {
    const { selectedOutletId } = await selectOutletService(
      req.body?.outletId,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      null,
      { selectedOutlet: selectedOutletId }
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

export const uploadLiveSelfie = async (req: Request, res: Response) => {
  try {
    const { updatedCaptain } = await uploadLiveSelfieService(
      req.file?.path as string,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.SELFIE_UPLOADED,
      { captain: updatedCaptain }
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
    const { updatedCaptain } = await addBankDetailsService(
      req.body,
      req.user?.id
    );

    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.BANK_DETAILS_ADDED,
      { captain: updatedCaptain }
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
