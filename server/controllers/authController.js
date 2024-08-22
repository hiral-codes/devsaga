import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import cloudinary from "../services/cloudinary.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv'
dotenv.config();

export const createUser = async (req, res) => {
    try {
        const { username, email, firstName, lastName, tags, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }
        let avatar = "";
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "user_avatar",
                });
                avatar = result.secure_url;
            } catch (error) {
                console.error("Error uploading image:", error);
                return res.status(500).json({ message: "Image upload failed", error: error.message });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            firstName,
            lastName,
            image: avatar,
            tags,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        res.status(201).json({ user: savedUser, message: "User Created Successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Failed to Create User", error: error.message });
    }
};


export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(403).json({ message: "Invalid Password" });
        }

        const payload = { userId: user._id, username: username };

        const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: true });

        return res.status(200).json({ user, message: "Login Success" });

    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Internal Server Error" });
    }
};


export const logout = async (req, res) => {
    try {
        res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: true });
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ error: error, message: "Log out Failed..." })
    }
}
