import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUser, FaSignOutAlt, FaPlus, FaList } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaHome className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold text-primary-600">TourHome</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/listings" className="text-gray-700 hover:text-primary-600">
              Browse Listings
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/listings/new" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
                  <FaPlus /> <span>Add Listing</span>
                </Link>
                <Link to="/my-listings" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
                  <FaList /> <span>My Listings</span>
                </Link>
                <Link to="/my-bookings" className="text-gray-700 hover:text-primary-600">
                  My Bookings
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
                  <FaUser /> <span>{user?.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;