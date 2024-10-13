import axios from 'axios';

// const API_URL = 'http://localhost:3008/api/orders';
// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'https://ecommerce-app-oqjy.onrender.com/api/orders';



const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

// Place a new order
export const placeOrder = async (orderData) => {
  try {
    const response = await api.post('/place-order', orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to place the order');
  }
};

// Get all orders
export const getAllOrders = async () => {
  try {
    const response = await api.get('/get-all-orders');
    console.log(response)
    return response.data.orders;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve orders');
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/get-order/${orderId}`);
    return response.data.order;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve the order');
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/update-order/${orderId}`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update the order status');
  }
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const response = await api.delete(`/delete-order/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete the order');
  }
};
