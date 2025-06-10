import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import CustomerRouter from "./routes/customer.routes";
import AddressRouter from "./routes/address.routes";
import { envConfig } from "./config/env.config";
import { connectToDatabase } from "./config/db.config";
import { connectRabbitMQ } from "./utils/rabbitmq";

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
// 3. Routes
// ======================

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/customer", CustomerRouter);
app.use("/api/v1/customer/addresses", AddressRouter);

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

const startServer = async () => {
  try {
    await connectToDatabase();
    await connectRabbitMQ();
    app.listen(PORT, () => {
      console.log(`🚀 Customer service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting Customer service:", error);
    process.exit(1);
  }
};

startServer();

// Export for testing
export default app;
