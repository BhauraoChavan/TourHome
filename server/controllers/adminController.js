import User from '../models/User.js';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';

export const getDashboard = async (req, res) => {
  const [users, listings, bookings] = await Promise.all([
    User.countDocuments(),
    Listing.countDocuments(),
    Booking.countDocuments()
  ]);

  res.json({
    success: true,
    data: { users, listings, bookings }
  });
};

export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ success: true, data: { users } });
};

export const getListings = async (req, res) => {
  const listings = await Listing.find().populate('owner', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, data: { listings } });
};

export const getBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .populate('listing', 'title')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: { bookings } });
};
