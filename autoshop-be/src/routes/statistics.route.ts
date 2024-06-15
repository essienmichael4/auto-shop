import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken.middleware";
import { getStatistics, getRecentServices, getHistory } from "../controllers/statistics.controller";

const router = Router()

router.get("/stats-card", authenticateToken, getStatistics)
router.get("/recent-services", authenticateToken, getRecentServices)
router.get("/history-data", authenticateToken, getHistory)
router.get("/history-periods", authenticateToken, )

export default router
