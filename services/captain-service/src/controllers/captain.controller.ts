import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  RESPONSE_ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  approveCaptainService,
  createCaptainProfileService,
  getCaptainProfile,
  selectOutletService,
  selectVehicleTypeService,
  submitOnboardingService,
  upsertCaptainProfileService,
  upsertOutletService,
  upsertVehicleTypeService,
  upsertWorkCityService,
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
export const upsertCaptainProfile = async (req: Request, res: Response) => {
  try {
    const { captain } = await upsertCaptainProfileService(
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
export const upsertVehicleType = async (req: Request, res: Response) => {
  try {
    const { updatedVehicleType } = await upsertVehicleTypeService(
      req.body?.vehicleType,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      null,
      {
        vehicleType: updatedVehicleType,
      }
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

export const upsertWorkCity = async (req: Request, res: Response) => {
  try {
    const { updatedWorkCity } = await upsertWorkCityService(
      req.body?.workCity,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      null,
      {
        workCity: updatedWorkCity,
      }
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
export const upsertOutlet = async (req: Request, res: Response) => {
  try {
    const { updatedOutletId } = await upsertOutletService(
      req.body?.outletId,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      null,
      {
        outletId: updatedOutletId,
      }
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

export const submitOnboarding = async (req: Request, res: Response) => {
  try {
    const result = await submitOnboardingService(req.user?.id);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ONBOARDING_SUBMITTED,
      result
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

export const approveCaptain = async (req: Request, res: Response) => {
  try {
    const result = await approveCaptainService(
      req.params?.captainId,
      req.user?.id
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.CAPTAIN_APPROVED,
      result
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
