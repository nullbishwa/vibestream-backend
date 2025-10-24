import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

console.log("DEBUG: Starting server...");
console.log("DEBUG: PORT =", process.env.PORT);
console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI ? "SET" : "NOT SET");

app.get("/", (req, res) => {
  res.send("VibeStream API Running");
});

// Test MongoDB connection first
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch(err => {
  console.error("MongoDB connection FAILED:", err.message);
});

// Start server anyway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
