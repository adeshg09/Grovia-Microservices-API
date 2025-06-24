import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  MODEL_ENTITIES,
  RESPONSE_ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  createVendorOutlet,
  getAllOutletDetailsService,
  getOutletDetailsByAdminIdService,
  getOutletDetailsByIdService,
} from "../services/outlet.service";

export const createOutlet = async (req: Request, res: Response) => {
  try {
    const { outlet } = await createVendorOutlet(req.body, req.user?.id);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.created(MODEL_ENTITIES.OUTLET),
      { outlet }
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

export const getOutletDetailsById = async (req: Request, res: Response) => {
  try {
    const outletDetails = await getOutletDetailsByIdService(
      req.params.outletId
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.OUTLET),
      { ...outletDetails }
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

export const getOutletDetailsByAdminId = async (
  req: Request,
  res: Response
) => {
  try {
    const outletDetails = await getOutletDetailsByAdminIdService(
      req.params.adminId
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.OUTLET),
      { ...outletDetails }
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

export const getAllOutletDetails = async (req: Request, res: Response) => {
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

    const { outlets } = await getAllOutletDetailsService(
      token,
      req.query?.city as string
    );

    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.OUTLET),
      { outlets }
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
