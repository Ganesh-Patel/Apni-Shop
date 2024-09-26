import React from 'react';

const CreateCard = ({ product }) => {
  const { name, description, price, rating, inStock, images } = product;
  const image = images[0]; // Accessing the first image from the array

  // Function to truncate the description to a specified number of words
  const truncateDescription = (text, wordCount) => {
    const words = text.split(' ');
    return words.length > wordCount ? words.slice(0, wordCount).join(' ') + '...' : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-sm w-full m-4 transition-transform transform hover:scale-105 overflow-hidden">
      <img src={image} alt={name} className="rounded-t-lg w-full h-48 object-cover p-2" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            View Details
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
