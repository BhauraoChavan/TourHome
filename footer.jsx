import { Link } from 'react-router-dom';
import { FaHome, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaHome className="text-primary-400 text-2xl" />
              <span className="text-xl font-bold">TourHome</span>
            </div>
            <p className="text-gray-400 text-sm">
              Find your perfect stay anywhere in the world.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/listings" className="hover:text-white">Browse Listings</Link></li>
              <li><Link to="/listings/new" className="hover:text-white">Add Listing</Link></li>
              <li><Link to="/my-bookings" className="hover:text-white">My Bookings</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} TourHome. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;