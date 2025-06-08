import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import CustomerRouter from "./routes/customer.routes";
import AddressRouter from "./routes/address.routes";
import { envConfig } from "./config/env.config";
import { connectToDatabase } from "./config/db.config";

// Initialize Express app
const app = express();

// ======================
// 1. Middleware Setup
// ======================
app.use(
  cors({
    origin: [envConfig.CORS_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON bodies

// ======================
// 2. Database Connection
// ======================
connectToDatabase();

// ======================
// 3. Routes
// ======================

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/customer", CustomerRouter);
app.use("/api/v1/customer", AddressRouter);

// ======================
// 4. Health Check
// ======================
app.get("/health", (req: Request, res: Response) => {
  res.send("Customer Service OK");
});

// ======================
// 4. Server Startup
// ======================
const PORT = envConfig.CUSTOMER_SERVICE_PORT || 8002;

app.listen(PORT, () => {
  console.log(`🚀 Customer service running on port ${PORT}`);
});

// Export for testing
export default app;
