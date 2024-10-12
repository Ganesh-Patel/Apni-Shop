
import React, { createContext, useEffect, useState } from 'react';
import {isUserLoggedIn} from '../Utils/api.js'
import { Navigate, useNavigate } from 'react-router-dom';
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const navigate=useNavigate();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      await isUserLoggedIn(setIsLoggedIn,setUser);
      console.log(user);
      
      setLoading(false);
    };
    checkLoginStatus();

  }, []);
  console.log(isLoggedIn)
  if (loading) {
    return null;
  }
  return (
    <UserContext.Provider value={{ user, setUser,isLoggedIn,setIsLoggedIn,loading }}>
      {children}
    </UserContext.Provider>
  );
};
