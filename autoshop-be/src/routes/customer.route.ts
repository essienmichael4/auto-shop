import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken.middleware";
import { createCustomer, getCustomer, getCustomers } from "../controllers/customer.controller";

const router = Router()

router.post("/customers", authenticateToken, createCustomer)
router.get("/customers", authenticateToken, getCustomers)
router.get("/customers/:id", authenticateToken, getCustomer)

export default router
