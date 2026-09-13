import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    image: {
      filename: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        required: [true, 'Image URL is required'],
        default: 'https://via.placeholder.com/800x600'
      }
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

listingSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'listing'
});

listingSchema.virtual('averageRating').get(function () {
  if (this.reviews && this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.reviews.length;
  }
  return 0;
});

listingSchema.virtual('reviewCount').get(function () {
  return this.reviews ? this.reviews.length : 0;
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;