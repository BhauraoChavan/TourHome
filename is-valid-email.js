import mongoose from 'mongoose';

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Validate MongoDB ObjectId
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Validate rating
export const isValidRating = (rating) => {
  return rating >= 1 && rating <= 5;
};

// Validate dates
export const isValidDateRange = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return false;
  }
  
  return start < end && start >= new Date();
};

// Validate positive number
export const isPositiveNumber = (num) => {
  return typeof num === 'number' && num >= 0;
};