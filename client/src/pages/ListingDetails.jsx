import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/BookingForm';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FaMapMarkerAlt, FaStar, FaEdit, FaTrash, FaUser } from 'react-icons/fa';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/listings/${id}`);
      setListing(response.data.data.listing);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch listing');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (bookingData) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setBookingLoading(true);
      const response = await api.post('/bookings', {
        listingId: id,
        ...bookingData
      });
      alert('Booking confirmed! Check your email for details.');
      navigate('/my-bookings');
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReview = async (reviewData) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setReviewLoading(true);
      await api.post(`/listings/${id}/reviews`, reviewData);
      await fetchListing();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await api.delete(`/listings/${id}/reviews/${reviewId}`);
      await fetchListing();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete review');
    }
  };

  const handleDeleteListing = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await api.delete(`/listings/${id}`);
        navigate('/my-listings');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete listing');
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!listing) return <ErrorMessage message="Listing not found" />;

  const isOwner = user?._id === listing.owner?._id;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={listing.image?.url || 'https://via.placeholder.com/800x600'}
              alt={listing.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-1" />
                <span>{listing.location}, {listing.country}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-500 mr-4">
                  <FaStar className="mr-1" />
                  <span className="text-gray-700">
                    {listing.averageRating ? listing.averageRating.toFixed(1) : 'New'}
                  </span>
                </div>
                <span className="text-gray-500">
                  {listing.reviewCount || 0} reviews
                </span>
              </div>

              <div className="border-t pt-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">About this place</h2>
                <p className="text-gray-700">{listing.description}</p>
              </div>

              <div className="border-t pt-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Hosted by</h2>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium">{listing.owner?.name}</p>
                    <p className="text-gray-500 text-sm">{listing.owner?.email}</p>
                  </div>
                </div>
              </div>

              {isOwner && (
                <div className="border-t pt-4 flex space-x-4">
                  <Link
                    to={`/listings/${listing._id}/edit`}
                    className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    <FaEdit /> <span>Edit</span>
                  </Link>
                  <button
                    onClick={handleDeleteListing}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    <FaTrash /> <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <ReviewList reviews={listing.reviews} onDelete={handleDeleteReview} />
            
            {isAuthenticated && !isOwner && (
              <div className="mt-6">
                <ReviewForm onSubmit={handleReview} loading={reviewLoading} />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <BookingForm
              listing={listing}
              onSubmit={handleBooking}
              loading={bookingLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;