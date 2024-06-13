import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken.middleware";
import { getStatistics, getRecentServices } from "../controllers/stats.controller";

const router = Router()

router.get("/stats-card", authenticateToken, getStatistics)
router.get("/recent-services", authenticateToken, getRecentServices)
// router.get("/employees/:id", authenticateToken, getUser)
// router.put("/employees/:id/password", authenticateToken, updateUserPassword)

export default router
