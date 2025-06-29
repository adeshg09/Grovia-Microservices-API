import { Request, Response } from "express";
import {
  RESPONSE_MESSAGES,
  RESPONSE_SUCCESS_MESSAGES,
  STATUS_CODES,
} from "../constants";
import { successResponse, errorResponse } from "../utils/response";
import {
  createUserService,
  getUserByIdService,
  updateUserActivationService,
  updateUserStatusService,
} from "../services/user.service";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userDetails = await getUserByIdService(req.params.userId);
    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.USER_DETAILS_FETCHED,
      { ...userDetails }
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

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await createUserService(req.body);
    return successResponse(
      res,
      STATUS_CODES.CREATED,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.USER_CREATED,
      { user: newUser }
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

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const updatedUser = await updateUserStatusService(userId, status);

    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.USER_STATUS_UPDATED,
      { user: updatedUser }
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

export const updateUserActivation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const { updatedUser } = await updateUserActivationService(userId);

    return successResponse(
      res,
      STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.USER_ACTIVATION_UPDATED,
      { ...updatedUser }
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
