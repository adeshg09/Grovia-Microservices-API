export enum USER_ROLES {
  CUSTOMER = "customer",
  CAPTAIN = "captain",
  SUPER_ADMIN = "super-admin",
  OUTLET_ADMIN = "outlet-admin",
}

export enum CLIENT_TYPES {
  WEB = "web",
  MOBILE = "mobile",
}

export enum CHANNEL_TYPES {
  SMS = "sms",
  EMAIL = "email",
  WHATSAPP = "whatsapp",
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
  TEMP: "30d",
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
  USER_DETAILS_FETCHED: "User details fetched successfully",
  USER_CREATED: "User created successfully",
  USER_STATUS_UPDATED: "User status updated successfully",
  USER_ACTIVATION_UPDATED: "User activation updated successfully",
  LOGGED_IN: "User logged in successfully",
  ACCOUNT_SWITCHED: "Account switched successfully",
};

export const RESPONSE_ERROR_MESSAGES = {
  REQUIRED_FIELDS: "All the Fields are required",
  ACCESS_TOKEN_REQUIRED: "Access Token is required",
  TEMP_TOKEN_REQUIRED: "Temp Token is required",
  TOKEN_INVALID: "Invalid or expired token",
  OTP_ATTEMPTS_EXCEEDED: "Maximum OTP attempts reached",
  INVALID_COUNTRYCODE_FORMAT: "Country code must start with + (e.g. +91)",
  ROLE_REQUIRED: "Role is required for new user registration",
  INVALID_ROLE: "Invalid role provided",
  USER_NOT_FOUND: "User not found",
  USER_NOT_REGISTERED: "User is not registered yet. Please contact Grovia team",
  INVALID_CLIENT_TYPE: "Invalid client type provided",
  OUTLET_NOT_ASSIGNED:
    "User is not assigned to any outlet yet. Please contact Grovia team",
};
