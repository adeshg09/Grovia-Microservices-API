/// <reference path="../types/express/index.d.ts" />

import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { addAddress } from "../controllers/address.controller";

const router = Router();

router.post("/:customerId/address/add-address", authenticate, addAddress);

export default router;
