import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  CUSTOMER_SERVICE_PORT: process.env.PORT || 8002,

  AUTH_SERVICE_URL:
    process.env.AUTH_SERVICE_URL || "http://auth-service:8001/api/v1/auth",
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
};
