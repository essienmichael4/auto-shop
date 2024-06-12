import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken.middleware";
import { createService, getService, getServices, updateService } from "../controllers/service.controller";

const router = Router()

router.post("/services", authenticateToken, createService)
router.get("/services", authenticateToken, getServices)
router.get("/services/:id", authenticateToken, getService)
router.put("/services/:id", authenticateToken, updateService)

export default router
