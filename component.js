import dotenv from 'dotenv';
import colors from 'colors';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

// Connect to database
connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});