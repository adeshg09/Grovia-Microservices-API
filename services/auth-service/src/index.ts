import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import AuthRouter from "./routes/auth.routes";
import UserRouter from "./routes/user.routes";
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

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/auth/user", UserRouter);

// ======================
// 4. Health Check
// ======================
app.get("/health", (req: Request, res: Response) => {
  res.send("Auth Service OK");
});

// ======================
// 4. Server Startup
// ======================
const PORT = envConfig.AUTH_SERVICE_PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Auth service running on port ${PORT}`);
});

// Export for testing
export default app;
