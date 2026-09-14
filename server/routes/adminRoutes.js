import express from 'express';
import {
  getDashboard,
  getUsers,
  getListings,
  getBookings
} from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);
router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.get('/listings', getListings);
router.get('/bookings', getBookings);

export default router;
