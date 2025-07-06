import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  STATUS_CODES,
  USER_ROLES,
} from "../constants";
import { errorResponse } from "../utils/response";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config/env.config";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("auth token", token);

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

export const authorize = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse(
        res,
        STATUS_CODES.UNAUTHORIZED,
        RESPONSE_MESSAGES.UNAUTHORIZED,
        RESPONSE_ERROR_MESSAGES.ACCESS_TOKEN_REQUIRED,
        {}
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      // Generate dynamic error message based on allowed roles
      const rolesList = allowedRoles
        .map((role) => {
          switch (role) {
            case USER_ROLES.SUPER_ADMIN:
              return "super-admin";
            case USER_ROLES.OUTLET_ADMIN:
              return "outlet-admin";
            case USER_ROLES.CAPTAIN:
              return "captain";
            case USER_ROLES.CUSTOMER:
              return "customer";
            default:
              return role;
          }
        })
        .join(", ");

      return errorResponse(
        res,
        STATUS_CODES.FORBIDDEN,
        RESPONSE_MESSAGES.FORBIDDEN,
        `Access restricted to ${rolesList} only`,
        {}
      );
    }
    next();
  };
};
