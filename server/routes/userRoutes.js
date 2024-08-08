import express from "express";
import { createBlog, getAuthor, getBlogs, getSpecificBlog, like, moreBlogsFinder } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewears/Auth.js";
const router = express.Router();

router.post("/create-blog", createBlog);
router.get("/get-blogs", getBlogs);
router.get("/get-blogs/:username", moreBlogsFinder);
router.get("/get-blogs/:username/:blogId", getSpecificBlog);
router.patch("/like", like);
router.get("/get-author/:username", getAuthor)
export default router;