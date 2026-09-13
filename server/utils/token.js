import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const setCookie = (res, token) => {
  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.cookie('jwt', token, options);
};

export const clearCookie = (res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};