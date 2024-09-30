import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import FontAwesome heart icons
import { addToWishlist } from '../../../Utils/productApi';
import { UserContext } from '../../../Contexts/UserContext';
import { toast } from 'react-toastify';

const CreateCard = ({ product }) => {
  const { _id, name, description, price, rating, inStock, images } = product;
  const image = images[0]; // Accessing the first image from the array
  const navigate = useNavigate();
  const { isLoggedIn, loading } = useContext(UserContext);

  // State to track if the item is added to the wishlist
  const [inWishlist, setInWishlist] = useState(false);

  // Function to truncate the description to a specified number of words
  const truncateDescription = (text, wordCount) => {
    const words = text.split(' ');
    return words.length > wordCount ? words.slice(0, wordCount).join(' ') + '...' : text;
  };

  const handleViewDetails = () => {
    navigate(`/product/${_id}`);
  };

  const toggleWishlist = async () => {
    if (isLoggedIn) {
      const response = await addToWishlist(_id);
      if (response.status === 200) {
        setInWishlist(!inWishlist);
      } else {
        toast("Failed to add to wishlist");
      }
    } else {
      // Save the current path before redirecting to login
      const currentPath = window.location.pathname;
      alert("Please login to add to wishlist");
      navigate(`/login?redirect=${currentPath}`);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-sm w-full m-4 transition-transform transform hover:scale-105 overflow-hidden relative">
      <img src={image} alt={name} className="rounded-t-lg w-full h-48 object-cover p-2" />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
          {/* Wishlist Button */}
          <button onClick={toggleWishlist} className="text-xl focus:outline-none">
            {inWishlist ? (
              <FaHeart className="text-red-600" /> // Filled red heart if in wishlist
            ) : (
              <FaRegHeart className="text-gray-600" /> // Hollow heart if not in wishlist
            )}
          </button>
        </div>
        <p className="text-gray-600 mt-1 line-clamp-2">{truncateDescription(description, 2)}</p>
        <div className="flex items-baseline mt-2">
          <span className="text-lg font-bold text-pink-600">₹{price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-yellow-500">⭐ {rating}</span>
          <span className={`text-sm font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={handleViewDetails} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            View Details
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
      {/* Wishlist message */}
      {inWishlist && <div className="absolute top-0 right-0 p-2 text-sm text-white bg-red-500 rounded">Added to Wishlist</div>}
    </div>
  );
};

export default CreateCard;
