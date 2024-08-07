import express from "express";
import { createBlog, getBlogs, like } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewears/Auth.js";
const router = express.Router();

router.post("/create-blog", createBlog);
router.get("/get-blogs", getBlogs);
router.patch("/like", like);

export default router;