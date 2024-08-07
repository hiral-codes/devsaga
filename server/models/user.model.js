import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    image: { type: String },
    tags: [{ type: String }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
    password: { type: String, required: true },
}, { timestamps: true }
)

export const User = mongoose.model("User", userSchema);