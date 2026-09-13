import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ onSubmit, loading }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    setComment('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHoveredRating(i + 1)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(i + 1)}
              className="focus:outline-none"
            >
              <FaStar
                className={
                  i < (hoveredRating || rating)
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                }
                size={24}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Share your experience..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;