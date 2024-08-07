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
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
            },
        });
        const savedBlog = await blog.save();
        res.status(200).json({ savedBlog, message: "Blog Created Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed To Create Blog", error: error.message });
    }
};

export const getAuthor = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json("!Author Not Found");
        }
        const { firstName, lastName, image, followers, username: authorUsername,createdAt } = user;
        const data = {
            firstName,
            lastName,
            image,
            authorUsername,
            createdAt,
            followersCount: followers.length
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the author." });
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

export const getSpecificBlog = async (req, res) => {
    const { username, blogId } = req.params;
    try {
        const blog = await Blog.findOne({ 'author.username': username, _id: blogId });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: "Failed to get blog" });
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