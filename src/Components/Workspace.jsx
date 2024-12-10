import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import SideBar from './SideBar';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    List,
    ListItem
} from "@mui/material";
import { userAxiosInstance } from '../utils/api/axiosInstance';
import { Container } from '@mui/system';
import CreateWorkspaceForm from './CreateWorkspace';
import { useSelector } from 'react-redux';
import WorkspaceList from './WorkspaceList';

const Workspace = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [workspaces, setWorkspaces] = useState([]);
  const [sharedWorkspaces, setSharedWorkspaces] = useState([]);  
  const [OpenCreateWorkspace, setOpenCreateWorkspace] = useState(false);
  const [nav, setNav] = useState('board');
  const [mobileDropdown, setMobileDropdown] = useState(false);


  
  
  const fetchWorkspaces = async () => {
    try {
      const response = await userAxiosInstance.get('/workspaces', { withCredentials: true });
      console.log('response in')
  
      const userWorkspaces = response.data.workspace || [];  
      const userSharedWorkspace = response.data.sharedWorkspace || [];
      console.log('resposnee',response) 
  
      setSharedWorkspaces(userSharedWorkspace);
      setWorkspaces(userWorkspaces);
      
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  
  const handleInvitation = async () => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const workspaceId = query.get('workspaceId');
    const encryptedEmail = query.get('email');
    
    if (token && workspaceId && encryptedEmail) {
      try {
        await userAxiosInstance.post('/invite', { token, workspaceId, encryptedEmail }, { withCredentials: true });
        navigate('/workspace'); 
      } catch (error) {
        console.error('Error processing invitation:', error);
      }
    }
  };

  useEffect(() => {
    fetchWorkspaces();
    handleInvitation(); 
  }, [location.search]);

  const handleOpenCreateWorkspace = () => {
    setOpenCreateWorkspace(true);
  };
  
  const handleCloseCreateWorkspace = () => {
    setOpenCreateWorkspace(false);
  };

  const handleWorkspacePanel = (workspaceId) => {
    navigate(`/workspace/${workspaceId}`);
  };

const userInfo = useSelector((state)=>state?.user?.userInfo?.user)

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
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexGrow: 1 }}>
          <Box sx={{ width: { xs: '100%', md: '250px' }, flexShrink: 0 }}>
            <SideBar />
          </Box>
          <Container
          sx={{
            marginTop: '20px',
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
            maxWidth: '600px',
          }}
        >
          <Container  maxWidth={false}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                p: 0,
                width: "90%",
                backgroundColor:'white',
                padding:'5px',
                borderRadius:'12px'
              }}>

          <Box
  sx={{
    display: {
      xs: mobileDropdown ? "block" : "none",
      md: "flex",
      flexDirection: { xs: "column", md: "row" },
    },
    width: { xs: "100%", md: "auto" },
  }}
  id="navbar-default"
>
  <List
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      width: "90%",
      p: 0,
      gap: { xs: 0.5, md: 1 }, 
    }}
  >
    
    <ListItem disablePadding sx={{ mr: { md: 0.5 } }}>
      <Button
        variant="text"
        fullWidth
        sx={{
          justifyContent: "start",
          width: { xs: "100%", md: "auto" },
          py: 1,
          px: 2,
          color: nav === "board" ? "#357793" : "#357793",
          bgcolor: nav === "board" ? "blue.100" : "transparent",
          borderBottom: nav === "board" ? "2px solid #357793" : "none",
          borderRadius: 1,

          "&:focus": { outline: "none" },
          "&:hover": { bgcolor: "blue.600" },
          "&:active": { outline: "none", boxShadow: "none" },
          "&:focus-visible": { outline: "none" },
        }}
        onClick={() => {
          setNav("board");
          setMobileDropdown(!mobileDropdown);
        }}
      >
        Board
      </Button>
    </ListItem>

    {/* List Button */}
    <ListItem disablePadding>
      <Button
        variant="text"
        fullWidth
        disableRipple
        sx={{
          justifyContent: "start",
          width: { xs: "100%", md: "auto" },
          py: 1,
          px: 2,
          color: nav === "list" ? "#357793" : "#357793",
          bgcolor: nav === "list" ? "blue.700" : "transparent",
          borderBottom: nav === "list" ? "2px solid #357793" : "none",
          borderRadius: 1,

          "&:focus": { outline: "none" },
          "&:hover": { bgcolor: "blue.600" },
          "&:active": { outline: "none", boxShadow: "none" },
          "&:focus-visible": { outline: "none" },
        }}
        onClick={() => {
          setNav("list");
          setMobileDropdown(!mobileDropdown);
        }}
      >
        List
      </Button>
    </ListItem>
  </List>
</Box>
</Container>

      
      
         
          {nav === 'board' ? (
            <>
              <Box sx={{ padding: '20px' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  Your Workspaces
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                  {workspaces?.length > 0 ? (
                    workspaces.map((workspace) => (
                      <Card key={workspace._id} sx={{ minWidth: 275, cursor: 'pointer' }} onClick={() => handleWorkspacePanel(workspace._id)}>
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
                    <Typography variant="body1">No workspaces found. Create your first workspace!</Typography>
                  )}
                </Box>
              </Box>

              {/* Shared Workspaces */}
              <Box sx={{ marginTop: '20px', padding: '20px' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  Shared Workspaces
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                  {sharedWorkspaces?.length > 0 ? (
                    sharedWorkspaces.map((workspace) => (
                      <Card key={workspace._id} sx={{ minWidth: 275, cursor: 'pointer' }} onClick={() => handleWorkspacePanel(workspace._id)}>
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
                    <Typography variant="body1">No shared workspaces found.</Typography>
                  )}
                </Box>
              </Box>

             
              <Box sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ backgroundColor: '#357793' }} variant="contained" onClick={handleOpenCreateWorkspace}>
                  Create Workspace
                </Button>
              </Box>

              <CreateWorkspaceForm
                open={OpenCreateWorkspace}
                onClose={handleCloseCreateWorkspace}
                setWorkSpace={(newWorkspace) => setWorkspaces((prev) => [...prev, newWorkspace])}
                fetchWorkspaces={fetchWorkspaces}
                existingWorkspaceNames={workspaces.map((workspace) => workspace.name)}
              />
            </>
          ) : (
            <WorkspaceList workspaces={workspaces} /> 
          )}
        </Container>
        </Box>
      </Box>
    </>
  );
};

export default Workspace;
