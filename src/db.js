import dotenv from 'dotenv';
import fs from 'fs';
import pkg from 'pg'; // PostgreSQL client
const { Client } = pkg;

dotenv.config(); // Load environment variables

// Build the connection string using environment variables
const { DB_USER, DB_PASSWORD, DB_URL } = process.env;
const connectionString = DB_URL
  .replace('{$DB_USER}', DB_USER)
  .replace('{$DB_PASSWORD}', DB_PASSWORD);

// Initialize database client
const client = new Client({
  connectionString, // Use the constructed connection string
  ssl: {
    rejectUnauthorized: false, // Disable SSL certificate verification (if needed)
    ca: fs.readFileSync("./src/assets/root.crt").toString(), // SSL certificate
  },
});

// Function to connect to the database
export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; // Rethrow error for further handling
  }
};

// Function to get the database client
export const getClient = () => client;
