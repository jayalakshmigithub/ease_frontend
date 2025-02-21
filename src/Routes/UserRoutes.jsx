import React from 'react'
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom';
import Login from '../Components/LoginSignup/Login'
import Signup from '../Components/SignUP/Signup';
import LandingPage from '../Components/LandingUI/LandingPage';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Home from '../Components/Home/Home';
import FormsStepper from '../Components/Stepper/FormsStepper'
import LoginGoogle from '../Components/LoginSignup/LoginGoogle';
import { ProSidebarProvider } from "react-pro-sidebar";
import Workspace from '../Components/Workspace';
import NewProject from '../Components/NewProject/NewProject';
import WorkspacePanel from '../Components/WorkspacePanel/WorkspacePanel';
import UserProfile from '../Components/UserProfile/UserProfile';

import OtpPage from '../Components/OtpPage';

import InviteMembers from '../Components/InviteMembers';

import TaskPage from '../Components/Tasks/TaskPage'
// import ProjectPanel from '../Components/ProjectPanel/ProjectPanel';
import ProjectsOverview from '../Components/NewProject/ProjectsOverview';
import AddTask from '../Components/Tasks/AddTask';
import ChatComponent from '../Components/Chat/ChatComponent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import WorkspaceList from '../Components/WorkspaceList';
import ForgotPassword from '../Components/PasswordReset/ForgotPassword';
import NewPassword from '../Components/PasswordReset/NewPassword';
import NotificationPage from '../Components/Chat/Notification';
import Activities from '../Components/WorkspacePanel/Activities';
import VideoConference from '../Components/Chat/VideoConference';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import TaskListRough from '../Components/TaskListRough';
const UserRoutes = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#60a5fa', // blue-400
      },
      background: {
        default: '#0f172a', // slate-900
        paper: '#1e293b', // slate-800
      },
      grey: {
        700: '#334155', // slate-700
        800: '#1e293b', // slate-800
        900: '#0f172a', // slate-900
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });
  return (
    <div>
       <Routes>
       <Route path='/' exact element={<LandingPage/>}/>
       <Route path='/landing' element={<LandingPage/>}/>
         <Route path='/signin' element={<PublicRoute><Login/></PublicRoute> }/>
         <Route path='/signingoogle' element={<LoginGoogle/>}/>
         <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}/>
         <Route path='/otp' element={<OtpPage/>}/>
         <Route path='/stepper' element={ <PrivateRoute><FormsStepper/></PrivateRoute>}/>
         <Route path='/reset-password' element={<NewPassword/>}/>
         <Route
  path="/home"
  element={
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PrivateRoute>
        <ProSidebarProvider>
          <Home />
        </ProSidebarProvider>
      </PrivateRoute>
    </ThemeProvider>
  }
/>

         <Route path='/invite' element={<InviteMembers open={true} onClose={() => navigate('/home')} />} />
         <Route path='/workspace' element={<PrivateRoute><ProSidebarProvider><Workspace/></ProSidebarProvider></PrivateRoute>}/>
         <Route path='/newproject' element={<PrivateRoute><LocalizationProvider><NewProject/></LocalizationProvider></PrivateRoute>}/>
         <Route path='/workspace/:workspaceId' element={<PrivateRoute><ProSidebarProvider><WorkspacePanel /></ProSidebarProvider></PrivateRoute>}/>
         <Route path='/projects/:projectId' element={<PrivateRoute><ProSidebarProvider><ProjectsOverview/></ProSidebarProvider></PrivateRoute>}/>
         {/* <Route path='/projects' element={<ProSidebarProvider><ProjectsOverview/></ProSidebarProvider>}/> */}
         <Route path='/profile' element={<ProSidebarProvider><UserProfile/></ProSidebarProvider>}></Route>
         <Route path='/projects/:projectId/tasks/' element={<ProSidebarProvider><TaskPage/></ProSidebarProvider>}/>
         <Route path='/tasks' element={<ProSidebarProvider><AddTask/></ProSidebarProvider>}/>
         <Route path='/messages' element={<ProSidebarProvider><ChatComponent/></ProSidebarProvider>}/>
         <Route path= '/notifications' element={<ProSidebarProvider><NotificationPage/></ProSidebarProvider>}/>
         <Route path='/video-call/:roomId' element={<VideoConference/>}/>
         <Route path='/activities/:workspaceId'element={<ProSidebarProvider><Activities/></ProSidebarProvider>}/>
         <Route path='/list'element={<ProSidebarProvider><WorkspaceList/></ProSidebarProvider>}/>
         <Route path='/forgotpassword'element={<ForgotPassword/>}/>
         <Route path='/tasklist'element={<ProSidebarProvider><TaskListRough/></ProSidebarProvider>}/>
         




       </Routes>
    </div>
  )
}

export default UserRoutes
