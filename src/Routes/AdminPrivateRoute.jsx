
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.admin?.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to='/admin/login' />;
};

export default AdminPrivateRoute;
