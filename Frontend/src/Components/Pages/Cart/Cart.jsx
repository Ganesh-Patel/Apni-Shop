import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Contexts/CartContext.jsx';
import { UserContext } from '../../../Contexts/UserContext.jsx';
import style from './Cart.module.css';
import { getCart } from '../../../Utils/cartApi.js';
import { Puff } from 'react-loader-spinner';

function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuan, removeItemFromCart, deleteCart, setCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const cartItems = cart?.products || [];
  // Fetch cart items on component mount or when `isLoggedIn` changes
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        if (isLoggedIn) {
          const data = await getCart();
          setCart(data.cart);
        } else {
          const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
          setCart({ products: guestCart });
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [isLoggedIn, setCart]);

  // Calculate total price when cartItems change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const price = item?.product?.price || 0;
      const count = item?.count || 0;
      return sum + price * count;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const onUpdateItemQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity > 0) {
        await updateQuan(productId, newQuantity);
      } else {
        await removeItemFromCart(productId);
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const onDeleteItem = async (productId) => {
    try {
      await removeItemFromCart(productId);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await deleteCart();
      setCart({ products: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className={style.cartContainer}>
        <div className={style.emptyCart}>
          <img
            src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
            alt="Empty cart"
            className={style.emptyCartImage}
          />
          <div className={style.emptyCartText}>
            <h1 className={style.emptyCartTitle}>Your cart is empty</h1>
            <div className={style.shopDeals} onClick={() => navigate('/home')}>
              <p>Shop today's deals</p>
            </div>
            <div className={style.buttons}>
              <button className={style.signInButton} onClick={() => navigate('/login')}>
                Sign into your account
              </button>
              <button className={style.signUpButton} onClick={() => navigate('/signup')}>
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.cartContainer}>
      <div className={style.cartHeader}>
        <h1 className='text-teal-500 font-extrabold text-center'>Your Cart</h1>
      </div>
      {cartItems.length > 0 ? (
        <>
          <button onClick={handleClearCart} className='bg-red-400 rounded-xl py-2 px-4'>Clear Cart</button>
          <div className={style.cartItems}>
            {cartItems.map((item) => (
              <div className={style.cartItem} key={item._id}>
                <img src={item.product.images[0]} alt={item.product.name} className={style.itemImage} />
                <div className={style.itemDetails}>
                  <h3 className={style.itemName}>{item.product.name}</h3>
                  <p className={style.description}>₹{item.product.description}</p>
                  <p className={style.itemPrice}>Price: ₹{item.product.price}</p>
                  <div className={style.quantityControls}>
                    <button
                      className={style.quantityButton}
                      onClick={() => onUpdateItemQuantity(item._id, item.count - 1)}
                      disabled={item.count <= 1}
                    >
                      -
                    </button>
                    <span className={style.count}>{item.count}</span>
                    <button
                      className={style.quantityButton}
                      onClick={() => onUpdateItemQuantity(item._id, item.count + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className={style.totalItemPrice}>Total: ₹{(item.product.price * item.count).toFixed(2)}</p>
                  <button className={style.deleteButton} onClick={() => onDeleteItem(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={style.totalPriceContainer}>
            <h2 className={style.totalPrice}>Total Price: ₹{totalPrice.toFixed(2)}</h2>
            <button
              className={style.payNowButton}
              onClick={() => navigate('/checkout')}
              disabled={totalPrice === 0}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className={style.emptyCart}>
          <img
            src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
            alt="Empty cart"
            className={style.emptyCartImage}
          />
          <div className={style.emptyCartText}>
            <h1 className={style.emptyCartTitle}>Your cart is empty</h1>
            <div className={style.shopDeals} onClick={() => navigate('/home')}>
              <p>Shop today's deals</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
