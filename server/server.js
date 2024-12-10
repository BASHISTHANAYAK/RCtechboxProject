import dotenv from "dotenv"
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import recordRoutes from "./routes/records.js"

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
// Routes
app.use('/api/records', recordRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error.message));
