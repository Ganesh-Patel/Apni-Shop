import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Contexts/CartContext.jsx';
import { UserContext } from '../../../Contexts/UserContext.jsx';
import style from './Cart.module.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, addItemToCart, removeItemFromCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartItems = cart?.cart.products || [];

  console.log('cart items for cart page ',cartItems)

  // Update total price whenever cart items change
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((sum, item) => {
        const price = Number(item.price) || 0; 
        const count = Number(item.count) || 0;
        return sum + price * count;
      }, 0);
      setTotalPrice(total);
    };
  
    calculateTotalPrice();
  }, [cartItems]);
  

  // Handle quantity increase/decrease
  const onUpdateItemQuantity = async (productId, newQuantity) => {
    if (newQuantity > 0) {
      await addItemToCart({ id: productId, quantity: newQuantity }); 
    } else {
      await removeItemFromCart(productId); 
    }
  };

  // Handle removing an item from the cart
  const onDeleteItem = async (productId) => {
    console.log('we are going to delete items into cart ',productId)
    await removeItemFromCart(productId);
  };

  // Redirect to login page if not logged in
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

  // Render cart items if logged in and items exist
  return (
    <div className={style.cartContainer}>
      {cartItems.length > 0 ? (
        <>
          <div className={style.cartItems}>
            {cartItems.map((item) => (
              <div className={style.cartItem} key={item._id}>
                <img src={item.image} alt={item.name} className={style.itemImage} />
                <div className={style.itemDetails}>
                  <h3 className={style.itemName}>{item.name}</h3>
                  <p className={style.itemPrice}>₹{item.price}</p>
                  <div className={style.quantityControls}>
                    <button
                      className={style.quantityButton}
                      onClick={() => onUpdateItemQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className={style.count}>{item.count}</span>
                    <button
                      className={style.quantityButton}
                      onClick={() => onUpdateItemQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
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
              Pay Now
            </button>
          </div>
        </>
      ) : (
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
    
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Cart;
