import React from 'react'
import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar , Menu, MenuItem,SubMenu,useProSidebar} from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button
  } from "@mui/material";
import Workspace from './Workspace';
import { color } from '@mui/system';
import { clearUser } from '../utils/Redux/Slice/userSlice';
import {useDispatch } from "react-redux";



const SideBar = () => {
 const { collapseSidebar } = useProSidebar();
 const navigate =useNavigate()
 const dispatch = useDispatch();
 const handleMenuClick =(path)=>{
  console.log(`naviagting to ${path}`)
  navigate(path)
  
 }
 const handleLogout = async () => {
  localStorage.removeItem("useraccessToken");
  localStorage.removeItem("userrefreshToken");
  dispatch(clearUser());
  navigate("/signin");
};
 const iconStyle = {color:'#357793'}

  return (
    <Box sx={{ display: "flex", height: "100vh",  color:'black'}}>
    <Sidebar className="app" style={{  backgroundImage: `
            radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
            radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
          `}}>
      <Menu>
        <MenuItem className="menu1" icon={<MenuOpenIcon onClick={()=>{
            collapseSidebar()
        }} sx={iconStyle}/>} >
        </MenuItem>
        <MenuItem icon={<HomeIcon sx={iconStyle}/>}onClick={()=>handleMenuClick('/home')}> Home </MenuItem>
        <MenuItem icon={<WorkspacesIcon sx={iconStyle}/>} onClick={()=>handleMenuClick('/workspace')}>Workspaces </MenuItem>
        <MenuItem icon={<AccountBoxIcon sx={iconStyle}/>}> Profile </MenuItem>
        <MenuItem icon={<MessageIcon sx={iconStyle}/>}> Messages </MenuItem>
        <MenuItem icon={<LogoutIcon sx={iconStyle}/>}onClick={handleLogout}> Logout </MenuItem>
      </Menu>
    </Sidebar>
   
  </Box>
  )
}

export default SideBar

