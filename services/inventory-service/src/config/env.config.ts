import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  INVENTORY_SERVICE_PORT: process.env.PORT || 8005,

  AUTH_SERVICE_URL:
    process.env.AUTH_SERVICE_URL || "http://auth-service:8001/api/v1/auth",
  CUSTOMER_SERVICE_URL:
    process.env.CUSTOMER_SERVICE_URL ||
    "http://customer-service:8002/api/v1/customer",
  CAPTAIN_SERVICE_URL:
    process.env.CAPTAIN_SERVICE_URL ||
    "http://captain-service:8003/api/v1/captain",
  ADMIN_SERVICE_URL:
    process.env.ADMIN_SERVICE_URL || "http://admin-service:8004/api/v1/admin",
  INVENTORY_SERVICE_URL:
    process.env.INVENTORY_SERVICE_URL ||
    "http://inventory-service:8005/api/v1/inventory",

  MONGODB_URI: process.env.MONGODB_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:8000",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,

  DEFAULT_OUTLET_NAME: process.env.DEFAULT_OUTLET_NAME,
  DEFAULT_OUTLET_ADDRESS: process.env.DEFAULT_OUTLET_ADDRESS,
  DEFAULT_OUTLET_CITY: process.env.DEFAULT_OUTLET_CITY,
  DEFAULT_OUTLET_STATE: process.env.DEFAULT_OUTLET_STATE,
  DEFAULT_OUTLET_COUNTRY: process.env.DEFAULT_OUTLET_COUNTRY,
  DEFAULT_OUTLET_PINCODE: process.env.DEFAULT_OUTLET_PINCODE,
  DEFAULT_OUTLET_LOCATION_COORDINATES:
    process.env.DEFAULT_OUTLET_LOCATION_COORDINATES,
  DEFAULT_OUTLET_CONTACTNUMBER: process.env.DEFAULT_OUTLET_CONTACTNUMBER,
};
