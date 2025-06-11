import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import OutletRouter from "./routes/outlet.routes";
import ProductRouter from "./routes/product.routes";
import CategoryRouter from "./routes/category.routes";
import InventoryRouter from "./routes/inventory.routes";
import ProductRequestRouter from "./routes/productRequest.routes";

import { envConfig } from "./config/env.config";
import { connectToDatabase } from "./config/db.config";
import { connectRabbitMQ } from "./utils/rabbitmq";
import { defaultOutletAdminCreatedConsumer } from "./consumers/defaultOutletAdmin.consumer";

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

app.use("/api/v1/inventory/outlets", OutletRouter);
app.use("/api/v1/inventory/categories", CategoryRouter);
app.use("/api/v1/inventory/products", ProductRouter);
app.use("/api/v1/inventory", InventoryRouter);
app.use("/api/v1/inventory/product-requests", ProductRequestRouter);

// ======================
// 4. Health Check
// ======================
app.get("/health", (req: Request, res: Response) => {
  res.send("Customer Service OK");
});

// ======================
// 4. Server Startup
// ======================
const PORT = envConfig.INVENTORY_SERVICE_PORT || 8005;

const startServer = async () => {
  try {
    await connectToDatabase();
    await connectRabbitMQ();
    await defaultOutletAdminCreatedConsumer();
    app.listen(PORT, () => {
      console.log(`🚀 Inventory service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting Inventory service:", error);
    process.exit(1);
  }
};

startServer();

// Export for testing
export default app;
