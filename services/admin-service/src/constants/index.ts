export enum USER_ROLES {
  CUSTOMER = "customer",
  CAPTAIN = "captain",
  SUPER_ADMIN = "super-admin",
  OUTLET_ADMIN = "outlet-admin",
}

export enum USER_STATUS {
  ACTIVE = "active",
  PENDING = "pending",
  BLOCKED = "blocked",
}

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
  PROFILE_CREATED: "Profile created successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  PROFILE_DELETED: "Profile deleted successfully",
  PROFILE_FETCHED: "Profile fetched successfully",
  ADMIN_DETAILS_FETCHED: "Admin details fetched successfully",
};

export const RESPONSE_ERROR_MESSAGES = {
  REQUIRED_FIELDS: "All the Fields are required",
  ACCESS_TOKEN_REQUIRED: "Access Token is required",
  TOKEN_INVALID: "Invalid or expired token",
  ADMIN_PROFILE_NOT_FOUND: "Admin profile not found",
  ADMIN_PROFILE_EXISTS: "Admin profile already exists",
};
