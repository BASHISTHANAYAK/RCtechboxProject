import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import recordRoutes from "./routes/records.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/records", recordRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch((error) => console.log("Error connecting to MongoDB:", error.message));

// Export app for serverless deployment
export default app;
