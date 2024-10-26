import express from 'express';
import { getAllUsers } from '../controllers/userController.js'; // Import controller

const router = express.Router();

// Define a route to get all users
router.get('/users', getAllUsers);

export default router;
