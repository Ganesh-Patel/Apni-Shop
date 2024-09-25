import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-teal-700 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <h1 className="text-2xl font-bold mb-4">Apni-Shop</h1>
            <p className="text-gray-200">
              Your one-stop shop for the best products at unbeatable prices.
              Shop from a wide range of categories and enjoy seamless service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300 transition duration-200">Home</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-200">Shop</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-200">Contact Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300 transition duration-200">Help & FAQs</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-200">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-200">Shipping Info</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-200">Track Order</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2 text-gray-200">
              <li><span className="font-bold">Email:</span> support@apnishop.com</li>
              <li><span className="font-bold">Phone:</span> +123 456 7890</li>
              <li><span className="font-bold">Location:</span> 123 Main Street, City, Country</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-400" />

        {/* Social Icons and Copyright */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-200">&copy; 2024 Apni-Shop. All rights reserved.</p>
          </div>

          <div className="flex space-x-4">
            <a href="#" className="text-gray-200 hover:text-gray-300 transition duration-200">
              <FaFacebookF className="text-xl" />
            </a>
            <a href="#" className="text-gray-200 hover:text-gray-300 transition duration-200">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="text-gray-200 hover:text-gray-300 transition duration-200">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-gray-200 hover:text-gray-300 transition duration-200">
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
