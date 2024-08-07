import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";


export const createBlog = async (req, res) => {
    try {
        const { title, content, userId, banner, tags } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const blog = new Blog({
            title,
            content,
            banner,
            tags,
            author: {
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                username: user.username
            },
        });
        const savedBlog = await blog.save();
        res.status(200).json({ savedBlog, message: "Blog Created Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed To Create Blog", error: error.message });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).json({ message: "Failed To Get Blog" })
    }
}

export const like = async (req, res) => {
    const { blogId, userId } = req.body;
    try {
        const blog = await Blog.findByIdAndUpdate(blogId);
        blog.likes.count = blog.likes.count + 1;
        blog.likes.likedBy.push(userId);
        await blog.save();
        res.status(200).json({ blog, message: "Liked" })
    } catch (error) {
        res.status(400).json("error: ", error)
    }

}