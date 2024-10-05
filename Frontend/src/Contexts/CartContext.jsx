import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    getCart,
    addProductToCart,
    removeProductFromCart,
    updateQuantity,
    clearCart
} from '../Utils/cartApi.js';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext.jsx';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    // Fetch cart items on component mount
    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            try {
                console.log('user status before adding to cart ', isLoggedIn)
                if (isLoggedIn) {
                    const cartItems = await getCart();
                    console.log('cart items ', cartItems)
                    setCart(cartItems);
                } else {
                    const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
                    setCart(guestCart);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // Function to add item to cart
    const addItemToCart = async (product) => {
        console.log('adding item to cart fro cartContext page', product)
        try {
            if (isLoggedIn) {
                const response = await addProductToCart(product._id, product.quantity, product.attributes);
                console.log('response after adding to cart ', response)
                toast(response.message);
                setCart(response);

            } else {

                navigate('/login');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    // Function to remove item from cart
    const removeItemFromCart = async (productId) => {
        try {
            const updatedCart = await removeProductFromCart(productId);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };


    const updateQuan = async (productId, newQuantity) => {
        try {
            const updatedCart = await updateQuantity(productId, newQuantity);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }

    const deleteCart = async () => {
        try {
            const updatedCart = await clearCart();
            setCart(updatedCart);
            return updatedCart;
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }
    // Function to update the cart (e.g., adjust quantities)
    const updateCart = (newCart) => {
        setCart(newCart);
    };

    if (loading) {
        return <div>Loading Cart...</div>;
    }

    return (
        <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, updateCart, updateQuan, deleteCart }}>
            {children}
        </CartContext.Provider>
    );
};
