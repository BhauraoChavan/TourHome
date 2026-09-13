import mongoose from 'mongoose';

export const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const isValidRating = (rating) => {
  return rating >= 1 && rating <= 5;
};

export const isValidDateRange = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return false;
  }
  
  return start < end && start >= new Date();
};

export const isPositiveNumber = (num) => {
  return typeof num === 'number' && num >= 0;
};