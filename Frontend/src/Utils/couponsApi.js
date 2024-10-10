import axios from 'axios';

//const BASE_URL = "http://localhost:3008/api/coupons";  // Update with the correct base API URL if needed 
// const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = 'https://ecommerce-app-oqjy.onrender.com/api/coupons';

export const createCoupon = async (couponData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-coupon`, couponData,{
        withCredentials:true
      });
      return response;
    } catch (error) {
      console.error('Error creating coupon:', error);
      return error.response ? error.response.data : new Error('Network Error');
    }
  };
  
  // Get all coupons
  export const getAllCoupons = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-coupons`,{
        withCredentials:true
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw error.response ? error.response.data : new Error('Network Error');
    }
  };
  
  // Get a specific coupon by ID
  export const getCouponById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-single-coupon/${id}`,{
        withCredentials:true
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon:', error);
      throw error.response ? error.response.data : new Error('Network Error');
    }
  };
 
  export const updateCoupon = async (id, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-coupon/${id}`, updatedData,{
        withCredentials:true
      });
      return response.data;
    } catch (error) {
      console.error('Error updating coupon:', error);
      throw error.response ? error.response.data : new Error('Network Error');
    }
  };

  export const deleteCoupon = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`,{
        withCredentials:true
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting coupon:', error);
      throw error.response ? error.response.data : new Error('Network Error');
    }
  };
  export const valiDateCoupon = async (couponCode, totalPrice) => {
    try {
      const response = await axios.post(`${BASE_URL}/validate-coupon`,{couponCode, totalPrice},{
        withCredentials:true
      });
      return response;
    } catch (error) {
      console.error('Error deleting coupon:', error);
      return error.response ? error.response.data.message :'Network Error';
    }
  };

