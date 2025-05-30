import express from 'express';
import { getAllUsers, getSalesVsEngineeringLogsData } from '../controllers/userController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router();

router.get('/',authenticateToken ,getAllUsers)
router.get('/data',authenticateToken ,getSalesVsEngineeringLogsData)
export default router;