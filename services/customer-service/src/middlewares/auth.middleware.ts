import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  STATUS_CODES,
} from "../constants";
import { errorResponse } from "../utils/response";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config/env.config";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

  try {
    const decoded = jwt.verify(
      token,
      envConfig.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    if (decoded.role !== "customer") {
      return errorResponse(
        res,
        STATUS_CODES.FORBIDDEN,
        RESPONSE_MESSAGES.FORBIDDEN,
        "Access restricted to customers only",
        {}
      );
    }

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error: any) {
    return errorResponse(
      res,
      STATUS_CODES.UNAUTHORIZED,
      RESPONSE_MESSAGES.UNAUTHORIZED,
      RESPONSE_ERROR_MESSAGES.TOKEN_INVALID,
      error.message
    );
  }
};
