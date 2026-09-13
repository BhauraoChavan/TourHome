import express from 'express';
import { createReview, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id/reviews', protect, createReview);
router.delete('/:listingId/reviews/:reviewId', protect, deleteReview);

export default router;