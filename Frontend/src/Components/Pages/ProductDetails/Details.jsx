import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Details.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSingleProducts, addToWishlist } from '../../../Utils/productApi.js';
import { UserContext } from '../../../Contexts/UserContext.jsx';
import RatingModal from '../ProductDetails/RatingModal.jsx'; // Import the modal component
import { addProductToCart } from '../../../Utils/cartApi.js';
import { CartContext } from '../../../Contexts/CartContext.jsx';

function Details() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [showModal, setShowModal] = useState(false); // Modal state
    const { isLoggedIn } = useContext(UserContext);
    const {addItemToCart}=useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await getSingleProducts(id);
                if (response.status === 200) {
                    setDetails(response.data.product);
                } else {
                    toast.error(response.data.message || 'Failed to load product details');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                toast.error('An error occurred while fetching product details');
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    if (loading) {
        return <div className={styles.details}>Loading...</div>;
    }

    if (!details) {
        return <div className={styles.details}>No details available.</div>;
    }

   
const handleAddToCart = async () => {
    try {
        const { _id: _id, quantity = 1, attributes = [] } = details;

        console.log('product details before adding to cart ',details)
        
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
            const response = await addToWishlist(id);
            if (response.status === 200) {
                setIsInWishlist(!isInWishlist);
            } else {
                toast("Failed to add to wishlist");
            }
        } else {
            const currentPath = window.location.pathname;
            toast("Please login to add to wishlist");
            navigate(`/login?redirect=${currentPath}`);
        }
    };

    function renderStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                // Full star for each whole number
                stars.push(
                    <i key={i} className="fas fa-star text-yellow-500 text-xl" />
                );
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                // Half star if there is a fractional part
                stars.push(
                    <i key={i} className="fas fa-star-half-alt text-yellow-500 text-xl" />
                );
            } else {
                // Empty star for the remaining
                stars.push(
                    <i key={i} className="far fa-star text-gray-300 text-xl" />
                );
            }
        }
        return stars;
    }

    return (
        <div className={styles.details}>
            {/* Product Image */}
            <div className={styles.imageContainer}>
                <img src={details.images[0]} alt={details.name} className={styles.productImage} />
            </div>

            {/* Product Information */}
            <div className={styles.infoContainer}>
                <h1>{details.name}</h1>
                <p><strong>Brand:</strong> {details.brand}</p>
                <p><strong>Category:</strong> {details.category}</p>
                <p><strong>Price:</strong> ₹{details.price}</p>
                <p><strong>Description:</strong> {details.description || 'No description available'}</p>
                <p>
                    <strong>Availability:</strong> {details.inStock ? 'In Stock' : 'Out of Stock'}
                    ({details.inventory} units available)
                </p>

                {/* Stars */}
                <div className="flex items-center mt-2">
                    {/* Star rating display */}
                    {renderStars(details.rating)}
                    <span className="ml-2 text-sm text-yellow-500">{details.rating}</span>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className={`mt-4 p-2 w-full md:w-80 text-white bg-teal-500 rounded hover:bg-teal-600 transition`}
                >
                    Add to Cart
                </button>

                {/* Button Container */}
                <div className={styles.buttonContainer}>


                    {/* Rate the Product Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className={`mt-2 p-2 w-full md:w-40 text-white bg-teal-500 rounded hover:bg-teal-600 transition`}
                    >
                        Rate the Product
                    </button>

                    {/* Add to Wishlist Button */}
                    <button
                        onClick={toggleWishlist}
                        className={`mt-2 p-2 w-full md:w-40 text-white bg-teal-500 rounded hover:bg-teal-600 transition ${isInWishlist ? styles.inWishlist : ''}`}
                    >
                        <span className={styles.heartIcon}>
                            {isInWishlist ? '❤️' : '🤍'}
                        </span>
                        <span className={styles.wishlistText}>
                            {isInWishlist ? 'Remove' : 'Add to Wishlist'}
                        </span>
                    </button>
                </div>

                {/* Rating Modal */}
                <RatingModal showModal={showModal} setShowModal={setShowModal} productId={id} />
            </div>
        </div>
    )
}
export default Details;
