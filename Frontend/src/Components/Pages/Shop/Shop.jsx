import React, { useState, useEffect } from 'react';
import FilterSidebar from '../../Pages/Filters/ FilterSidebar.jsx';
import ShopNav from '../../Header/ShopNavbar/ShopNav';
import { getAllProducts } from '../../../Utils/productApi.js';
import CreateCard from '../CreateCard/CreateCard.jsx';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    search: '',
    price: { min: 0, max: Number.MAX_VALUE },
    brand: [],
    rating: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async (queryParams = {}) => {
    setLoading(true);
    try {
      const response = await getAllProducts(queryParams);

      if (response && response.products) {
        setProducts(response.products);
      } else {
        console.error('No products found in response:', response);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    // You can also call the API here if filters should affect the product fetch
  };


  return (
    <div className="mt-12">
      <ShopNav />

      {/* Main Content with Filter and Product List */}
      <div className="flex flex-col lg:flex-row lg:space-x-4 p-4 mt-2">
        {/* Filter Sidebar */}
        <div className="lg:w-1/5 w-full mb-4 lg:mb-0">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} makeNetworkCall={fetchProducts} />
        </div>

        {/* Product Listing Section */}
        <div className="lg:w-4/5 w-full">
          {loading ? (
            <div className="flex justify-center items-center">
              <p>Loading...</p> {/* You can add a loading spinner here */}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="flex-shrink-0 w-60"> {/* Set a fixed width for the cards */}
                    <CreateCard product={product} />
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
