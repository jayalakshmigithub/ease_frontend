import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import SideBar from "../SideBar";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { useParams } from "react-router-dom";
import ProgressionChart from "../Charts/ProgressionChart";
import { DataGrid } from '@mui/x-data-grid';
import TaskListRough from "../TaskListRough";
import TaskPage from "../Tasks/TaskPage";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const ProjectsOverview = () => {
  const [tasks, setTasks] = useState([]);
  const [nav, setNav] = useState("overview");
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members,setMembers] = useState([])
  const { projectId } = useParams();
  const location  = useLocation()
  const navigate = useNavigate()
  const OwnerId =location.state?.OwnerId || null
  useEffect(() => {
    console.log(OwnerId, "OwnerId inside TasksPage");
  }, [OwnerId]);

  const [project, setProject] = useState(null);

  const fetchProject = async () => {
    try {
      if (!projectId) throw new Error("Project ID is required");
      const response = await userAxiosInstance.get(`/projects/${projectId}`);

    console.log("Fetching project with ID:", projectId);
      if (response.data.project) {
        setProject(response.data.project);
        console.log(response.data.project,'checking owner')
       
        setMembers(response.data.project.members);
     
      } else {
        console.warn("No project data found in the response");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          navigate("*"); 
        } else if (error.response.status === 401) {
          console.warn("Unauthorized access - Check if token is valid");
        } else {
          console.error("Error fetching project", error);
        }
      } else {
        console.error("Error fetching project", error);
      }
    }
     
    
    
    finally {
      setLoading(false);
    }
  };
  // const fetchProject = async () => {
  //   try {
  //     if (!projectId) throw new Error("Project ID is required");
  
  //     const response = await userAxiosInstance.get(`/projects/${projectId}`);
  
  //     if (response.status === 401) {
  //       console.warn("Unauthorized access. Redirecting to login.");
  //       // Handle unauthorized access without force logging out
  //       // Example: Redirect to a different page instead of logging out
  //       return;
  //     }
  
  //     if (response.data.project) {
  //       setProject(response.data.project);
  //       setMembers(response.data.project.members);
  //     } else {
  //       console.warn("No project data found in the response");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching project:", error);
  //     if (error.response?.status === 403) {
  //       console.warn("Access denied. Redirecting...");
  //       navigate("/home"); // Redirect to a safe page instead of logging out
  //     }
  
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchTasks = async()=>{
    try {
      if(!projectId)throw new Error('project not found')
        const response = await userAxiosInstance.get(`/projects/${projectId}/tasks`)
    
      setTasks(response.data.tasks)
    } catch (error) {
      console.error('error fetching tasks',error);
      
    }
  }
  // useEffect(()=>{
  //   fetchTasks()
  // },[projectId])
  useEffect(() => {
    fetchTasks()
    const interval = setInterval(fetchTasks, 10000) 
    
    return () => clearInterval(interval) 
  }, [projectId])
  
 const calculateProgress = () => {
  if (!tasks.length) return { completed: 0, inProgress: 0 ,pending:0 };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'ongoing').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  return {
    completed: (completedTasks / totalTasks) * 100,
    inProgress: (inProgressTasks / totalTasks) * 100,
    pending: (pendingTasks / totalTasks) * 100,  
  };
};


  const { completed, inProgress,pending } = calculateProgress();


  
  
  

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2); 
    return `${day}-${month}-${year}`;
  };

  const rows = members.map(member => ({
    id: member._id, 
    email: member.email, 
  }));

  const columns = [
    { field: 'email', headerName: 'Member ', flex: 1 },
  ];


  return (
    <Box
      sx={{
        backgroundColor:'#0f172a',
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        overflowX: "hidden",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <SideBar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "10px", md: "20px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "90%",
        }}
      >
        <Container
          sx={{
            flexGrow: 1,
            padding: { xs: "10px", md: "15px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "flex-start",
            backgroundColor: '#1e293b',
            backdropFilter: "blur(20px)",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
            borderRadius: "15px",
            height: { xs: "auto", md: "90vh" },
            marginTop: "30px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
              marginBottom: 3,
              fontFamily: "Poppins",
              padding: { xs: "0 20px", md: "0 30px" },
            }}
          >
            <Typography variant="h4" sx={{ color: '#357793' ,fontFamily:'poppins'}}>
              {loading
                ? "Loading Project..."
                : project
                ? project.projectName
                : "Project Not Found"}
            </Typography>
          </Box>

          <Box
            sx={{
              width: "90%",
              backgroundColor: "white",
              borderRadius: 2,
              p: { xs: 1, md: 1 },
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container
              maxWidth={false}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                p: 0,
                width: "90%",
              }}
            >
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
                    gap: { xs: 1, md: 2 },
                  }}
                >
                  <ListItem disablePadding>
                    <Button
                      variant="text"
                      fullWidth
                      sx={{
                        justifyContent: "start",
                        width: { xs: "100%", md: "auto" },
                        py: 1,
                        px: 2,
                        color: nav === "overview" ? '#357793' : '#357793',
                        bgcolor:
                          nav === "overview" ? "blue.100" : "transparent",
                        borderBottom:
                          nav === "overview" ? "2px solid #357793" : "none",

                        "&:focus": { outline: "none" },
                        "&:hover": { bgcolor: "blue.600" },
                        "&:active": { outline: "none", boxShadow: "none" },
                        "&:focus-visible": { outline: "none" },
                        // "&:hover": { bgcolor: "blue.200" },
                        borderRadius: 1,
                      }}
                      onClick={() => {
                        setNav("overview");
                        setMobileDropdown(!mobileDropdown);
                      }}
                    >
                      Overview
                    </Button>
                  </ListItem>
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
                        color: nav === "task" ? '#357793' : '#357793',
                        bgcolor: nav === "task" ? "blue.700" : "transparent",
                        borderBottom:
                          nav === "task" ? "2px solid #357793" : "none",
                        borderRadius: 1,

                        "&:focus": { outline: "none" },
                        // "&:hover": { bgcolor: "blue.600" },
                        "&:active": { outline: "none", boxShadow: "none" },
                        "&:focus-visible": { outline: "none" },
                        "&:hover": { bgcolor: "blue.600" },
                      }}
                      onClick={() => {
                        setNav("task");
                        setMobileDropdown(!mobileDropdown);
                      }}
                    >
                      Task
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Container>
          </Box>

        

