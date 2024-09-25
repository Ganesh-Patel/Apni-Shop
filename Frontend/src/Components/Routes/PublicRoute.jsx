import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext.jsx';
const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return children;
};
export default PublicRoute;
