import axios from 'axios';


// Base URL for the API
//const BASE_URL = 'http://localhost:3008/api/addresses'; 
// const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = 'https://ecommerce-app-oqjy.onrender.com/api/addresses';

// Create a new address
export const createAddress = async (addressData) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, addressData, {
            withCredentials: true, // Include credentials with the request
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create address');
    }
};

// Get all addresses for a user
export const getAllAddresses = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/getallAdress/${userId}`, {
            withCredentials: true, // Include credentials with the request
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch addresses');
    }
};

// Get a single address by ID
export const getAddressById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/getsingleaddress/${id}`, {
            withCredentials: true, // Include credentials with the request
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch address');
    }
};

// Update an address by ID
export const updateAddress = async (id, addressData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update/${id}`, addressData, {
            withCredentials: true, // Include credentials with the request
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update address');
    }
};

// Delete an address by ID
export const deleteAddress = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
            withCredentials: true, // Include credentials with the request
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete address');
    }
};
