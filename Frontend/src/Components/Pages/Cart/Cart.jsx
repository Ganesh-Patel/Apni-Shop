import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Cart.module.css';

function Cart() {
  const navigate = useNavigate();
    const[isEmpty,setIsEmpty]=useState(true);
  return (
    <div className={style.cartContainer}>
      {isEmpty ? (
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
              <button
                className={style.signInButton}
                onClick={() => navigate('/login')}
              >
                Sign into your account
              </button>
              <button
                className={style.signUpButton}
                onClick={() => navigate('/signup')}
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={style.cartItems}>
            {cartItems.map((item) => (
              <div className={style.cartItem} key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={style.itemImage}
                />
                <div className={style.itemDetails}>
                  <h3 className={style.itemName}>{item.name}</h3>
                  <p className={style.itemPrice}>₹{item.price}</p>
                  <div className={style.quantityControls}>
                    <button
                      className={style.quantityButton}
                      onClick={() => onUpdateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className={style.itemQuantity}>{item.quantity}</span>
                    <button
                      className={style.quantityButton}
                      onClick={() => onUpdateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={style.deleteButton}
                    onClick={() => onDeleteItem(item.id)}
                  >
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
              disabled={totalPrice === 0}
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;