import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/DB.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

dotenv.config();

const app = express();
const port = process.env.PORT || 8888

// Middlewears
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


app.listen(port, () => {
    console.log(`Server is active and running at http://localhost:${port}`);
})

connectDB();

// Auth Routes...
app.use("/api/v1", authRoutes)
app.use("/api/v1", userRoutes)