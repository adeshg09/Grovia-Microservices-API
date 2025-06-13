export const MODEL_ENTITIES = {
  OUTLET: "Outlet",
  CATEGORY: "Category",
  PRODUCT: "Product",
  INVENTORY: "Inventory",
  PRODUCT_REQUEST: "Product Request",
};

export enum USER_ROLES {
  CUSTOMER = "customer",
  CAPTAIN = "captain",
  SUPER_ADMIN = "super-admin",
  OUTLET_ADMIN = "outlet-admin",
}

export enum OUTLET_STATUS {
  OPEN = "open",
  CLOSED = "closed",
  UNDER_MAINTENANCE = "under_maintenance",
}
export enum OUTLET_TYPE {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum PRODUCT_STATUS {
  AVAILABLE = "available",
  OUT_OF_STOCK = "out_of_stock",
  DISCONTINUED = "discontinued",
}

export enum PRODUCT_REQUEST_STATUS {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum PRODUCT_UNITS {
  KG = "kg",
  G = "g",
  L = "l",
  ML = "ml",
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
  created: (entity: string) => `${entity} created successfully`,
  fetched: (entity: string) => `${entity} fetched successfully`,
  allFetched: (entity: string) =>
    `All ${entity.toLowerCase()}s fetched successfully`,
  updated: (entity: string) => `${entity} updated successfully`,
  deleted: (entity: string) => `${entity} deleted successfully`,
};

export const RESPONSE_ERROR_MESSAGES = {
  REQUIRED_FIELDS: "All the Fields are required",
  ACCESS_TOKEN_REQUIRED: "Access Token is required",
  TOKEN_INVALID: "Invalid or expired token",
  CUSTOMER_PROFILE_EXISTS: "Customer profile already exists",
  CUSTOMER_PROFILE_NOT_FOUND: "Customer profile not found",
  OUTLET_NOT_FOUND: "Outlet not found",
  INVENTORY_ALREADY_EXISTS:
    "Inventory record already exists for this product at this outlet",
};
