import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required']
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required']
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'At least 1 guest is required'],
      max: [10, 'Maximum 10 guests allowed']
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative']
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

bookingSchema.index({ listing: 1, checkIn: 1, checkOut: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;