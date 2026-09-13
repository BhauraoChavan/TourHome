import Listing from '../models/Listing.js';
import Review from '../models/Review.js';
import { isValidObjectId, isPositiveNumber } from '../utils/validation.js';

export const getListings = async (req, res) => {
  try {
    const { location, country, minPrice, maxPrice, keyword, page = 1, limit = 9 } = req.query;

    const query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { location: { $regex: keyword, $options: 'i' } },
        { country: { $regex: keyword, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const listings = await Listing.find(query)
      .populate('owner', 'name email')
      .populate('reviews')
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Listing.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        listings,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching listings'
    });
  }
};

export const getListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID'
      });
    }

    const listing = await Listing.findById(id)
      .populate('owner', 'name email')
      .populate({
        path: 'reviews',
        populate: {
          path: 'author',
          select: 'name'
        }
      });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { listing }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching listing'
    });
  }
};

export const createListing = async (req, res) => {
  try {
    const { title, description, image, price, location, country } = req.body;

    if (!title || !description || !price || !location || !country) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (!isPositiveNumber(price)) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number'
      });
    }

    const listing = await Listing.create({
      title,
      description,
      image: {
        filename: image?.filename || '',
        url: image?.url || 'https://via.placeholder.com/800x600'
      },
      price,
      location,
      country,
      owner: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: { listing }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating listing'
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, price, location, country } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID'
      });
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    if (title) listing.title = title;
    if (description) listing.description = description;
    if (image) {
      listing.image = {
        filename: image.filename || listing.image.filename,
        url: image.url || listing.image.url
      };
    }
    if (price !== undefined) {
      if (!isPositiveNumber(price)) {
        return res.status(400).json({
          success: false,
          message: 'Price must be a positive number'
        });
      }
      listing.price = price;
    }
    if (location) listing.location = location;
    if (country) listing.country = country;

    await listing.save();

    res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      data: { listing }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating listing'
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID'
      });
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await Review.deleteMany({ listing: id });
    await listing.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting listing'
    });
  }
};

export const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user._id })
      .populate('reviews')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { listings }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching your listings'
    });
  }
};