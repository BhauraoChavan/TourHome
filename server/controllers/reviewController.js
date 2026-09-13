import Review from '../models/Review.js';
import Listing from '../models/Listing.js';
import { isValidObjectId, isValidRating } from '../utils/validation.js';

export const createReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID'
      });
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rating and comment'
      });
    }

    if (!isValidRating(rating)) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const existingReview = await Review.findOne({
      author: req.user._id,
      listing: id
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: 'You have already reviewed this listing'
      });
    }

    const review = await Review.create({
      rating,
      comment,
      author: req.user._id,
      listing: id
    });

    const populatedReview = await Review.findById(review._id)
      .populate('author', 'name');

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: { review: populatedReview }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating review'
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { listingId, reviewId } = req.params;

    if (!isValidObjectId(listingId) || !isValidObjectId(reviewId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID'
      });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.listing.toString() !== listingId) {
      return res.status(400).json({
        success: false,
        message: 'Review does not belong to this listing'
      });
    }

    if (review.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting review'
    });
  }
};