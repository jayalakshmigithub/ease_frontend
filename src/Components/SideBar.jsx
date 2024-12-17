


import React, { useState } from 'react';
import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { clearUser } from '../utils/Redux/Slice/userSlice';
import { useDispatch } from "react-redux";

const SideBar = () => {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); 

  const handleMenuClick = (path) => {
    navigate(path);
    setDrawerOpen(false); 
  };

  const handleLogout = async () => {
    localStorage.removeItem("useraccessToken");
    localStorage.removeItem("userrefreshToken");
    dispatch(clearUser());
    navigate("/signin");
    setDrawerOpen(false); 
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const iconStyle = { color: '#357793' };

  return (
    <>
      {isMdUp ? (
       
        <Box sx={{ display: "flex", height: "100vh", color: 'black' }}>
          <Sidebar className="app">
            <Menu>
              <MenuItem icon={<MenuOpenIcon onClick={collapseSidebar} sx={iconStyle} />} />
              <MenuItem icon={<HomeIcon sx={iconStyle} />} onClick={() => handleMenuClick('/home')}> Home </MenuItem>
              <MenuItem icon={<WorkspacesIcon sx={iconStyle} />} onClick={() => handleMenuClick('/workspace')}> Workspaces </MenuItem>
              {/* <MenuItem icon={<AssignmentIcon sx={iconStyle}/>} onClick={() => handleMenuClick('/projects')}> Projects </MenuItem> */}
              <MenuItem icon={<AccountBoxIcon sx={iconStyle} />} onClick={() => handleMenuClick('/profile')}> Profile </MenuItem>
              <MenuItem icon={<MessageIcon sx={iconStyle} /> } onClick={() => handleMenuClick('/messages')}> Messages </MenuItem>
              <MenuItem icon={<LogoutIcon sx={iconStyle} />} onClick={handleLogout}> Logout </MenuItem>
            </Menu>
          </Sidebar>
        </Box>
      ) : (
       
        <>
          <IconButton onClick={toggleDrawer}>
            <MenuRoundedIcon />
          </IconButton>
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
            <Box sx={{ width: 250 }}>
              <Menu>
                <MenuItem icon={<MenuOpenIcon onClick={toggleDrawer} sx={iconStyle} />} />
                <MenuItem icon={<HomeIcon sx={iconStyle} />} onClick={() => handleMenuClick('/home')}> Home </MenuItem>
                <MenuItem icon={<WorkspacesIcon sx={iconStyle} />} onClick={() => handleMenuClick('/workspace')}> Workspaces </MenuItem>
              
                <MenuItem icon={<AccountBoxIcon sx={iconStyle} />} onClick={() => handleMenuClick('/profile')}> Profile </MenuItem>
                <MenuItem icon={<MessageIcon sx={iconStyle} /> } onClick={() => handleMenuClick('/messages')}> Messages </MenuItem>
                <MenuItem icon={<LogoutIcon sx={iconStyle} />} onClick={handleLogout}> Logout </MenuItem>
              </Menu>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
};

export default SideBar;






























 {/* {isWorkspacesPage ? (
          <SubMenu icon={<WorkspacesIcon sx={iconStyle}/>} onClick={()=>handleMenuClick('/workspace')} label="workspaces">
          <MenuItem icon={<AddIcon sx={iconStyle} />}>
          New workspace
          </MenuItem>
        </SubMenu>
        ):( 
        <MenuItem icon={<WorkspacesIcon sx={iconStyle}/>} onClick={()=>handleMenuClick('/workspace')}>Workspaces </MenuItem>
        )} */}

