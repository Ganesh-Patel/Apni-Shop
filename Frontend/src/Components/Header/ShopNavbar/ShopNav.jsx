import React, { useState, useEffect,useRef } from 'react';
import './ShopNav.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Make sure you have react-router-dom installed

const categories = [
  {
    name: 'Men',
    subcategories: [
      'T-shirts',
      'Shirts',
      'Jeans',
      'Jackets',
      'Suits',
      'Shorts',
      'Sweaters',
      'Activewear',
      'Underwear',
      'Ethnic Wear',
      'Accessories',
      'Footwear',
    ],
  },
  {
    name: 'Women',
    subcategories: [
      'Dresses',
      'Tops',
      'Jeans',
      'Jackets',
      'Skirts',
      'Leggings',
      'Activewear',
      'Ethnic Wear',
      'Sarees',
      'Handbags',
      'Footwear',
      'Accessories',
    ],
  },
  {
    name: 'Kids',
    subcategories: [
      'T-shirts',
      'Shorts',
      'Dresses',
      'Jackets',
      'Trousers',
      'Ethnic Wear',
      'Activewear',
      'Footwear',
      'Accessories',
    ],
  },
  {
    name: 'Footwear',
    subcategories: [
      'Sneakers',
      'Sandals',
      'Boots',
      'Formal Shoes',
      'Casual Shoes',
      'Flip Flops',
      'Heels',
      'Ballet Flats',
      'Loafers',
    ],
  },
  {
    name: 'Electronics',
    subcategories: [
      'Mobile Phones',
      'Laptops',
      'Tablets',
      'Cameras',
      'Headphones',
      'Smart Watches',
      'Televisions',
      'Gaming Consoles',
      'Accessories',
    ],
  },
  {
    name: 'Home',
    subcategories: [
      'Furniture',
      'Bedding',
      'Decor',
      'Kitchenware',
      'Dining',
      'Storage & Organization',
      'Lighting',
      'Carpets & Rugs',
      'Curtains & Blinds',
    ],
  },
  {
    name: 'Beauty & Personal Care',
    subcategories: [
      'Skincare',
      'Makeup',
      'Hair Care',
      'Fragrances',
      'Oral Care',
      'Personal Care',
      'Men\'s Grooming',
      'Bath & Body',
      'Nail Care',
    ],
  },
  {
    name: 'Sports',
    subcategories: [
      'Fitness Equipment',
      'Outdoor Gear',
      'Cycling',
      'Running',
      'Yoga',
      'Team Sports',
      'Racket Sports',
      'Swimming',
      'Sports Accessories',
    ],
  },
  {
    name: 'Books',
    subcategories: [
      'Fiction',
      'Non-Fiction',
      'Children\'s Books',
      'Educational Books',
      'Comics & Graphic Novels',
      'Magazines',
      'E-Books',
      'Self-Help',
      'Cookbooks',
    ],
  },
  {
    name: 'Groceries',
    subcategories: [
      'Fruits & Vegetables',
      'Dairy Products',
      'Snacks',
      'Beverages',
      'Breads & Bakery',
      'Cereals',
      'Condiments & Sauces',
      'Frozen Foods',
      'Meat & Seafood',
    ],
  },
  {
    name: 'Baby Products',
    subcategories: [
      'Toys',
      'Baby Gear',
      'Nursery Furniture',
      'Feeding',
      'Bathing & Skin Care',
      'Diapers',
      'Playtime',
      'Learning Toys',
      'Safety & Health',
    ],
  },
];

const ShopNav = () => {
  const [dropdown, setDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu
  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setDropdown(index);
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop/${categoryName.toLowerCase()}`);
  };

  const handleSubcategoryClick = (categoryName, subcategory) => {
    navigate(`/shop/${categoryName.toLowerCase()}/${subcategory.toLowerCase()}`);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-100 text-black border border-gray-300 border-opacity-50 ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Hamburger Icon for Mobile View */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Categories List */}
        <ul className={`flex space-x-8 ${isMenuOpen ? 'block' : 'hidden'} lg:flex`}>
          {categories.map((category, index) => (
            <li
              key={category.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={`/shop/${category.name.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category.name);
                }}
                className="hover:text-teal-500"
              >
                {category.name}
              </Link>

              {dropdown === index && (
                <ul className="absolute bg-white shadow-lg rounded-lg z-50">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex} className="px-4 py-2 hover:bg-teal-200">
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubcategoryClick(category.name, subcategory);
                        }}
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ShopNav;