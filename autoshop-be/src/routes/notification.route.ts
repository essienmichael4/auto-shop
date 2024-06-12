import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken.middleware";
import { getNotifications } from "../controllers/notification.controller";

const router = Router()

router.get("/auth/refresh-token", authenticateToken, getNotifications)

export default router
