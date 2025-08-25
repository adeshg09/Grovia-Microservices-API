import { Response } from "express";
import { RESPONSE_MESSAGES, STATUS_CODES } from "../constants";

export const successResponse = (
  res: Response,
  response_code = STATUS_CODES.OK,
  response_message = RESPONSE_MESSAGES.SUCCESS,
  message: any,
  data?: any
) => {
  res.status(response_code).json({
    status: {
      response_code,
      response_message,
    },
    message,
    data,
  });
  return;
};

export const errorResponse = (
  res: Response,
  response_code = STATUS_CODES.BAD_REQUEST,
  response_message = RESPONSE_MESSAGES.BAD_REQUEST,
  message: any,
  error?: any
) => {
  // Safely extract error information without circular references
  let errorData = {};

  if (error) {
    // If it's an Axios error
    if (error.response) {
      errorData = {
        statusCode: error.response.status,
        data: error.response.data,
      };
    }
    // If it's a regular error object
    else if (error.message) {
      errorData = {
        message: error.message,
        name: error.name,
        ...(error.stack && { stack: error.stack }),
      };
    }
    // If it's already a plain object
    else if (typeof error === "object" && error.constructor === Object) {
      errorData = error;
    }
    // If it's a string or primitive
    else {
      errorData = { error: error };
    }
  }

  res.status(response_code).json({
    status: {
      response_code,
      response_message,
    },
    message,
    ...(Object.keys(errorData).length > 0 && { error: errorData }),
  });
  return;
};
