import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import Navbar from './Navbar/Navbar';
import { UserContext } from '../../Contexts/UserContext';
import { logoutUser } from '../../Utils/api.js';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setUser, isLoggedIn, setIsLoggedIn, loading } = useContext(UserContext);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser(setIsLoggedIn);
      if (response.status = 200) {
        setUser(null);
      }
    } catch (error) {
      console.error(error);

    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full top-0 left-0 transition mb-5 duration-300 z-50 ${isScrolled ? 'shadow-lg border-b border-gray-300 bg-gray-100' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link to="/" className="hover:text-teal-500">
            Apni-Shop
          </Link>
        </h1>

        <Navbar />

        <div className="flex items-center space-x-4">

          <Link to="/wishlist" className="flex items-center text-gray-800 hover:text-teal-500">
            <FaHeart className="text-xl" />
          </Link>

          <Link to="/cart" className="flex items-center text-gray-800 hover:text-teal-500">
            <FaShoppingCart className="text-xl" />
          </Link>

          {isLoggedIn && user ? (
            // If user is logged in, show user profile and logout button
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-800">
                <img
                  src={user.profilePic || '/default-profile.png'} // Use a default profile picture if not available
                  alt="User profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:text-teal-500"
              >
                Logout
              </button>
            </div>
          ) : (
            // If user is not logged in, show login icon
            <Link to="/login" className="flex items-center text-gray-800 hover:text-teal-500">
              <FaUser className="text-xl" />
              <span className="ml-1">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
