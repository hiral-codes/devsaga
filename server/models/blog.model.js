import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
    likedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
}, { _id: false });

const commentSchema = new mongoose.Schema({
    commentBy: { userId: String, firstName: String, lastName: String, image: String },
    comment: { type: String, },
    createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    banner: String,
    author: {
        firstName: String,
        lastName: String,
        image: String,
        username: String
    },
    likes: [likesSchema],
    comments: [commentSchema],
    tags: { type: Object }
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);
