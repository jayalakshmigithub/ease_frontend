import React, { useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { clearUser } from "../utils/Redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import { fontSize } from "@mui/system";
import { userAxiosInstance } from "../utils/api/axiosInstance";
import axios from "axios";
import { axiosUser } from "../utils/api/baseUrl";

const SideBar = () => {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleMenuClick = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  // const handleLogout = async () => {
  //   localStorage.removeItem("useraccessToken");
  //   localStorage.removeItem("userrefreshToken");
  //   dispatch(clearUser());
  //   navigate("/signin");
  //   setDrawerOpen(false);
  // };

  const handleLogout = async () => {
      try {
          const refreshtoken = localStorage.getItem("userrefreshToken");
          const accesstoken = localStorage.getItem("useraccessToken");
  
          if (!refreshtoken || !accesstoken) {
              console.error("No refresh or access token found!");
              return;
          }
  
          const response = await axiosUser.post(
              "/logout",
              { refreshtoken }, 
              {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${accesstoken}`, 
                  },
                  withCredentials: true,
              }
          );
  
          console.log("Logout successful:", response.data);
          
         
          localStorage.removeItem("useraccessToken");
          localStorage.removeItem("userrefreshToken");
          dispatch(clearUser());
  
        
          navigate("/signin");
  
      } catch (error) {
          console.error("Logout error", error);
      }
  };
  



  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const iconStyle = { color: "#fff", fontSize: "28px" };

  return (
    <>
      {isMdUp ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            color: "black",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            "& .ps-sidebar-root": {
              border: "none !important",
            },
          }}
        >
          
          <Sidebar
            className="app"
            rootStyles={{
              [`.${sidebarClasses.container}`]: {
                backgroundColor: "#1e293b",
                borderColor: "#1e293b",
                // width:245
                border: "none",
                boxShadow: "none",
                width: "90%",
                borderRight: "none !important",
                margin: 0,
                padding: 0,
                boxSizing: "border-box",
                overflow: "hidden",
              },
              [`.${menuClasses.button}:hover`]: {
                backgroundColor: "#8a9098 !important",
              },
              [`.${menuClasses.label}`]: {
                fontSize: "16px",
                fontWeight: "bold",
                color: "#fff",
              },
              [`.${sidebarClasses.root}`]: {
                borderRight: "none !important",
              },
            }}
          >
            <Menu>
              <MenuItem
                icon={<MenuOpenIcon onClick={collapseSidebar} sx={iconStyle} />}
              />
              <MenuItem
                icon={<HomeIcon sx={iconStyle} />}
                onClick={() => handleMenuClick("/home")}
              >
                {" "}
                Home{" "}
              </MenuItem>
              <MenuItem
                icon={<WorkspacesIcon sx={iconStyle} />}
                onClick={() => handleMenuClick("/workspace")}
              >
                {" "}
                Workspaces{" "}
              </MenuItem>
              {/* <MenuItem icon={<AssignmentIcon sx={iconStyle}/>} onClick={() => handleMenuClick('/projects')}> Projects </MenuItem> */}
              <MenuItem
                icon={<AccountBoxIcon sx={iconStyle} />}
                onClick={() => handleMenuClick("/profile")}
              >
                {" "}
                Profile{" "}
              </MenuItem>
              <MenuItem
                icon={<MessageIcon sx={iconStyle} />}
                onClick={() => handleMenuClick("/messages")}
              >
                {" "}
                Messages{" "}
              </MenuItem>
              <MenuItem
                icon={<LogoutIcon sx={iconStyle} />}
                onClick={handleLogout}
              >
                {" "}
                Logout{" "}
              </MenuItem>
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
                <MenuItem
                  icon={<MenuOpenIcon onClick={toggleDrawer} sx={iconStyle} />}
                />
                <MenuItem
                  icon={<HomeIcon sx={iconStyle} />}
                  onClick={() => handleMenuClick("/home")}
                >
                  {" "}
                  Home{" "}
                </MenuItem>
                <MenuItem
                  icon={<WorkspacesIcon sx={iconStyle} />}
                  onClick={() => handleMenuClick("/workspace")}
                >
                  {" "}
                  Workspaces{" "}
                </MenuItem>

                <MenuItem
                  icon={<AccountBoxIcon sx={iconStyle} />}
                  onClick={() => handleMenuClick("/profile")}
                >
                  {" "}
                  Profile{" "}
                </MenuItem>
                <MenuItem
                  icon={<MessageIcon sx={iconStyle} />}
                  onClick={() => handleMenuClick("/messages")}
                >
                  {" "}
                  Messages{" "}
                </MenuItem>
                <MenuItem
                  icon={<LogoutIcon sx={iconStyle} />}
                  onClick={handleLogout}
                >
                  {" "}
                  Logout{" "}
                </MenuItem>
              </Menu>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
};

export default SideBar;

{
  /* {isWorkspacesPage ? (
          <SubMenu icon={<WorkspacesIcon sx={iconStyle}/>} onClick={()=>handleMenuClick('/workspace')} label="workspaces">
          <MenuItem icon={<AddIcon sx={iconStyle} />}>
          New workspace
          </MenuItem>
        </SubMenu>
        ):( 
        <MenuItem icon={<WorkspacesIcon sx={iconStyle}/>} onClick={()=>handleMenuClick('/workspace')}>Workspaces </MenuItem>
        )} */
}
