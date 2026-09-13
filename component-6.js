import User from '../models/User.js';
import { generateToken, generateRandomToken, hashToken, setCookie, clearCookie } from '../utils/token.js';
import { isValidEmail, isValidPassword } from '../utils/validation.js';
import emailService from '../services/emailService.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email'
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Generate verification token
    const verificationToken = generateRandomToken();
    const verificationTokenHash = hashToken(verificationToken);
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      verificationTokenHash,
      verificationTokenExpiry
    });

    // Send verification email
    try {
      await emailService.sendVerificationEmail(email, name, verificationToken);
    } catch (error) {
      console.error('Failed to send verification email:', error);
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      data: {
        user: user.toJSON()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in'
      });
    }

    // Generate token
    const token = generateToken(user._id);
    setCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: user.toJSON()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  clearCookie(res);
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required'
      });
    }

    // Hash the token
    const tokenHash = hashToken(token);

    // Find user with this token
    const user = await User.findOne({
      verificationTokenHash: tokenHash,
      verificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Update user
    user.isEmailVerified = true;
    user.verificationTokenHash = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully. You can now login.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during email verification'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link'
      });
    }

    // Generate reset token
    const resetToken = generateRandomToken();
    const resetTokenHash = hashToken(resetToken);
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save hashed token
    user.resetPasswordTokenHash = resetTokenHash;
    user.resetPasswordTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send email
    try {
      await emailService.sendPasswordResetEmail(email, user.name, resetToken);
    } catch (error) {
      console.error('Failed to send reset email:', error);
      user.resetPasswordTokenHash = undefined;
      user.resetPasswordTokenExpiry = undefined;
      await user.save();
      return res.status(500).json({
        success: false,
        message: 'Failed to send reset email. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during password reset request'
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Reset token is required'
      });
    }

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide password and confirm password'
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Hash the token
    const tokenHash = hashToken(token);

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password
    user.password = password;
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: {
        user: user.toJSON()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email && email !== user.email) {
      // Check if email is already taken
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already in use'
        });
      }
      user.email = email;
      user.isEmailVerified = false;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user.toJSON()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during profile update'
    });
  }
};