import express from "express";
import { comment, createBlog, getAuthor, getBlogs, getSpecificBlog, like, moreBlogsFinder, unlike } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewears/Auth.js";
const router = express.Router();

router.post("/create-blog", createBlog);
router.get("/get-blogs", getBlogs);
router.get("/get-blogs/:username", moreBlogsFinder);
router.get("/get-blogs/:username/:blogId", getSpecificBlog);
router.patch("/blog/like", like);
router.patch("/blog/unlike", unlike);
router.patch("/blog/add-comment", comment);

router.get("/get-author/:username", getAuthor)
export default router;