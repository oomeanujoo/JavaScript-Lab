import dotenv from "dotenv";
import fs from "fs";
import pkg from "pg"; // Import the entire pg module as a default import
const { Client } = pkg; // Destructure the Client from the imported package

dotenv.config();

// Log the values of environment variables
console.log("DB_URL:", process.env.DB_URL);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const client = new Client({
  connectionString: process.env.DB_URL, // DB connection URL
  user: process.env.DB_USER, // DB username
  password: process.env.DB_PASSWORD, // DB password
  ssl: {
    rejectUnauthorized: false, // Change to true in production if you have a valid certificate
    ca: fs.readFileSync("./src/assets/root.crt").toString(), // Updated path to the certificate
  },
});

export const connectToDatabase = async () => {z
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; // Rethrow the error for further handling
  }
};

export const getClient = () => {
  return client; // Return the client for use in services
};

export const closeConnection = async () => {
  await client.end();
  console.log("Database connection closed");
};
