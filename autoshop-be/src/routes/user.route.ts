import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authToken.middleware";

const router = Router()

router.post("/create-user", authenticateToken, createUser)

export default router
