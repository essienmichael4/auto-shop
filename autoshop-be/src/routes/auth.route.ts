import { Router } from "express";
import { loginUser, refreshToken } from "../controllers/auth.controller";
import { authenticateRefreshToken } from "../middlewares/authRefresh.middleware";

const router = Router()

router.post("/auth/login", loginUser)
router.post("/auth/refresh-token", authenticateRefreshToken, refreshToken)

export default router
