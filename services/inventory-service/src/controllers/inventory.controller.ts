import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  MODEL_ENTITIES,
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import {
  createInventoryRecord,
  getAllInventoryDetailsService,
  getInventoryDetailsByIdService,
  getInventoryDetailsByOutletIdService,
  getInventoryDetailsByProductIdService,
} from "../services/inventory.service";

export const createInventory = async (req: Request, res: Response) => {
  try {
    const { inventory } = await createInventoryRecord(req.body);
    return successResponse(
      res,
      STATUS_CODES.CREATED,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.created(MODEL_ENTITIES.INVENTORY),
      { inventory }
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

export const getInventoryDetailsById = async (req: Request, res: Response) => {
  try {
    const inventoryDetails = await getInventoryDetailsByIdService(
      req.params.inventoryId
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.INVENTORY),
      { ...inventoryDetails }
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

export const getInventoryDetailsByOutletId = async (
  req: Request,
  res: Response
) => {
  try {
    const inventoryDetails = await getInventoryDetailsByOutletIdService(
      req.params.outletId
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.INVENTORY),
      { ...inventoryDetails }
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

export const getInventoryDetailsByProductId = async (
  req: Request,
  res: Response
) => {
  try {
    const inventoryDetails = await getInventoryDetailsByProductIdService(
      req.params.productId
    );
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.INVENTORY),
      { ...inventoryDetails }
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

export const getAllInventoryDetails = async (req: Request, res: Response) => {
  try {
    const { inventories } = await getAllInventoryDetailsService();
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.fetched(MODEL_ENTITIES.INVENTORY),
      { inventories }
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
