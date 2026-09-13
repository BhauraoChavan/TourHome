import Booking from '../models/Booking.js';
import Listing from '../models/Listing.js';
import { isValidObjectId, isValidDateRange } from '../utils/validation.js';
import emailService from '../services/emailService.js';

export const createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, guests } = req.body;

    if (!listingId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (!isValidObjectId(listingId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID'
      });
    }

    if (!isValidDateRange(checkIn, checkOut)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date range. Check-in must be before check-out and not in the past'
      });
    }

    if (guests < 1 || guests > 10) {
      return res.status(400).json({
        success: false,
        message: 'Guests must be between 1 and 10'
      });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    if (listing.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot book your own listing'
      });
    }

    const overlappingBooking = await Booking.findOne({
      listing: listingId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
        { checkIn: { $lte: new Date(checkIn) }, checkOut: { $gte: new Date(checkOut) } }
      ]
    });

    if (overlappingBooking) {
      return res.status(409).json({
        success: false,
        message: 'This property is already booked for the selected dates'
      });
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price;

    const booking = await Booking.create({
      listing: listingId,
      user: req.user._id,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: 'confirmed'
    });

    try {
      await emailService.sendBookingConfirmationEmail(
        req.user.email,
        req.user.name,
        booking,
        listing
      );
    } catch (error) {
      console.error('Failed to send booking confirmation email:', error);
    }

    const populatedBooking = await Booking.findById(booking._id)
      .populate('listing', 'title location country price image')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking: populatedBooking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('listing', 'title location country price image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { bookings }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};

export const getBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID'
      });
    }

    const booking = await Booking.findById(id)
      .populate('listing', 'title location country price image owner')
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID'
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed booking'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking'
    });
  }
};