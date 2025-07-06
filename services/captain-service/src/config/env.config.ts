import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  CAPTAIN_SERVICE_PORT: process.env.PORT || 8003,

  AUTH_SERVICE_URL:
    process.env.AUTH_SERVICE_URL || "http://localhost:8001/api/v1/auth",
  CUSTOMER_SERVICE_URL:
    process.env.CAPTAIN_SERVICE_URL || "http://localhost:8002/api/v1/customer",
  ADMIN_SERVICE_URL:
    process.env.ADMIN_SERVICE_URL || "http://localhost:8004/api/v1/admin",
  INVENTORY_SERVICE_URL:
    process.env.INVENTORY_SERVICE_URL ||
    "http://localhost:8005/api/v1/inventory",

  MONGODB_URI: process.env.MONGODB_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:8000",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,

  SANDBOX_API_KEY: process.env.SANDBOX_API_KEY,
  SANDBOX_API_SECRET: process.env.SANDBOX_API_SECRET,

  SANDBOX_CONFIG: {
    baseURL: process.env.SANDBOX_BASE_URL || "https://api.sandbox.co.in", // Live API endpoint
    headers: {
      "x-api-key": process.env.SANDBOX_API_KEY, // Your Live API key
      "x-api-secret": process.env.SANDBOX_API_SECRET, // Your Live API secret
      "x-api-version": "1.0",
      "Content-Type": "application/json",
      Authorization: `${process.env.SANDBOX_ACCESS_TOKEN}`,
    },
  },

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  RESEND_API_KEY: process.env.RESEND_API_KEY,
};
