import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "http://localhost:5174", 
      "http://127.0.0.1:5173", 
      "http://127.0.0.1:5174",
      "https://sih-career-guidance-platform.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);

// Global error-handling middleware
// Catches errors thrown by asyncHandler / ApiError and returns clean JSON
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
  });
});

export default app;