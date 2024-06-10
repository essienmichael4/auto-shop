import { Router } from "express";
import { createUser, getUser, getUsers, updateUserPassword } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authToken.middleware";

const router = Router()

router.post("/create-user", authenticateToken, createUser)
router.get("/employees", authenticateToken, getUsers)
router.get("/employees/:id", authenticateToken, getUser)
router.put("/employees/:id/password", authenticateToken, updateUserPassword)

export default router
