import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  ADMIN_SERVICE_PORT: process.env.PORT || 8002,

  AUTH_SERVICE_URL:
    process.env.AUTH_SERVICE_URL || "http://localhost:8001/api/v1/auth",
  CUSTOMER_SERVICE_URL:
    process.env.CUSTOMER_SERVICE_URL || "http://localhost:8002/api/v1/customer",
  CAPTAIN_SERVICE_URL:
    process.env.CAPTAIN_SERVICE_URL || "http://localhost:8003/api/v1/captain",
  INVENTORY_SERVICE_URL:
    process.env.INVENTORY_SERVICE_URL ||
    "http://localhost:8005/api/v1/inventory",

  MONGODB_URI: process.env.MONGODB_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:8000",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  SUPER_ADMIN_First_Name: process.env.SUPER_ADMIN_FIRST_NAME,
  SUPER_ADMIN_LAST_Name: process.env.SUPER_ADMIN_LAST_NAME,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
};
