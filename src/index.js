import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from './db.js'; // Ensure .js is included
import userRoutes from "./routes/userRoutes.js"; // Ensure .js is included

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRoutes); // Use the user routes

const startServer = async () => {
  try {
    await connectToDatabase(); // Connect to the database
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
