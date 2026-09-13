import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SearchBar from '../components/SearchBar';
import ListingGrid from '../components/ListingGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaMapMarkerAlt, FaHome, FaStar } from 'react-icons/fa';

const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  const fetchFeaturedListings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/listings?limit=6');
      setFeaturedListings(response.data.data.listings);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    window.location.href = `/listings?search=${encodeURIComponent(query)}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Discover amazing places to stay around the world
            </p>
            <div className="flex justify-center">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Listings</h2>
          <Link to="/listings" className="text-primary-600 hover:text-primary-700">
            View All →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <ListingGrid listings={featuredListings} />
        )}
      </section>

      {/* Popular Destinations */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Goa', 'Mumbai', 'Manali', 'Dubai'].map((destination) => (
              <Link
                key={destination}
                to={`/listings?location=${destination}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <FaMapMarkerAlt className="text-primary-600 text-2xl mb-2" />
                <h3 className="font-semibold">{destination}</h3>
                <p className="text-gray-500 text-sm">Explore stays</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;