import axios from 'axios';
// import dotenv from 'dotenv/config';
//  const API_URL = 'https://ecommerce-app-oqjy.onrender.com/api/';
// const API_URL = 'http://localhost:3008/api/product/';
// const API_URL =process.env.REACT_APP_API_URL;
const API_URL = 'https://ecommerce-app-oqjy.onrender.com/api/product/';

export const getAllProducts = async (queryParams = {}) => {
    try {
        const response = await axios.get(`${API_URL}getallproducts`, {
            params: queryParams, 
            withCredentials: true,
        });
        
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
export const getSingleProducts = async (id) => {
    console.log('id for which we are finding the details ',id)
    try {
        const response = await axios.get(`${API_URL}getsingleproduct/${id}`, {
         withCredentials: true,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const addProduct=async(product)=>{
    try {
        const response = await axios.post(`${API_URL}addproduct`,product,{
            withCredentials: true, 
        });
        console.log(response.data)
        return response;
    }catch(error)
    {
        console.error(error);
        return error;
    }
}
export const editProduct=async(id,product)=>{
    console.log('edit api call from frontend ',id)
    try {
        const response = await axios.patch(`${API_URL}editproduct/${id}`,product,{
            withCredentials: true, 
        });
        console.log(response.data)
        return response;
    }catch(error)
    {
        console.error(error);
        return error;
    }
}
export const deleteProduct=async(id)=>{
    try {
        const response = await axios.delete(`${API_URL}deletesingleproduct/${id}`,{
            withCredentials: true, 
        });
        console.log(response.data)
        return response;
    }catch(error)
    {
        console.error(error);
        return error;
    }
}


export const addToWishlist = async (id) => {
    console.log('id for which we are adding to wishlist  the details ',id)
    try {
        const response = await axios.post(`${API_URL}addToWishlist/${id}`,{}, {
         withCredentials: true,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
}
export const getFromWishlist = async (userId) => {
    console.log('id for which we are adding to wishlist  the details ',userId)
    try {
        const response = await axios.get(`${API_URL}wishlist/${userId}`, {
         withCredentials: true,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const addRatings = async (reviewData) => {
    console.log('id for which we are adding to review  the details ')
    try {
        const response = await axios.post(`http://localhost:3008/api/review/addreview`,reviewData, {
         withCredentials: true,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
}

