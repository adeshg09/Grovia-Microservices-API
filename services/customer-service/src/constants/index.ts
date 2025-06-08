export enum AddressType {
  HOME = "home",
  WORK = "work",
  OTHER = "other",
}

export enum USER_ROLES {
  CUSTOMER = "customer",
  CAPTAIN = "captain",
  ADMIN = "admin",
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
  CUSTOMER_PROFILE_CREATED: "Customer profile created successfully",
  CUSTOMER_PROFILE_UPDATED: "Customer profile updated successfully",
  CUSTOMER_PROFILE_DELETED: "Customer profile deleted successfully",
  CUSTOMER_PROFILE_FETCHED: "Customer profile fetched successfully",
  ADDRESS_ADDED: "Address added successfully",
  ADDRESS_UPDATED: "Address updated successfully",
  ADDRESS_DELETED: "Address deleted successfully",
  ADDRESS_FETCHED: "Address fetched successfully",
};

export const RESPONSE_ERROR_MESSAGES = {
  REQUIRED_FIELDS: "All the Fields are required",
  ACCESS_TOKEN_REQUIRED: "Access Token is required",
  TOKEN_INVALID: "Invalid or expired token",
  CUSTOMER_PROFILE_EXISTS: "Customer profile already exists",
  CUSTOMER_PROFILE_NOT_FOUND: "Customer profile not found",
};
