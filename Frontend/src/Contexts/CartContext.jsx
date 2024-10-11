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
import { Puff } from 'react-loader-spinner';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const { isLoggedIn } = useContext(UserContext);
    const[orders,setOrders]=useState([]);
    const navigate = useNavigate();

    // Fetch cart items on component mount
    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            try {
                console.log('user status before adding to cart ', isLoggedIn)
                if (isLoggedIn) {
                    const data = await getCart();
                    console.log('cart items ', data)
                    setCart(data.cart);
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
    }, [isLoggedIn]);

    // Function to add item to cart
    const addItemToCart = async (product) => {
        console.log('adding item to cart fro cartContext page', product)
        try {
            if (isLoggedIn) {
                const data = await addProductToCart(product._id, product.quantity, product.attributes);
                console.log('response after adding to cart ', data)
                toast(data.message);
                setCart(data.updatedCart);

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
            const data = await removeProductFromCart(productId);
            setCart(data.updatedCart);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };


    const updateQuan = async (productId, newQuantity) => {
        try {
            const data = await updateQuantity(productId, newQuantity);
            console.log(data.updatedCart)
            setCart(data.updatedCart);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }

    const deleteCart = async () => {
        try {
            const data = await clearCart();
            setCart(data.updatedCart);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }
    // Function to update the cart (e.g., adjust quantities)
    const updateCart = (newCart) => {
        setCart(newCart);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl mb-4">Loading...</h1>
                <Puff width={50} height={50} color="#00BFFF" />
            </div>
        );
    }
    
    return (
        <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, updateCart, updateQuan, deleteCart,orders,setOrders }}>
            {children}
        </CartContext.Provider>
    );
};
