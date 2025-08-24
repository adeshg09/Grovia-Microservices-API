import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  RESPONSE_ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  createOutletAdminProfileService,
  getoutletAdminProfileByUserIdService,
  getAdminProfile,
  getAlloutletAdminsProfileService,
  getOutletAdminProfileByIdService,
} from "../services/admin.service";

export const createOutletAdminProfile = async (req: Request, res: Response) => {
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
    const outletAdmin = await createOutletAdminProfileService(req.body, token);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.PROFILE_CREATED,
      { ...outletAdmin }
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

export const getOutletAdminProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const adminDetails = await getOutletAdminProfileByIdService(
      req.params?.adminId
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ADMIN_DETAILS_FETCHED,
      { ...adminDetails }
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

export const getoutletAdminProfileByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const adminDetails = await getoutletAdminProfileByUserIdService(
      req.params?.userId
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ADMIN_DETAILS_FETCHED,
      { ...adminDetails }
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

export const getAllOutletAdminsProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const { admins } = await getAlloutletAdminsProfileService();
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ADMIN_DETAILS_FETCHED,
      { admins }
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

    const adminProfile = await getAdminProfile(req.user?.id, token);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.PROFILE_FETCHED,
      { ...adminProfile }
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
