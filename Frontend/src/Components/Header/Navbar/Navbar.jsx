import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="hidden md:flex space-x-6">
      <Link to="/" className="text-gray-800 hover:text-teal-500">Home</Link>
      <Link to="/shop" className="text-gray-800 hover:text-teal-500">Shop</Link>
      <Link to="/about" className="text-gray-800 hover:text-teal-500">About Us</Link>
      <Link to="/contact" className="text-gray-800 hover:text-teal-500">Contact Us</Link>
    </nav>
  );
}

export default Navbar;
