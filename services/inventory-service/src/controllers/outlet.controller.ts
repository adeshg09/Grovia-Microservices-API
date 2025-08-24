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
  getNearestOutletDetailsByLocationCoordinatesService,
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
    console.log("req.query", req.query);
    // const token = req.headers.authorization?.split(" ")[1];

    // if (!token) {
    //   return errorResponse(
    //     res,
    //     STATUS_CODES.UNAUTHORIZED,
    //     RESPONSE_MESSAGES.UNAUTHORIZED,
    //     RESPONSE_ERROR_MESSAGES.ACCESS_TOKEN_REQUIRED,
    //     {}
    //   );
    // }

    const { outlets } = await getAllOutletDetailsService(req.query);

    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.OUTLET),
      { outlets }
    );
  } catch (error: any) {
    console.log("Error in getAllOutletDetails:", error);
    return errorResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      RESPONSE_MESSAGES.BAD_REQUEST,
      error.message,
      {}
    );
  }
};

export const getNearestOutletDetailsByLocationCoordinates = async (
  req: Request,
  res: Response
) => {
  try {
    const outletDetails =
      await getNearestOutletDetailsByLocationCoordinatesService(req.query);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.OUTLET),
      { nearestOutletDetails: outletDetails }
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
