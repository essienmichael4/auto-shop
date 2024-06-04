import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const router = Router()

router.post("/templates", createUser)

export default router
