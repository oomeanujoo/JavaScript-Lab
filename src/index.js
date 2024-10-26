import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectToDatabase } from './db.js'; // Database connection
import userRoutes from "./routes/userRoutes.js"; // Import user routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Set Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:;");
  next();
});

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from dist
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from dist

// Routes for your API
app.use("/api", userRoutes); // API routes

// Fallback route to serve index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Serve index.html from dist
});

// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectToDatabase(); // Ensure your database is connected
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
