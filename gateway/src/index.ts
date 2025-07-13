import express from "express";
import expressProxy from "express-http-proxy";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get("/health", (req, res) => {
  res.send("Gateway running OK");
});

// Proxy routes to services
app.use(
  "/api/v1/auth",
  expressProxy(process.env.AUTH_SERVICE_URL || "http://localhost:8001", {
    proxyReqPathResolver: (req) => `/api/v1/auth${req.url}`,
  })
);

app.use(
  "/api/v1/customer",
  expressProxy(process.env.CUSTOMER_SERVICE_URL || "http://localhost:8002", {
    proxyReqPathResolver: (req) => `/api/v1/customer${req.url}`,
  })
);

app.use(
  "/api/v1/captain",
  expressProxy(process.env.CAPTAIN_SERVICE_URL || "http://localhost:8003", {
    proxyReqPathResolver: (req) => `/api/v1/captain${req.url}`,
  })
);

app.use(
  "/api/v1/admin",
  expressProxy(process.env.ADMIN_SERVICE_URL || "http://localhost:8004", {
    proxyReqPathResolver: (req) => `/api/v1/admin${req.url}`,
  })
);

app.use(
  "/api/v1/inventory",
  expressProxy(process.env.INVENTORY_SERVICE_URL || "http://localhost:8005", {
    proxyReqPathResolver: (req) => `/api/v1/inventory${req.url}`,
  })
);

app.listen(process.env.GATEWAY_PORT || 8000, () => {
  console.log(`🚀 Gateway running on port ${process.env.GATEWAY_PORT}`);
});
