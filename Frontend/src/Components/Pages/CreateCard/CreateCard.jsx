import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import FontAwesome heart icons
import { addToWishlist } from '../../../Utils/productApi';
import { UserContext } from '../../../Contexts/UserContext';
import { CartContext } from '../../../Contexts/CartContext.jsx';
import { toast } from 'react-toastify';
import { addProductToCart } from '../../../Utils/cartApi.js';

const CreateCard = ({ product }) => {
  const { _id, name, description, price, rating, inStock, images } = product;
  const image = images[0]; // Accessing the first image from the array
  const navigate = useNavigate();
  const { isLoggedIn, loading } = useContext(UserContext);
  const {addItemToCart}=useContext(CartContext);

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
  const handleAddToCart = async () => {
    console.log('adding item to cart fro card page')
    try {
        const { _id: _id, quantity = 1, attributes = [] } = product;
        
        const response = await addItemToCart({_id, quantity, attributes}); 

        if (response) {
            toast.success('Item added to cart!'); 
        }
    } catch (error) {
        console.error('Error adding item to cart:', error); 
        toast.error('Failed to add item to cart.'); 
    }
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
      toast("Please login to add to wishlist");
      navigate(`/login?redirect=${currentPath}`);
    }
  };
  return (
    <div   className="bg-white rounded-lg shadow-lg max-w-sm w-full m-4 transition-transform transform hover:scale-105 overflow-hidden relative">
      <img onClick={handleViewDetails} src={image} alt={name} className="rounded-t-lg w-full h-48 object-contain p-2" />
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
        <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => {
              const fullStar = Math.floor(rating); // Full stars
              const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
              const starIndex = index + 1; // Stars are 1-based, index is 0-based

              return (
                <span key={index}>
                  {starIndex <= fullStar ? (
                    <i className="fas fa-star text-yellow-500"></i> // Full Star
                  ) : starIndex === fullStar + 1 && hasHalfStar ? (
                    <i className="fas fa-star-half-alt text-yellow-500"></i> // Half Star
                  ) : (
                    <i className="far fa-star text-gray-300"></i> // Empty Star
                  )}
                </span>
              );
            })}
            <span className="ml-2 text-sm text-yellow-500">{rating}</span>
          </div>

        <div className="flex flex-col justify-between mt-4 gap-2">
          <button onClick={handleViewDetails} className="bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-700 transition">
            View Details
          </button>
          <button onClick={handleAddToCart}  className="bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-700 transition">
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
