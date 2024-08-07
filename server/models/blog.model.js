import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
    likedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
}, { _id: false });

const commentSchema = new mongoose.Schema({
    commentBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    comment: { type: String, },
    createdAt: { type: Date, default: Date.now }
}, { _id: false });

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        firstName: String,
        lastName: String,
        image: String
    },
    likes: [likesSchema],
    comments: [commentSchema],
    tags: { type: Object }
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);
