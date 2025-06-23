export enum USER_ROLES {
  CUSTOMER = "customer",
  CAPTAIN = "captain",
  SUPER_ADMIN = "super-admin",
  OUTLET_ADMIN = "outlet-admin",
}

export enum GENDERS {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum VehicleType {
  MOTORCYCLE = "motorcycle",
  SCOOTER = "scooter",
  BICYLE = "bicycle",
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
  CAPTAIN_PROFILE_CREATED: "Captain profile created successfully",
  CAPTAIN_PROFILE_FETCHED: "Captain profile fetched successfully",
  SELFIE_UPLOADED: "Selfie uploaded successfully",
  BANK_DETAILS_ADDED: "Bank details added successfully",

  AADHAAR_INITIATED: "OTP sent to registered mobile number successfully",
  AADHAAR_VERIFIED: "Aadhaar verified successfully",

  PAN_VERIFIED: "PAN verified successfully",
  PAN_UPLOADED_VERIFIED: "PAN uploaded and verified successfully",

  KYC_DETAILS_SUBMITTED:
    "KYC details submitted successfully and is under review",
};

export const RESPONSE_ERROR_MESSAGES = {
  REQUIRED_FIELDS: "All the Fields are required",
  ACCESS_TOKEN_REQUIRED: "Access Token is required",
  TOKEN_INVALID: "Invalid or expired token",

  CAPTAIN_PROFILE_EXISTS: "Captain profile already exists",
  CAPTAIN_NOT_FOUND: "Captain not found",
  CAPTAIN_PROFILE_NOT_FOUND: "Captain profile not found",

  KYC_DETAILS_NOT_FOUND: "KYC details not found",
  KYC_DETAILS_NOT_SUBMITTED:
    "All documents must be verified before submitting KYC details",

  AADHAAR_ALREADY_VERIFIED: "Aadhaar already verified",
};
