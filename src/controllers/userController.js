import * as userService from '../services/userService.js';

// Controller to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Fetch users from the service
    res.json(users); // Send users as JSON response
  } catch (error) {
    console.error('Failed to fetch users:', error); // Log errors
    res.status(500).json({ error: 'Failed to fetch users' }); // Send error response
  }
};
