import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  AUTH_SERVICE_PORT: process.env.PORT || 8001,

  CUSTOMER_SERVICE_URL:
    process.env.CUSTOMER_SERVICE_URL || "http://localhost:8002/api/v1/customer",
  CAPTAIN_SERVICE_URL:
    process.env.CAPTAIN_SERVICE_URL || "http://localhost:8003/api/v1/captain",
  ADMIN_SERVICE_URL:
    process.env.ADMIN_SERVICE_URL || "http://localhost:8004/api/v1/admin",
  INVENTORY_SERVICE_URL:
    process.env.INVENTORY_SERVICE_URL ||
    "http://localhost:8005/api/v1/inventory",

  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:8000",
  MONGODB_URI: process.env.MONGODB_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "access_secret",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID,
  SUPER_ADMIN_PHONE_NUMBER:
    process.env.SUPER_ADMIN_PHONE_NUMBER || "+919322342112",
  SUPER_ADMIN_ROLE: process.env.SUPER_ADMIN_ROLE || "super-admin",
};
