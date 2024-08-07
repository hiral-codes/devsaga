import express from "express";
import { createUser, login, logout } from "../controllers/authController.js";
const router = express.Router();

router.post("/auth/register", createUser)
router.post("/auth/login", login)
router.post("/auth/logout", logout)

export default router;