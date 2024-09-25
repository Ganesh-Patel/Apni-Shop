import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(UserContext);

  if (loading) {
    return <div className="spinner">Loading...</div>;  
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
