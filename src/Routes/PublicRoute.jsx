import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';




const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);

  return isAuthenticated ? <Navigate to="/home" /> :<>{children}</>  ;
 
};

export default PublicRoute;