import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`/bookings/${id}`);
        setBooking(response.data.data.booking);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch booking');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const cancelBooking = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      setCancelling(true);
      const response = await api.patch(`/bookings/${id}/cancel`);
      setBooking((currentBooking) => ({
        ...currentBooking,
        ...response.data.data.booking
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!booking) return <ErrorMessage message="Booking not found" />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/my-bookings" className="text-primary-600 hover:text-primary-700">
        Back to my bookings
      </Link>
      <div className="bg-white rounded-xl shadow-md mt-6 overflow-hidden">
        {booking.listing?.image?.url && (
          <img
            src={booking.listing.image.url}
            alt={booking.listing.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{booking.listing?.title}</h1>
          <p className="text-gray-600 mb-6">
            {booking.listing?.location}, {booking.listing?.country}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> {booking.guests}</p>
            <p><strong>Total:</strong> ${booking.totalPrice}</p>
            <p><strong>Status:</strong> <span className="capitalize">{booking.status}</span></p>
          </div>
          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
            <button
              type="button"
              onClick={cancelBooking}
              disabled={cancelling}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {cancelling ? 'Cancelling...' : 'Cancel booking'}
            </button>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate('/listings')}
        className="mt-6 text-primary-600 hover:text-primary-700"
      >
        Browse more listings
      </button>
    </div>
  );
};

export default BookingDetails;
