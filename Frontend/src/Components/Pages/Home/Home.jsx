import React, { useContext, useEffect, useState } from 'react';
import CarouselHome from '../../Carousel/CarouselHome'
import CreateCard from '../CreateCard/CreateCard';
import { getAllProducts } from '../../../Utils/productApi.js';
import { Puff } from 'react-loader-spinner';
import { UserContext } from '../../../Contexts/UserContext.jsx';

const images = [
  'https://images-eu.ssl-images-amazon.com/images/G/31/prime/Aug24/DEALS-REVEALED_hero_PC_pse_2_2x._CB568322891_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/OHL/23/Central/BAU/ledaup/AA/PC_Hero_3000x1200_2x._CB568322637_.jpg',
  'https://m.media-amazon.com/images/I/61qVFfNuZzL._SX3000_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/AugART24/leadup/desktop_unrec_rev_1x_C._CB568294195_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/Aug/WhatsApp_Image_2024-08-01_at_11.39.54_PM_1._CB568206422_.jpg',
];

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts(); 
      
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
  return (
    <div className="min-h-screen flex flex-col mt-16 -z-0">
  {/* Carousel Section */}
  <div className="w-full"> {/* Full width container for the carousel */}
    <CarouselHome images={images} className="w-full h-[70vh]" />
  </div>



  <div className="container mx-auto py-2 px-4 mt-4">
    <div className="lg:w-4/5 w-full mx-auto">
      {loading ? (
        <div className="flex justify-center items-center">
          <Puff />{/* You can add a loading spinner here */}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="flex-shrink-0 w-80"> {/* Set a fixed width for the cards */}
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
}


export default Home;
