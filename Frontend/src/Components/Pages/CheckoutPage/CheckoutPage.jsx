import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Contexts/CartContext.jsx';
import style from './Checkout.module.css';

function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(cart?.cart?.totalPrice || 0);
  const [address, setAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponValid, setCouponValid] = useState(null); // null = not checked, true = valid, false = invalid
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const cartItems = cart?.cart?.products || [];

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCouponApply = () => {
    // Dummy coupon validation (replace this with actual API call)
    if (coupon === 'SAVE10') {
      setCouponValid(true);
      setTotalPrice(prevTotal => prevTotal * 0.9); // 10% discount
    } else {
      setCouponValid(false);
    }
  };

  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
      setIsPaymentDone(true);
      // Clear cart and navigate to orders page after a short delay
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    }, 1000);
  };

  return (
    <div className={style.checkoutContainer}>
      <h1 className='text-teal-500 font-extrabold text-center'>Checkout</h1>

      {/* Cart Items */}
      <div className={style.cartItems}>
        {cartItems.map((item) => (
          <div className={style.cartItem} key={item._id}>
            <img src={item.product.images[0]} alt={item.product.name} className={style.itemImage} />
            <div className={style.itemDetails}>
              <h3 className={style.itemName}>{item.product.name}</h3>
              <p className={style.description}>₹{item.product.description}</p>
              <p className={style.itemPrice}>Price: ₹{item.product.price}</p>
              <p className={style.totalItemPrice}>Total: ₹{(item.product.price * item.count).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Address */}
      <div className={style.deliveryAddress}>
        <h2>Delivery Address</h2>
        <textarea
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter your delivery address"
          className={style.addressInput}
        />
      </div>

      {/* Coupon */}
      <div className={style.couponContainer}>
        <h2>Apply Coupon</h2>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className={style.couponInput}
        />
        <button onClick={handleCouponApply} className={style.couponButton}>
          Apply Coupon
        </button>
        {couponValid === true && <p className={style.couponSuccess}>Coupon Applied Successfully!</p>}
        {couponValid === false && <p className={style.couponError}>Invalid Coupon Code</p>}
      </div>

      {/* Total Price */}
      <div className={style.totalPriceContainer}>
        <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
      </div>

      {/* Payment */}
      <div className={style.paymentSection}>
        <button
          className={style.payNowButton}
          onClick={handlePayment}
          disabled={!address || isPaymentDone}
        >
          Pay Now
        </button>
        <button onClick={() => navigate('/cart')} className={style.backButton}>
          Back to Cart
        </button>
      </div>

      {/* Payment Success */}
      {isPaymentDone && (
        <div className={style.orderSuccess}>
          <h2>Order Placed Successfully!</h2>
          <div className={style.successAnimation}>
            {/* Add any animation you want here */}
            <img
              src="https://example.com/success-animation.gif"
              alt="Order Success"
              className={style.successImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
