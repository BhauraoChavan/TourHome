import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ListingGrid from '../components/ListingGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/listings/my-listings');
      setListings(response.data.data.listings);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await api.delete(`/listings/${id}`);
        setListings(listings.filter(listing => listing._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete listing');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Link
          to="/listings/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Add New Listing
        </Link>
      </div>

      {error ? (
        <ErrorMessage message={error} />
      ) : listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't created any listings yet.</p>
          <Link
            to="/listings/new"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div>
          <ListingGrid listings={listings} />
          <div className="mt-8 flex justify-center">
            <Link
              to="/listings"
              className="text-primary-600 hover:text-primary-700"
            >
              Browse all listings →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;