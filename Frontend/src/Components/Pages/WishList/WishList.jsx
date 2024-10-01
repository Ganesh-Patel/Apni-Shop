import React, { useContext, useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { UserContext } from '../../../Contexts/UserContext';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaShoppingCart, FaStar } from 'react-icons/fa';
import { addToWishlist, getFromWishlist } from '../../../Utils/productApi';

function WishList() {
  const { user, setUser } = useContext(UserContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await getFromWishlist(user._id);
        setWishlistProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [user]);

  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await addToWishlist(productId);
      setUser(data.updatedUser);
      setWishlistProducts(wishlistProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  const addToCart = async (productId) => {
    // Implement add to cart functionality here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Puff
          height={80}
          width={80}
          radius={1}
          color="#38b2ac" // Using teal-500 for loader color
          ariaLabel="loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="mt-16 container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">My Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <p className='text-cyan-800 text-center'>Your wishlist is empty!</p>
      ) : (
        <div className="space-y-6"> {/* Vertical spacing between each card */}
          {wishlistProducts.map(product => (
            <div key={product._id} className="border rounded-lg shadow-md p-4 flex flex-col lg:flex-row items-center lg:items-start">
              {/* Product Image */}
              <Link to={`/product/${product._id}`} className="w-full lg:w-1/4">
                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded mb-4 lg:mb-0" />
              </Link>

              {/* Product Details */}
              <div className="flex-1 lg:ml-4 text-center lg:text-left">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 my-2">{product.description}</p>
                <p className="text-gray-800 font-bold text-lg">${product.price}</p>
                <div className="flex items-center justify-center lg:justify-start my-2">
                  <FaStar className="text-yellow-500" />
                  <span className="ml-1 text-gray-600">{product.rating} / 5</span>
                </div>
                <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              {/* Buttons: Add to Cart and Remove from Wishlist */}
              <div className="flex flex-col space-y-2 lg:ml-4 mt-4 lg:mt-0">
                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-teal-500 mt-8 text-white px-4 py-2 rounded hover:bg-teal-600 flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center"
                >
                  <FaTrashAlt className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
