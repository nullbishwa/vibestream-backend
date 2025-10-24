import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug logs (for Render logs)
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI is set:", !!process.env.MONGO_URI);

// Test route
app.get("/", (req, res) => {
  res.send("VibeStream API Running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit if DB fails
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
