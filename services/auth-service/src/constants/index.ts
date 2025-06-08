export enum USER_ROLES {
  CUSTOMER = "customer",
  CAPTAIN = "captain",
  ADMIN = "admin",
}

export enum USER_STATUS {
  ACTIVE = "active",
  PENDING = "pending",
  BLOCKED = "blocked",
}

export enum SEND_OTP_CHANNEL {
  SMS = "sms",
  EMAIL = "email",
  WHATSAPP = "whatsapp",
}

export const TOKEN_EXPIRY = {
  ACCESS: "1d",
  REFRESH: "7d",
  REMEMBER_ME: "30d",
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export const RESPONSE_MESSAGES = {
  SUCCESS: "Success!",
  BAD_REQUEST: "Bad Request!",
  UNAUTHORIZED: "Unauthorized!",
  FORBIDDEN: "Forbidden!",
  NOT_FOUND: "Not Found!",
  SERVER_ERROR: "Internal Server Error!",
};

export const RESPONSE_SUCCESS_MESSAGES = {
  OTP_SENT: "OTP sent successfully",
  OTP_VERIFIED: "OTP verified successfully",
  OTP_RESENT: "OTP resent successfully",
};

export const RESPONSE_ERROR_MESSAGES = {
  REQUIRED_FIELDS: "All the Fields are required",
  TOKEN_INVALID: "Invalid or expired token",
  OTP_ATTEMPTS_EXCEEDED: "Maximum OTP attempts reached",
  INVALID_COUNTRYCODE_FORMAT: "Country code must start with + (e.g. +91)",
  ROLE_REQUIRED: "Role is required for new user registration",
  INVALID_ROLE: "Invalid role provided",
};
