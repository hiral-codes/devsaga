import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid: { type: String },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, },
    image: { type: String },
    tags: [{ type: String }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
}, { timestamps: true }
)

export const User = mongoose.model("User", userSchema);