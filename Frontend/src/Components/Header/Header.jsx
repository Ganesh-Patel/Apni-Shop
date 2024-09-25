import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Navbar from './Navbar/Navbar'; // Ensure this is the correct path to your Navbar component

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full transition duration-300 z-50 ${isScrolled ? 'shadow-lg border-b border-gray-300' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link to="/" className="hover:text-teal-500">
            Apni-Shop
          </Link>
        </h1>

        <Navbar />

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="flex items-center text-gray-800 hover:text-teal-500">
            <FaShoppingCart className="text-xl" />
            <span className="ml-1">Cart</span>
          </Link>
          <Link to="/login" className="flex items-center text-gray-800 hover:text-teal-500">
            <FaUser className="text-xl" />
            <span className="ml-1">Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
