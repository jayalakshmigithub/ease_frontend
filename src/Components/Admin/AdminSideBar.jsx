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
import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Typography,
    Button
  } from "@mui/material";
// import Workspace from './Workspace';
// import { color } from '@mui/system';
// import { clearUser } from '../utils/Redux/Slice/userSlice';
import {useDispatch } from "react-redux";
import { clearAdmin } from '../../utils/Redux/Slice/adminSlice';
import { fontFamily } from '@mui/system';



const AdminSideBar = () => {
 const { collapseSidebar } = useProSidebar();
 const navigate =useNavigate()
 const dispatch = useDispatch();

 const handleMenuClick =(path)=>{
    console.log(`naviagting to ${path}`)
    navigate(path)
    
   }

 const handleLogout = async () => {
  localStorage.removeItem("adminaccessToken");
  localStorage.removeItem("adminrefreshToken");
  dispatch(clearAdmin());
  navigate("/admin/login");
};
 const iconStyle = {color:'#714423',fontFamily:'poppins'}


  return (
    <Box sx={{ display: "flex", height: "auto",  color:'black' , backgroundColor:'#B29079'}}>
    <Sidebar className="app" >
      <Menu>
        <MenuItem className="menu1" icon={<MenuOpenIcon onClick={()=>{
            collapseSidebar()
        }} sx={iconStyle}/>} >
        </MenuItem>
        <MenuItem icon={<HomeIcon sx={iconStyle}/> }onClick={()=>handleMenuClick('/admin/*')}> Home </MenuItem>
        <MenuItem icon={<WorkspacesIcon sx={iconStyle}/>} onClick={()=>handleMenuClick('/admin/userslist')}>Users </MenuItem>
        <MenuItem icon={<WorkspacesIcon sx={iconStyle}/>} onClick={()=>handleMenuClick('/admin/workspacelist')}>Workspaces</MenuItem>
        <MenuItem icon={<AccountBoxIcon sx={iconStyle}/>} onClick={()=>handleMenuClick('/admin/projectlist')}> Projects </MenuItem>
        <MenuItem icon={<LogoutIcon sx={iconStyle}/>}onClick={handleLogout}> Logout </MenuItem>
      </Menu>
    </Sidebar>
   
  </Box>
  )
}

export default AdminSideBar

