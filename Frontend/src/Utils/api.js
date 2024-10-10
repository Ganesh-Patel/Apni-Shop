import axios from 'axios';

// const API_URL = 'https://ecommerce-app-oqjy.onrender.com/api/';
//const API_URL = 'http://localhost:3008/api/';
// const API_URL = process.env.REACT_APP_API_URL;
 const API_URL = 'https://ecommerce-app-oqjy.onrender.com/api/';


export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}user/register`, user);
    console.log('User Register successfully:', { user, response: response.data });
 
    return response.data;
  } catch (error) {
    console.error('Error in Register user:', { user, error: error.message });
    throw error; 
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}user/login`,user,{
      withCredentials: true});
    console.log('user Logged in Successfully:', { response: response});
    return response;
  } catch (error) {
    console.error('Error fetching tasks:', { error: error.message });
    throw error;
  }
};

export const updateUser = async (id, updates) => {
  try {
    const response = await axios.put(`${API_URL}user/updateuser`, updates);
    console.log(`Task ${id} updated successfully:`, { updates, response: response.data });
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, { updates, error: error.message });
    throw error;
  }
};

export const deleteUser= async (id) => {
  try {
    const response = await axios.delete(`${API_URL}user/deleteuser/${id}`,{withCredentials:true});
    console.log(`User ${id} deleted successfully:`, { response: response.data });
    return response.data;
  } catch (error) {
    console.error(`Error deleting task ${id}:`, { error: error.message });
    throw error;
  }
};
export const logoutUser= async (setIsLoggedIn) => {
  try {
    const response = await axios.post(`${API_URL}user/logoutuser`,{},{
      withCredentials: true,
    });
    console.log(`logged out successfully:`, { response: response.data });
    setIsLoggedIn(false);
    return response.data;
  } catch (error) {
    console.error(`Error in logging out:`, { error: error.message });
    throw error;
  }
};
export const verifyemail= async (email) => {
  try {
    const response = await axios.post(`${API_URL}user/forgotpassword/verifyemail`,{email},{
      withCredentials: true,
    });
    return response;
  }catch (error) {
   return error.message;
  }
};
export const sendOtp= async (email) => {
  try {
    const response = await axios.post(`${API_URL}user/forgotpassword/sendotp`,{email},{
      withCredentials: true,
    });
    return response;
  }catch (error) {
   return error.message;
  }
}
export const validateOtp= async (email,otp) => {
  try {
    const response = await axios.post(`${API_URL}user/forgotpassword/validateotp`,{email,otp},{
      withCredentials: true,
    });
    return response;
  }catch (error) {
   return error.message;
  }
}
export const changePassword= async (email,newPassword,confirmPassword) => {
  try {
    const response = await axios.post(`${API_URL}user/forgotpassword/changepassword`,{email,newPassword,confirmPassword},{
      withCredentials: true,
    });
    return response;
  }catch (error) {
   return error.message;
  }
}

export const isUserLoggedIn= async (setIsLoggedIn,setUser) => {
  try {
    const response = await axios.get(
      `${API_URL}user/loggedIn`,
      {
        withCredentials: true,
      }
    );
    console.log('response from api check',response)
    console.log(response.data.user)
    if (response.status === 200) { 
      setIsLoggedIn(true);
      setUser(response.data.user);
    } else {
      setIsLoggedIn(false);
    }
  } catch (err) {
    console.log("Error checking login status: " + err.message);
  }
};

export const fetchUsers = async (searchTerm = '') => {
  try {
    const response = await axios.get(
      `${API_URL}user/fetchusers`, 
      {
        params: { search: searchTerm },
        withCredentials: true,
      }
    );

    if (response) {
      return response ; // Return the data directly
    }
  } catch (err) {
    console.log("Error in fetching users: " + err.message);
  }
};