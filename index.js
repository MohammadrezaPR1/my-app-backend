import express from "express";
import db from "./config/Database.js";
import userRoutes from "./routes/userRoute.js"
import categoryRoutes from "./routes/categoryRoute.js";
import videoRoutes from "./routes/videoRoute.js";
import newsRoutes from "./routes/newsRoute.js"
import commentRoutes from "./routes/commentRoute.js"
import sendEmailRoutes from "./routes/sendEmailRoute.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

try {
    await db.authenticate();
    console.log("Database connected !");
    await db.sync({ alter: true });
} catch (error) {
    console.log(`We have some error :
     ${error}`);
}

// CORS Configuration
app.use(cors({
    credentials: true,
    origin: FRONTEND_URL.split(',').map(url => url.trim()) // پشتیبانی از چند origin
}));

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use(userRoutes);
app.use(categoryRoutes);
app.use(videoRoutes);
app.use(newsRoutes);
app.use(commentRoutes);
app.use(sendEmailRoutes);

// Health check endpoint for monitoring
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode!`);
});


