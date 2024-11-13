import { Box, Container, margin, width, } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { TextField, Typography , Button , Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import { List, ListItem, ListItemText, } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from "@mui/x-data-grid";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { GrProjects } from "react-icons/gr";
import AddIcon from '@mui/icons-material/Add'
import InviteMembers from "../InviteMembers";
import { MdOutlineDescription } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { BsListCheck } from "react-icons/bs";
import dayjs from "dayjs";
import {Divider }from "@mui/material";
import { keyframes } from '@mui/system';

const WorkspacePanel = () => {
  const location = useLocation()
 
  const [workspace, setWorkspace] = useState(null);
  const [projects,setProjects] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openInvite ,setOpenInvite] = useState(false)

  const [currentPage, setCurrentPage] = useState(0); 
  const projectsPerPage = 4;

 
  const totalPages = Math.ceil(projects.length / projectsPerPage);

 
  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    currentPage * projectsPerPage + projectsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
const navigate = useNavigate()

  const formattedDate = dayjs(projects.toDate).format('YYYY-MM-DD');

  const handelOpenInvite = ()=>{
    setOpenInvite(true)
  }
  const handleCloseInvite = ()=>{
    setOpenInvite(false)
  }
  const { workspaceId } = useParams();
  const fetchWorkspace = async () => {
    try {
      if (!workspaceId) {
        throw new Error("Invalid workspace ID");
      }
      const response = await userAxiosInstance.get(
        `/workspace/${workspaceId}`,
        { withCredentials: true }
      );
      console.log("Response:", response);
      setWorkspace(response.data.workspace);
      console.log("Workspace data:", response.data.workspace);
    } catch (error) {
      console.error("Error fetching workspace:", error);
      setError("Failed to load workspace");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspace();
  }, [workspaceId]);


  const handleInvitation = async () => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    // const workspaceId = query.get('workspaceId');
    const encryptedEmail = query.get('email');
    
    if (token && workspaceId && encryptedEmail) {
      try {
        
        await userAxiosInstance.post('/invite', { token, workspaceId , encryptedEmail }, { withCredentials: true });
        console.log('workspaceid',workspaceId)
        
        navigate('/workspace'); 
      } catch (error) {
        console.error('Error processing invitation:', error);
      }
    }
  };

  useEffect(() => {
   
    handleInvitation(); 
  }, [location.search]);


  const fetchProjects = async()=>{
    try {
      const response = await userAxiosInstance.get(`/workspaces/${workspaceId}/projects`)
      console.log('response from projects',response)
      setProjects(response.data.projects)
      console.log('response.data.projects',response.data.projects)

    } catch (error) {
      console.error('error fetching projects',error);
      setError('failed to fetch projects')
      
      
    }
  }
   useEffect(()=>{
    fetchProjects()
   },[])

   const handleProject = (projectId)=>{
    navigate(`/projects/${projectId}`)
   } 
 
 
// const columns  = [
//   {field : 'projectName' , headerName : " Project Name" , width: 200, renderHeader: () => (
//     <Box style={{ color: '#333', fontSize:'18px', fontFamily:"poppins"  }}>
//       <span><GrProjects /> ProjectName</span>
//     </Box>
  
  
//   )},
//   {field : 'description' , headerName : " Description" , width: 300,renderHeader: () => (
//     <Box style={{ color: '#333', fontSize:'18px', fontFamily:"poppins"  }}>
//       <span><MdOutlineDescription /> Description</span>
//     </Box>)},
//   {field : 'status' , headerName : " Status" , width: 150,
//     renderHeader: () => (
//       <Box style={{ color: '#333', fontSize:'18px', fontFamily:"poppins"  }}>
//         <span><FaBarsProgress /> Status</span>
//       </Box>)

//   },
//   {field : 'members' , headerName : " Members" , width: 150,
//     renderHeader: () => (
//       <Box style={{ color: '#333', fontSize:'18px', fontFamily:"poppins"  }}>
//         <span><IoPeopleSharp /> Members</span>
//       </Box>)
//   },
//   {field : 'toDate' , headerName : " Due Date" , width: 150,
//     renderHeader: () => (
//       <Box style={{ color: '#333', fontSize:'18px', fontFamily:"poppins"  }}>
//         <span><FaRegCalendarAlt /> Due date</span>
//       </Box>)
//   },
// ]
 
// const rows = projects.map((project, index) => ({
//   id: project._id||index+1,
//   projectName: project.projectName,
//   description: project.Description,   
//   status: project.status ? 'Active' : 'Pending' ,
//   toDate:dayjs(project.toDate).format('YYYY-MM-DD')

