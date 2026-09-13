import Listing from '../models/Listing.js';
import Review from '../models/Review.js';

// Check if user is listing owner
export const isListingOwner = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to perform this action'
      });
    }

    req.listing = listing;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Check if user is review author
export const isReviewAuthor = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    req.review = review;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};