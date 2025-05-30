import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router();

router.get('/',authenticateToken ,getAllUsers)
export default router;