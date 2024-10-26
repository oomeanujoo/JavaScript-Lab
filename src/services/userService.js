import { getClient } from '../db.js'; // Import the client from db.js

export const getAllUsers = async () => {
  const client = getClient(); // Get the database client
  console.log("Querying database for users"); // Log when querying the database
  try {
    const res = await client.query("SELECT * FROM users"); // Query all users
    console.log("Users fetched successfully:", res.rows); // Log users fetched
    return res.rows; // Return user data
  } catch (error) {
    console.error("Error fetching users:", error); // Log any errors
    throw error; // Rethrow error for handling
  }
};
