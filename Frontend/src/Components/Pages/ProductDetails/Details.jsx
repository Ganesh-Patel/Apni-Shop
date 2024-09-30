import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSingleProducts,addToWishlist } from '../../../Utils/productApi.js';
import { UserContext } from '../../../Contexts/UserContext.jsx';

function Details() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { isLoggedIn } = useContext(UserContext);

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

    const handleAddToCart = () => {
        toast.success('Item added to cart!');
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
          // Save the current path before redirecting to login
          const currentPath = window.location.pathname;
          alert("Please login to add to wishlist");
          navigate(`/login?redirect=${currentPath}`);
        }
      };

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
                <p><strong>Rating:</strong> {details.rating} / 5</p>
                <p><strong>Price:</strong> ₹{details.price}</p>
                <p><strong>Description:</strong> {details.description || 'No description available'}</p>
                <p>
                    <strong>Availability:</strong> {details.inStock ? 'In Stock' : 'Out of Stock'}
                    ({details.inventory} units available)
                </p>
               <div className={styles.buttonContainer}>
                    <button onClick={handleAddToCart} className={styles.addToCartButton}>Add to Cart</button>

                    {/* Add to Wishlist Button */}
                    <button
                        onClick={toggleWishlist}
                        className={`${styles.wishlistButton} ${isInWishlist ? styles.inWishlist : ''}`}
                    >
                        <span className={styles.heartIcon}>
                            {isInWishlist ? '❤️' : '🤍'}
                        </span>
                        <span className={styles.wishlistText}>
                            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Details;
