import express from 'express';
import {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
  updateProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;