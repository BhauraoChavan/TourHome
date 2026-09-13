import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import MyListings from './pages/MyListings';
import MyBookings from './pages/MyBookings';
import BookingDetails from './pages/BookingDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/listings/new" element={<CreateListing />} />
            <Route path="/listings/:id/edit" element={<EditListing />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;