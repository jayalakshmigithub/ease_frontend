import React from 'react';
import { Route ,Routes} from 'react-router-dom';
import AdminLogin from '../Components/Admin/AdminLogin';
import AdminHome from '../Components/Admin/AdminHome';
import { ProSidebarProvider } from 'react-pro-sidebar';
import UsersList from '../Components/Admin/UsersList';
import WorkspaceList from '../Components/Admin/WorkspacesList';

import AdminPrivateRoute from './AdminPrivateRoute';
import AdminPublicRoute from './AdminPublicRoute';
import Projects from '../Components/Admin/Projects';




const AdminRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<AdminPublicRoute><AdminLogin/></AdminPublicRoute> } />
      <Route path='/*' element={<AdminPrivateRoute><ProSidebarProvider><AdminHome/></ProSidebarProvider></AdminPrivateRoute>}/>
      <Route path='/userslist'element={<AdminPrivateRoute><ProSidebarProvider><UsersList/></ProSidebarProvider></AdminPrivateRoute>}/>
      <Route path='/workspacelist' element={<AdminPrivateRoute><ProSidebarProvider><WorkspaceList/></ProSidebarProvider></AdminPrivateRoute>}/>
      <Route path='/projectlist'element={<AdminPrivateRoute><ProSidebarProvider><Projects/></ProSidebarProvider></AdminPrivateRoute>}/>

    </Routes>
  );
};

export default AdminRouter;