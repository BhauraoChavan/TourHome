import { useState } from 'react';

const BookingForm = ({ listing, onSubmit, loading }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.max(0, (end - start) / (1000 * 60 * 60 * 24));
    return nights * listing.price;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      checkIn,
      checkOut,
      guests,
      totalPrice: calculateTotal()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        ${listing.price} <span className="text-gray-500 text-sm">/ night</span>
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        {calculateTotal() > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>${listing.price} × {Math.round(calculateTotal() / listing.price)} nights</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;