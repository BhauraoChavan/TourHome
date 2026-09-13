import { FaStar, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const ReviewList = ({ reviews, onDelete }) => {
  const { user } = useAuth();

  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">
                  {review.author?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{review.author?.name}</p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                      size={12}
                    />
                  ))}
                </div>
              </div>
            </div>
            {user?._id === review.author?._id && (
              <button
                onClick={() => onDelete(review._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            )}
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;