import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  CUSTOMER_SERVICE_PORT: process.env.PORT || 3001,
  AUTH_SERVICE_URL:
    process.env.AUTH_SERVICE_URL || "http://localhost:8001/api/v1/auth",
  MONGODB_URI: process.env.MONGODB_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:8000",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
