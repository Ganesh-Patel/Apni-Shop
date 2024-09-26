import axios from 'axios';
// const API_URL = 'https://ecommerce-app-oqjy.onrender.com/api/';
const API_URL = 'http://localhost:3008/api/product/';


export const getAllProducts=async()=>{
    try {
        const response = await axios.get(`${API_URL}getallproducts`,{},{
            withCredentials: true,
        });
        console.log(response.data)
        return response.data;
        } catch (error) 
        {
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
        return response.data;
    }catch(error)
    {
        console.error(error);
        return error;
    }
}