import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";

const handleError = (res, error, message = "An error occurred", statusCode = 500) => {
    console.error(error);
    res.status(statusCode).json({ message, error: error.message });
};

const handleNotFound = (res, message) => {
    res.status(404).json({ message });
};

const handleBadRequest = (res, message) => {
    res.status(400).json({ message });
};

export const createBlog = async (req, res) => {
    try {
        const { title, content, userId, banner, tags } = req.body;

        const user = await User.findById(userId);
        if (!user) return handleNotFound(res, "User not found");

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
        res.status(201).json({ savedBlog, message: "Blog Created Successfully" });
    } catch (error) {
        handleError(res, error, "Failed To Create Blog");
    }
};

export const getAuthor = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) return handleNotFound(res, "Author Not Found");

        const { firstName, lastName, image, followers, createdAt } = user;
        const data = {
            firstName,
            lastName,
            image,
            authorUsername: username,
            createdAt,
            followersCount: followers.length
        };
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error, "Failed to fetch the author");
    }
};

export const moreBlogsFinder = async (req, res) => {
    try {
        const { username } = req.params;
        const blogs = await Blog.find({ "author.username": username });
        if (!blogs || blogs.length === 0) return handleNotFound(res, "Blogs Not Found");

        res.status(200).json(blogs);
    } catch (error) {
        handleError(res, error, "Failed to fetch blogs");
    }
};


export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        handleError(res, error, "Failed To Get Blogs");
    }
};

export const getSpecificBlog = async (req, res) => {
    const { username, blogId } = req.params;
    try {
        const blog = await Blog.findOne({ 'author.username': username, _id: blogId });
        if (!blog) return handleNotFound(res, "Blog not found");

        res.status(200).json(blog);
    } catch (error) {
        handleError(res, error, "Failed to get blog");
    }
};

export const like = async (req, res) => {
    const { blogId, userId } = req.body;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) return handleNotFound(res, "Blog not found");

        const hasLiked = blog.likes.some(like => like.likedBy.toString() === userId);
        if (hasLiked) return handleBadRequest(res, "User has already liked the blog");

        blog.likes.push({ likedBy: userId });
        await blog.save();
        res.status(200).json({ message: "Liked" });
    } catch (error) {
        handleError(res, error, "Failed to like blog", 400);
    }
};

export const unlike = async (req, res) => {
    const { blogId, userId } = req.body;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) return handleNotFound(res, "Blog not found");

        const likeIndex = blog.likes.findIndex(like => like.likedBy.toString() === userId);
        if (likeIndex === -1) return handleBadRequest(res, "User has not liked the blog");

        blog.likes.splice(likeIndex, 1);
        await blog.save();
        res.status(200).json({ message: "Like Removed" });
    } catch (error) {
        handleError(res, error, "Failed to remove like", 400);
    }
};

export const comment = async (req, res) => {
    const { blogId, userId, comment } = req.body;
    try {
        const user = await User.findById(userId)
        if (!user) return handleNotFound(res, "User Not Found");
        const blog = await Blog.findById(blogId);
        if (!blog) return handleNotFound(res, "Blog not found");
        blog.comments.push({ commentBy: { userId, firstName: user.firstName, lastName: user.lastName, image: user.image }, comment });
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        handleError(res, error, "Failed to add comment", 400);
    }
};

export const searchBlog = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const blogs = await Blog.find();
        const filteredBlogs = blogs.filter(blog =>
            blog.title.toLowerCase().includes(keyword.toLowerCase())
        );
        res.status(200).json(filteredBlogs);
    } catch (error) {
        res.status(401).json("Error Getting Search", error)
    }
}

export const addFollower = async (req, res) => {
    try {
        const { followerId } = req.params;
        const { userId } = req.body;
        const user = User.findOne(userId)
        user.followers.push(followerId)
        await user.save();
        res.status(200).json("Follower Added...")
    } catch (error) {
        handleError(res, error)
    }
}

export const removeFollower = async (req, res) => {
    try {
        const { followerId } = req.params;
        const { userId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const followerIndex = user.followers.indexOf(followerId);
        if (followerIndex !== -1) {
            user.followers.splice(followerIndex, 1);
        } else {
            return res.status(404).json({ message: "Follower not found in user's followers" });
        }
        await user.save();
        res.status(200).json({ message: "Follower Removed" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};