// }));


   const StyledButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    display: 'inline-block',
    padding: '15px 30px',
    border: '2px solid #fefefe',
    textTransform: 'uppercase',
    color: '#fefefe', 
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '20px',
    backgroundColor: 'transparent', 
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '6px',
      left: '-2px',
      width: 'calc(100% + 4px)',
      height: 'calc(100% - 12px)',
      backgroundColor: '#88AED0', 
      transition: '0.3s ease-in-out',
      transform: 'scaleY(1)',
      zIndex: 1,
    },
    '&:hover::before': {
      transform: 'scaleY(0)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '6px',
      top: '-2px',
      height: 'calc(100% + 4px)',
      width: 'calc(100% - 12px)',
      backgroundColor: '#88AED0', 
      transition: '0.3s ease-in-out',
      transform: 'scaleX(1)',
      transitionDelay: '0.5s',
      zIndex: 0,
    },
    '&:hover::after': {
      transform: 'scaleX(0)',
    },
    '&:hover': {
      color: 'white', 
    },
  }));
  const jumpAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); 
  }
  100% {
    transform: translateY(0); 
  }
`;
  
 

  // return (
  //   <>
  //     <Box
  //       className="homepage"
  //       sx={{
  //         backgroundImage: `
  //       radial-gradient(  at top right, #17888d 4%, #fff 50%),
  //       radial-gradient(  at bottom left, #17888d 10%, #fff 55%)
  //     `,
  //         width: "100vw",
  //         height: "100vh",
  //         display: "flex",
  //         flexDirection: "column",
  //         boxSizing: "border-box",
  //         overflowX: "hidden",
  //       }}
  //     >
  //       <Navbar />
  //       <Box sx={{ borderBottom: "dotted", borderColor: "#59a9aa" }}></Box>
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: { xs: "column", md: "row" },
  //           flexGrow: 1,
  //         }}
  //       >
  //         <Box sx={{ width: { xs: "100%", md: "250px" }, flexShrink: 0 }}>
  //           <SideBar sx={{ backgroundColor: "white" }} />
  //         </Box>
  //         <Container
  //           sx={{
  //             flexGrow: 1,
  //             marginTop: { xs: "20px", md: "50px" },
  //             backgroundColor: "transparent",
  //             backdropFilter: "blur(10px)",
  //             padding: "20px",
  //             borderRadius: "8px",
  //             boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
  //             maxWidth: "600px",
  //           }}
  //         >
  //           <Box sx={{display:'flex', backgroundColor:'white', padding:'10px' , borderRadius:'10px', marginTop:'20px',flexDirection:'column',}} >
           
  //             {loading ? (
  //               <Typography variant="h4">Loading workspace...</Typography>
  //             ) : error ? (
  //               <Typography variant="h4" color="error">
  //                 {error}
  //               </Typography>
  //             ) : workspace ? (
                
  //               <Typography  variant="h3" sx={{fontFamily:'poppins' ,display:'flex',color:'grey',mb:'5px',}}><VscWorkspaceTrusted style={{ marginRight: '8px', verticalAlign: 'middle' }} />{workspace.name}</Typography>
  //             ) : (
  //               <Typography variant="h4">No workspace found</Typography>
               
  //             )}
              
  //             <TextField sx={{marginTop:'5px'}} fullWidth  label="select workspace"/> 
  //           </Box>

  //           <Box>

  //           </Box>
             
  //         </Container>
  //       </Box>
  //     </Box>
  //   </>
  // );

  return (
    <Box
      className="homepage"
      sx={{
        backgroundImage: `
        radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
        radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%)
      `,
        width: "100vw", 
        height: "100vh", 
        display: "flex", 
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      
      <SideBar
        sx={{
          backgroundColor: "white",
          width: { xs: "100%", md: "250px" }, 
          flexShrink: 0, 
        }}
      />

     
      <Box
        sx={{
          flexGrow: 1, 
          padding: "20px",
          display: "flex",
          flexDirection: "column", 
          justifyContent: "flex-start", 
          alignItems: "flex-start", 
        }}
      >
        <Container
          sx={{
            maxWidth: "100%", 
            backgroundColor: "transparent", 
            backdropFilter: "blur(10px)", 
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.1)", 
            marginTop: { xs: "20px", md: "20px" }, 
          }}
        >
          <Box
            sx={{
              display: 'flex',
              // backgroundColor: 'white',
              padding: '10px',
              borderRadius: '10px',
              marginTop: '20px',
              flexDirection: 'column', 
            }}
          >
            {loading ? (
              <Typography variant="h4">Loading workspace...</Typography>
            ) : error ? (
              <Typography variant="h4" color="error">
                {error}
              </Typography>
            ) : workspace ? (
              <Typography
                variant="h3"
                sx={{
                  fontFamily: 'Poppins',
                  display: 'flex',
                  color: '#357793',
                  mb: '5px',
                }}
              >
                <VscWorkspaceTrusted
                  style={{ marginRight: '8px', verticalAlign: 'middle' }}
                />
                {workspace.name}
              </Typography>
            ) : (
              <Typography variant="h4">No workspace found</Typography>
            )}

  <StyledButton component="a" href="#"  onClick={handelOpenInvite} sx={{ padding: '5px 10px', fontSize: '16px', position: 'absolute', right: '20px', top: '10px',marginTop:'20px' , marginRight:'30px' }}>
    <AddIcon sx={{margin: '2px' , display:'flex', alignItems:'flex-end',position:'absolute' }}/>
            <span style={{ position: 'relative', zIndex: 3 }}>Invite members</span>
          </StyledButton>

        <InviteMembers 
         workspace={workspaceId}
        open={openInvite}
        onClose={handleCloseInvite}
        />
           
            {/* <TextField sx={{ marginTop: '5px' }} fullWidth label="Select workspace" /> */}
          </Box>
          
        </Container>
        <Container
        sx={{
          maxWidth: "100%", 
          backgroundColor: "transparent", 
          backdropFilter: "blur(10px)", 
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.1)", 
          marginTop: { xs: "20px", md: "20px" }, 
        }}
        >
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
          
            <Typography variant="h5"
            gutterBottom
                sx={{
                  
                  fontFamily: 'sans-serif',
                  display: 'flex',
                  color: '#357793',
                  mb: '5px',
                  fontSize:'30px'
                  
                }}>
                  <BsListCheck  style={{ marginRight: '8px', verticalAlign: 'middle',marginTop:'auto' }}/>
                  List of projects</Typography>
                  <Typography sx={{textAlign:'right',paddingRight:'30px', animation: `${jumpAnimation} 2s ease-in-out infinite`,fontSize:'20px' }}>* select a project for details</Typography>
            
          </Box>
          {/* <Box>
            {projects?.length > 0 ? (
              projects.map((project)=>{
                return(
                  <Box>
                   <Typography sx={{fontSize:'25px'}}color="text.secondary">{project.projectName}</Typography>
                   <Typography sx={{ mb: 1.5 }} color="text.secondary">{project.Description}</Typography>
                </Box>
                )
                
               
              })
            ):(
              <Typography variant="body1">
                    No projects found.
                  </Typography>
            )}
          </Box> */}


          {/* <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
            sx={{fontFamily:'poppins',borderRadius:'10px',padding:'8px'}}
             rows={rows}
             columns={columns}
             pageSize={5}
            //  rowsPerPageOptions={[5]}
             
            />
          </Box> */}
          <Box>
  {/* <List>
    {projects?.length > 0 ? (
      projects.map((project, index) => (
        <Box key={index}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',cursor:'pointer' }} onClick={()=>handleProject(project._id)}>
            <ListItem sx={{ width: '70%' }}>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: '22px', color: '#555555' }}>
                    {project.projectName}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ fontSize: '18px', color: 'grey' }}>
                    {project.Description}
                  </Typography>
                }
              />
            </ListItem>

           
            <Typography
              sx={{
                fontSize: '22px',
                color: '#555555',
                textAlign: 'right',
                paddingRight: '36px',
              }}
            >
            
              status
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />
        </Box>
      ))
    ) : (
      <Typography variant="body1">No projects found.</Typography>
    )}
  </List> */}

<List>
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <Box key={project._id}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => handleProject(project._id)}
              >
                <ListItem sx={{ width: '70%' }}>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '22px', color: '#555555' }}>
                        {project.projectName}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ fontSize: '18px', color: 'grey' }}>
                        {project.Description}
                      </Typography>
                    }
                  />
                </ListItem>
                <Typography
                  sx={{
                    fontSize: '22px',
                    color: '#555555',
                    textAlign: 'right',
                    paddingRight: '36px',
                  }}
                >
                  {project.status ? 'Active' : 'Pending'}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
            </Box>
          ))
        ) : (
          <Typography variant="body1">No projects found.</Typography>
        )}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous
        </Button>
        <Typography>
          Page {currentPage + 1} of {totalPages}
        </Typography>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          Next
        </Button>
      </Box>

</Box>

          
        </Container>
        
      </Box>
    </Box>
  );

};

export default WorkspacePanel;





