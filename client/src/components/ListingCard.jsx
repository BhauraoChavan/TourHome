import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const ListingCard = ({ listing }) => {
  return (
    <Link
      to={`/listings/${listing._id}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48">
        <img
          src={listing.image?.url || 'https://via.placeholder.com/400x300'}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg text-sm font-semibold">
          ${listing.price}/night
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FaMapMarkerAlt className="mr-1" />
          <span>{listing.location}, {listing.country}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-yellow-500">
            <FaStar className="mr-1" />
            <span className="text-gray-700">
              {listing.averageRating ? listing.averageRating.toFixed(1) : 'New'}
            </span>
          </div>
          <span className="text-gray-500 text-sm">
            {listing.reviewCount || 0} reviews
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;