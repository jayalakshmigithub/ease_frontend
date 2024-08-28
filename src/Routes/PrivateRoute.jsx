import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';




const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);

  console.log(children);
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
 
};

export default PrivateRoute;