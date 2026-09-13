import 'dotenv/config';
import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendEmail(to, subject, html) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Email error:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendVerificationEmail(email, name, token) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0284c7;">Welcome to TourHome!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for registering. Please verify your email address to activate your account.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #0284c7; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="color: #0284c7;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, you can ignore this email.</p>
      </div>
    `;

    return this.sendEmail(email, 'Verify Your Email - TourHome', html);
  }

  async sendPasswordResetEmail(email, name, token) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0284c7;">Reset Your Password</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to proceed:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #0284c7; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="color: #0284c7;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `;

    return this.sendEmail(email, 'Reset Your Password - TourHome', html);
  }

  async sendBookingConfirmationEmail(email, name, booking, listing) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0284c7;">Booking Confirmed!</h2>
        <p>Hi ${name},</p>
        <p>Your booking has been confirmed. Here are the details:</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">${listing.title}</h3>
          <p><strong>Location:</strong> ${listing.location}, ${listing.country}</p>
          <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
          <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> ${booking.guests}</p>
          <p><strong>Total Price:</strong> $${booking.totalPrice}</p>
          <p><strong>Status:</strong> ${booking.status}</p>
        </div>
        <p>Thank you for choosing TourHome!</p>
      </div>
    `;

    return this.sendEmail(email, 'Booking Confirmation - TourHome', html);
  }
}

export default new EmailService();