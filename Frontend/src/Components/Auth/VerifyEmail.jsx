import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { verifyemail } from '../../Utils/api.js';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getTokenFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('token');
  };

  useEffect(() => {
    const verifyEmailToken = async () => {
      const token = getTokenFromUrl();
      if (!token) {
        setMessage('No token found in the URL.');
        setLoading(false);
        return;
      }

      try {
        // Replace with your backend verification endpoint
         const response = await axios.get(`https://ecommerce-app-oqjy.onrender.com/api/user/verifyuser?token=${token}`);
        // const response = await verifyemail(token);

        if(response){
          setMessage('Email verified successfully! You can now log in.');
          }else{
            setMessage('Verification failed or the token has expired or something else .');
          }

     
      } catch (error) {
        console.error('Error verifying email:', error);
        setMessage('Verification failed or the token has expired.');
      }

      setLoading(false);
    };

    verifyEmailToken();
  }, [location.search]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        {loading ? (
          <h2 className="text-2xl font-bold text-gray-700 text-center">Verifying your email...</h2>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">{message}</h2>
            {message === 'Email verified successfully! You can now log in.' && (
              <Link
                to="/login"
                className="mt-6 inline-block bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Go to Login
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