<Box sx={{ width: "100%", mt: 3, p: { xs: 2, md: 3 } }}>
  {nav === "overview" ? (
    <>
    
      <Box sx={{ display: "flex", gap: "16px" }}> 
      
        <Box
          sx={{
            flex: 1, 
            height: "57vh",
            backgroundColor: '#fff',
            backdropFilter: "blur(10px)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
            marginTop: { xs: "20px", md: "8px" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{color:'#357793', fontSize:'125%',fontFamily:'poppins',}}>Project Progress</Typography>
          </Box>
          <ProgressionChart completed={completed} inProgress={inProgress} pending={pending} />
        </Box>

       
        <Box
          sx={{
            flex: 1, 
            height: "55vh",
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
            marginTop: { xs: "20px", md: "8px" },
            marginRight:'30px'
          }}
        >
           <Typography variant="h4" sx={{ color:  '#357793',fontSize:'250%',fontFamily:'poppins' }}>
              {loading
                ? "Loading Project..."
                : project
                ? project.projectName
                : "Project Not Found"}
            </Typography>
            <Typography variant="h7" sx={{fontFamily:'poppins',fontWeight:"bold"}}> {loading
                ? "Loading Project..."
                : project
                ? (  <>
                  <span style={{ color: 'green' }}>{formatDate(project.fromDate)}</span>
                  <span style={{ color: '#357793' }}> to </span>
                  <span style={{ color: 'red' }}>{formatDate(project.toDate)}</span>
                </>)
                : ("Project Not Found")}</Typography>

<Typography sx={{ color: '#357793', fontSize: '30px', fontFamily: 'poppins', marginTop: '30px' }}>Members on project</Typography>

<Box sx={{ height: '200px', width: '100%', marginTop: '20px' ,backgroundColor:'#fff'}}>
  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5, 10, 20]}
    disableSelectionOnClick
  />
</Box>
        </Box>
      </Box>
    </>
  ) : (
    // <Task projectId={projectId} tasks={tasks} />
    <TaskPage projectId={projectId} members={members} OwnerId = {OwnerId}/>
  //   <Box
  //   sx={{
  //     flex: 1, // Allows it to take equal space
  //     height: "55vh", // Adjust height to match sibling
  //     backgroundColor: "#1e293b",
  //     backdropFilter: "blur(10px)",
  //     padding: "2px",
  //     borderRadius: "3px",
  //     boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
  //     marginTop: { xs: "20px", md: "8px" },
  //    marginRight:'50px',
  //     overflow: "hidden", // Prevents unnecessary scrolling
  //   }}
  // >
  //   <TaskListRough />
  // </Box>
  
   
  )}
</Box>


          
        </Container>
      </Box>
    </Box>
  );
};

export default ProjectsOverview;


















