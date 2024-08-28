import React from 'react'
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom';
import Login from '../Components/LoginSignup/Login'
import Signup from '../Components/SignUP/Signup';
import LandingPage from '../Components/LandingUI/LandingPage';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import Home from '../Components/Home/Home';
import FormsStepper from '../Components/Stepper/FormsStepper'
import LoginGoogle from '../Components/LoginSignup/LoginGoogle';
import { ProSidebarProvider } from "react-pro-sidebar";
import Workspace from '../Components/Workspace';
import NewProject from '../Components/NewProject/NewProject';

const UserRoutes = () => {
  return (
    <div>
       <Routes>
       <Route path='/' exact element={<LandingPage/>}/>
       <Route path='/landing' element={<LandingPage/>}/>
         <Route path='/signin' element={<Login/>}/>
         <Route path='/signingoogle' element={<LoginGoogle/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/home' element={<ProSidebarProvider><Home/></ProSidebarProvider>}/>
         <Route path='/stepper' element={ <FormsStepper/>}/>
         <Route path='/workspace' element={<ProSidebarProvider><Workspace/></ProSidebarProvider>}/>
         <Route path='/newproject' element={<NewProject/>}/>
       </Routes>
    </div>
  )
}

export default UserRoutes
