import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { envConfig } from "./config/env.config";
import { connectToDatabase } from "./config/db.config";
import { userCreatedConsumer } from "./consumers/user.consumer";
import { connectRabbitMQ } from "./utils/rabbitmq";
import AdminRouter from "./routes/admin.routes";

// Initialize Express app
const app = express();

// ======================
//  Middleware Setup
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
//  Routes
// ======================

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/admin", AdminRouter);

// ======================
//  Health Check
// ======================
app.get("/health", (req: Request, res: Response) => {
  res.send("Customer Service OK");
});

// ======================
//  Server Startup
// ======================
const PORT = envConfig.ADMIN_SERVICE_PORT;

const startServer = async () => {
  try {
    await connectToDatabase();
    await connectRabbitMQ();
    await userCreatedConsumer();

    app.listen(PORT, () => {
      console.log(`🚀 Admin service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting Admin service:", error);
    process.exit(1);
  }
};

startServer();

// Export for testing
export default app;
