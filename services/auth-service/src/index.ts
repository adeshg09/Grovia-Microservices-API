import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import AuthRouter from "./routes/auth.routes";
import UserRouter from "./routes/user.routes";
import { envConfig } from "./config/env.config";
import { connectToDatabase } from "./config/db.config";
import { connectRabbitMQ } from "./utils/rabbitmq";
import { seedSuperadmin } from "./scripts";
import { initModels } from "./utils/initModels";

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

app.use("/api/v1/auth", AuthRouter);

app.use("/api/v1/auth/users", UserRouter);

// ======================
//  Health Check
// ======================
app.get("/health", (req: Request, res: Response) => {
  res.send("Auth Service OK");
});

// ======================
//  Server Startup
// ======================
const PORT = envConfig.AUTH_SERVICE_PORT || 8001;

const startServer = async () => {
  try {
    await connectToDatabase();
    await initModels();
    await connectRabbitMQ();
    await seedSuperadmin();
    app.listen(PORT, () => {
      console.log(`🚀 Auth service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting Auth service:", error);
    process.exit(1);
  }
};

startServer();

// Export for testing
export default app;
