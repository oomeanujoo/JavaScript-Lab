// src/services/userService.js
import { connectToDatabase } from '../db.js'; // Add '.js' to resolve the module


export const getAllUsers = async () => {
  const client = db.getClient(); // Get the client instance
  try {
    const res = await client.query("SELECT * FROM users"); // Fetch all users
    return res.rows; // Return the result
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow error to handle in the controller
  }
};
