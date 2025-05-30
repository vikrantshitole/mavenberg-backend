import * as authService from '../services/authService.js';
import { getUserById } from '../services/userService.js';
import jwt from 'jsonwebtoken';
export const login = async(req,res,next) => {
    const { email, password, role_id } = req.body;
    if (!email || !password || !role_id) {
        return res.status(400).json({ error: "Email, password, and role_id are required" });
    }
    try {
        const response = await authService.login(email, password, role_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
        
    }

}
export const authenticateToken = async(req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.query.token;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token,authHeader);
    
    if (!token) {
      return next({
        status: 'error',
        statusCode: 401,
        message: 'No token provided',
        code: 'NO_TOKEN_PROVIDED',
      });
    }

    const decoded = verifyToken(token);
    
    const user = await getUserById(decoded.userId);
    if (!user) {
      return next({
        status: 'error',
        statusCode: 404,
        message: 'User not found',
        code: 'USER_NOT_FOUND',
      });
    }
    if (!user.role || !user.role.name) {
      return next({
        status: 'error',
        statusCode: 403,
        message: 'User role not found or invalid',
        code: 'INVALID_USER_ROLE',
      });
    }
    req.user = user; 
    req.token = decoded;    
    next();
  } catch (error) {
    console.log(error);
    
    return next({
      status: 'error',
      statusCode: 403,
      message: 'Invalid token',
      code: 'INVALID_TOKEN',
    });
  }
};

/**
 * Verify JWT token and check API key
 * @param {string} token - JWT token to verify
 * @returns {Object} Verification result
 */
export const verifyToken = (token) => {
  try {
    if (!token) {
      return {
        isValid: false,
        error: 'No token provided',
        errorCode: 'TOKEN_MISSING'
      };
    }

    const decoded = jwt.verify(token, 'MY_SECRET_KEY');
    if (!decoded || !decoded.userId) {
      return {
        isValid: false,
        error: 'Invalid token structure',
        errorCode: 'INVALID_TOKEN_STRUCTURE'
      };
    }
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return {
        isValid: false,
        error: 'Token has expired',
        errorCode: 'TOKEN_EXPIRED',
        expiredAt: new Date(error.expiredAt)
      };
    }
    if (error.name === 'JsonWebTokenError') {
      return {
        isValid: false,
        error: 'Invalid token format',
        errorCode: 'INVALID_TOKEN'
      };
    }
    return {
      isValid: false,
      error: error.message,
      errorCode: 'TOKEN_VERIFICATION_ERROR'
    };
  }
};