import axios from 'axios';

// const API_URL = 'http://localhost:3008/api/cart';
// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'https://ecommerce-app-oqjy.onrender.com/api/cart';

// Add product to cart
export const addProductToCart = async (productId, quantity, attributes) => {
  try {
    const response = await axios.post(`${API_URL}/addproduct`, {
      productId,
      quantity,
      attributes,
    }, {
      withCredentials: true, 
    });

    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

// Fetch the current user's cart
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_URL}/getcart`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const updateQuantity = async ( productId, newQuantity ) => {
    try {
      const response = await axios.put(`${API_URL}/update-quantity`,{productId, newQuantity }, {
        withCredentials: true,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error in updating quantity :', error);
      throw error;
    }
  };
  

// Remove product from cart
export const removeProductFromCart = async (productId) => {
  try {
    const response = await axios.post(`${API_URL}/removeproduct`, {
      productId,
    }, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw error;
  }
};

// Clear the entire cart
export const clearCart = async () => {
  try {
    const response = await axios.post(`${API_URL}/clearcart`, {}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Apply a flat discount to the cart
export const applyFlatDiscount = async (discountAmount) => {
  try {
    const response = await axios.post(`${API_URL}/applydiscount`, {
      discount: discountAmount,
    }, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error applying discount:', error);
    throw error;
  }
};
