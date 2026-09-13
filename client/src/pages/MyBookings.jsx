import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/my-bookings');
        setBookings(response.data.data.bookings);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch your bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      {error ? (
        <ErrorMessage message={error} />
      ) : bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You do not have any bookings yet.</p>
          <Link to="/listings" className="text-primary-600 hover:text-primary-700">
            Browse listings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <Link
              key={booking._id}
              to={`/bookings/${booking._id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={booking.listing?.image?.url || 'https://via.placeholder.com/800x500'}
                alt={booking.listing?.title || 'Booked listing'}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">
                  {booking.listing?.title || 'Listing unavailable'}
                </h2>
                <p className="text-gray-600">
                  {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </p>
                <p className="mt-2 font-medium">${booking.totalPrice}</p>
                <p className="mt-2 capitalize text-sm text-gray-500">{booking.status}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
