import axios from 'axios';
// const API_URL = 'https://ecommerce-app-oqjy.onrender.com/api/';
const API_URL = 'http://localhost:3008/api/product/';


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
