import express from "express";
import { createUser, login, logout } from "../controllers/authController.js";
import upload from "../services/multer.js";
const router = express.Router();

router.post("/auth/register", upload.single('file'), createUser);

router.post("/auth/login", login)

router.post("/auth/logout", logout)

export default router;