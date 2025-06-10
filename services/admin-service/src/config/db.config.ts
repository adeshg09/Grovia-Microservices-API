import mongoose from "mongoose";
import { envConfig } from "./env.config";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(envConfig.MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit the process if connection fails
  }
};
