import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Listing from '../models/Listing.js';
import User from '../models/User.js';

dotenv.config();

const sampleListings = [
  {
    title: 'Cozy Beachfront Villa',
    description: 'Beautiful villa with direct beach access, private pool, and stunning ocean views. Perfect for families and couples looking for a relaxing getaway.',
    image: {
      filename: 'beach-villa.jpg',
      url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800'
    },
    price: 250,
    location: 'Goa',
    country: 'India'
  },
  {
    title: 'Modern City Apartment',
    description: 'Sleek and modern apartment in the heart of the city. Walking distance to major attractions, restaurants, and shopping.',
    image: {
      filename: 'city-apartment.jpg',
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    },
    price: 120,
    location: 'Mumbai',
    country: 'India'
  },
  {
    title: 'Mountain Cabin Retreat',
    description: 'Cozy cabin nestled in the mountains with breathtaking views. Perfect for nature lovers and hikers.',
    image: {
      filename: 'mountain-cabin.jpg',
      url: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800'
    },
    price: 180,
    location: 'Manali',
    country: 'India'
  },
  {
    title: 'Luxury Penthouse Suite',
    description: 'Stunning penthouse with panoramic city views, private terrace, and premium amenities.',
    image: {
      filename: 'penthouse.jpg',
      url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    },
    price: 500,
    location: 'Dubai',
    country: 'UAE'
  },
  {
    title: 'Traditional Japanese House',
    description: 'Authentic traditional Japanese house with tatami rooms, garden, and peaceful atmosphere.',
    image: {
      filename: 'japanese-house.jpg',
      url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800'
    },
    price: 200,
    location: 'Kyoto',
    country: 'Japan'
  },
  {
    title: 'Tropical Paradise Resort',
    description: 'Luxurious resort with private beach, infinity pool, and world-class amenities.',
    image: {
      filename: 'tropical-resort.jpg',
      url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
    },
    price: 350,
    location: 'Bali',
    country: 'Indonesia'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Listing.deleteMany({});
    console.log('Cleared existing listings');

    let demoUser = await User.findOne({ email: 'demo@tourhome.com' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Demo Owner',
        email: 'demo@tourhome.com',
        password: 'password123',
        isEmailVerified: true
      });
      console.log('Created demo user');
    } else {
      console.log('Using existing demo user');
    }

    const listingsWithOwner = sampleListings.map(listing => ({
      ...listing,
      owner: demoUser._id
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log(`Seeded ${sampleListings.length} listings`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedData();