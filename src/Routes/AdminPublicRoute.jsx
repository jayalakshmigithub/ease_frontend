import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.admin?.isAuthenticated);
  return isAuthenticated ? <Navigate to="/admin/*" /> : <>{children}</>;
};

export default AdminPublicRoute;