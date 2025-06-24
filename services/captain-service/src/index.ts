import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import CaptainRouter from "./routes/captain.routes";
import KycRouter from "./routes/kycdetails.routes";
import { envConfig } from "./config/env.config";
import { connectToDatabase } from "./config/db.config";
import { connectRabbitMQ } from "./utils/rabbitmq";
import { initModels } from "./utils/initModels";

// Initialize Express app
const app = express();

// ======================
// Middleware Setup
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
// Routes
// ======================
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/captain", CaptainRouter);

app.use("/api/v1/captain/kyc", KycRouter);

// ======================
// Health Check
// ======================
app.get("/health", (req: Request, res: Response) => {
  res.send("Captain Service OK");
});

// ======================
// Server Startup
// ======================
const PORT = envConfig.CAPTAIN_SERVICE_PORT || 8002;

const startServer = async () => {
  try {
    await connectToDatabase();
    await initModels();
    await connectRabbitMQ();
    app.listen(PORT, () => {
      console.log(`🚀 Captain service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting Captain service:", error);
    process.exit(1);
  }
};

startServer();

// Export for testing
export default app;
