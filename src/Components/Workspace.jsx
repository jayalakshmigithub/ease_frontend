import React, { useState,useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import SideBar from './SideBar';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent
  
  } from "@mui/material";
import { userAxiosInstance } from '../utils/api/axiosInstance';
import { Container } from '@mui/system';

const Workspace = () => {
  const [workspaces,setWorkspaces] = useState([])
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        
        const response = await userAxiosInstance.get('/workspace',{withCredentials:true}); 
        setWorkspaces(response.data.workspace);
        console.log(response.data,'hiii')
       
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    };
    fetchWorkspaces();
  }, []);
  return (
    <>
      <Box
        className="homepage"
        sx={{
          backgroundImage: `
            radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
            radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
          `,
          width: '100vw',             
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflowX: 'hidden',  
        }}
      >
        <Navbar />
        <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
          <Box sx={{ width: '100px',flexShrink:0 }}>
            <SideBar />
          </Box>
          <Container
           sx={{
            marginTop: '50px',
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin:'100px ,100px'
          }}>
          {/* <Box sx={{ flexGrow: 1, padding: '20px'}}>
          <Typography variant="h4" sx={{ marginBottom: '20px' ,display:'flex',justifyContent:"center"}}>
            Your Workspaces
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' ,justifyContent:"center"}}>
            {workspaces?.length > 0 ? (
              workspaces.map((workspace) => (
                <Card key={workspace._id} sx={{ minWidth: 275 }}>
                  
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {workspace.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {workspace.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1">
                No workspaces found. Create your first workspace!
              </Typography>
            )}
          </Box>
        </Box> */}
        <Box sx={{ flexGrow: 1, padding: '20px'}}>
          <Typography variant="h4" sx={{ marginBottom: '20px' ,display:'flex',justifyContent:"center"}}>
            Your Workspaces
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' ,justifyContent:"center"}}>
            {workspaces?.length > 0 ? (
              workspaces.map((workspace) => (
                <Card key={workspace._id} sx={{ minWidth: 275 }}>
                  
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {workspace.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {workspace.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1">
                No workspaces found. Create your first workspace!
              </Typography>
            )}
          </Box>
        </Box>
        </Container>
          
        </Box>
      </Box>
      
    </>
  )
}
export default Workspace
