import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.patch('/:id/cancel', protect, cancelBooking);

export default router;