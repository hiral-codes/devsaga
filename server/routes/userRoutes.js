import express from "express";
import { addFollower, comment, createBlog, getAuthor, getBlogs, getSpecificBlog, like, moreBlogsFinder, removeFollower, searchBlog, unlike } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewears/Auth.js";

const router = express.Router();

router.post("/create-blog", createBlog);

router.get("/get-blogs", getBlogs);
router.get("/get-blogs/:username", moreBlogsFinder);
router.get("/get-blogs/:username/:blogId", getSpecificBlog);
router.get("/get-author/:username", getAuthor);

router.patch("/blog/like", like);
router.patch("/blog/unlike", unlike);
router.patch("/blog/add-comment", comment);

router.patch("/add-follower", addFollower);
router.patch("/remove-follower", removeFollower);

router.get("/search", searchBlog)

export default router;