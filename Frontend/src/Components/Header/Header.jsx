import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import Navbar from './Navbar/Navbar';
import { UserContext } from '../../Contexts/UserContext';
import { logoutUser } from '../../Utils/api.js';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, setUser, isLoggedIn, setIsLoggedIn, loading } = useContext(UserContext);

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsScrolled(offset > 0);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser(setIsLoggedIn);
      if (response.status === 200) {
        setUser(null);
        setShowProfileMenu(false); // Close the profile menu on logout
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full top-0 left-0 transition duration-300 z-50 ${isScrolled ? 'shadow-lg border-b border-gray-400 bg-gray-200' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link to="/" className="hover:text-teal-500">
            Apni-Shop
          </Link>
        </h1>

        {/* Navbar for larger screens */}
        <Navbar />

        {/* Icons and Profile Menu */}
        <div className="flex items-center space-x-4">
          <Link to="/wishlist" className="flex items-center text-gray-800 hover:text-teal-500">
            <FaHeart className="text-xl" />
          </Link>

          <Link to="/cart" className="flex items-center text-gray-800 hover:text-teal-500">
            <FaShoppingCart className="text-xl" />
          </Link>

          {isLoggedIn && user ? (
            <div className="relative">
              <button onClick={toggleProfileMenu} className="flex items-center text-gray-800 focus:outline-none">
                <img
                  src={user.profilePic || '/default-profile.png'}
                  alt="User profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2">{user.name}</span>
              </button>

              {showProfileMenu && (
                <div onClick={toggleProfileMenu} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <button onClick={toggleProfileMenu} className="text-right text-gray-800 focus:outline-none p-2">
                    <FaTimes className="text-xl" />
                  </button>
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Orders</Link>
                  <Link to="/wishlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Wishlist</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={toggleProfileMenu} className="flex items-center text-gray-800 hover:text-teal-500 focus:outline-none">
              <FaUser className="text-xl" />
              <span className="ml-1">Login</span>
            </button>
          )}

          {/* Hamburger Icon for Mobile Menu */}
          <button onClick={toggleMobileMenu} className="lg:hidden text-gray-800 focus:outline-none">
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Profile menu for not logged in */}
      {showProfileMenu && !isLoggedIn && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <button onClick={toggleProfileMenu} className="text-right text-gray-800 focus:outline-none p-2">
            <FaTimes className="text-xl" />
          </button>
          <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>
          <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Register</Link>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu}>
          <div
            className="bg-white w-64 h-full shadow-lg p-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
          >
            <button onClick={closeMobileMenu} className="text-gray-800 focus:outline-none mb-4">
              <FaTimes className="text-2xl" />
            </button>
            {isLoggedIn ? (
              <div onClick={closeMobileMenu}>
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                <Link to="/admin-dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Admin DashBoard</Link>
                <Link to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Orders</Link>
                <Link to="/wishlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Wishlist</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div onClick={closeMobileMenu}>
                <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>
                <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
