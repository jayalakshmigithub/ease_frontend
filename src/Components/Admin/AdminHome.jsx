// AdminHome.js
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import AdminSideBar from "./AdminSideBar";

import Dashboard from './Dashboard'

const AdminHome = () => {
  return (
    <>
      <Box
        className="homepage"
        sx={{
          backgroundColor: "#F6F5EC",
          width: "100vw",
          height: "100vh",
          display: "flex",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <AdminSideBar />

        <Box
          sx={{
            flexGrow: 1,
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Container
            sx={{
              flexGrow: 1,
              padding: "15px",
              display: "flex",
              flexDirection: "column",  // Aligns items vertically
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "transparent",
              backdropFilter: "blur(20px)",
              boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
              borderRadius: '15px',
              height: "auto",
              marginTop: '30px'
            }}
          >
           

           
            <Dashboard />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AdminHome;
