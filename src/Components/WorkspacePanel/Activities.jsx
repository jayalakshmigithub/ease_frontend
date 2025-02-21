import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Divider,
  Stack,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Delete,
  Groups,
  Work,
  Assignment,
  People,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
  import Hidden from "@mui/material/Hidden";
import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar';
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import MembersPanel from "./MembersPanel";
import { useParams } from "react-router-dom";

const Activities = () => {
  // const userInfo = useSelector((state) => state?.user?.userInfo?.user);
  // const userId = userInfo?._id;
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [workspaceCount, setworkspaceCount] = useState(0);
  const [projectCount,setProjectsCount] = useState(0)
  const [tasksCount,setTasksCount] = useState(0)
  const [projects,setProjects] = useState([])
  const [OwnerId, setOwnerId] = useState(null);
  const{ workspaceId }= useParams()
  console.log("Fetching projects for workspaceId:", workspaceId);


  // Track Sidebar Collapse State
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const summaryData = [
    { title: "Workspaces", value: workspaceCount, icon: <Work fontSize="large" /> },
    { title: "Projects", value: projectCount, icon: <Assignment fontSize="large" /> },
    { title: "Tasks", value: tasksCount, icon: <Groups fontSize="large" /> },
  ];

  const transactionData = [
    { name: "John Doe", date: "Jan 10", status: "Done", amount: "$100" },
    { name: "Project X", date: "Jan 9", status: "Pending", amount: "$200" },
    { name: "Workspace A", date: "Jan 8", status: "Done", amount: "$150" },
  ];

  const upcomingPayments = [
    { name: "Stripe Membership", date: "Today", amount: "$50" },
    { name: "Figma Subscription", date: "Jan 25", amount: "$20" },
    { name: "Workspace Premium", date: "Jan 30", amount: "$100" },
  ];

  const workspaces = async()=>{
    const response = await userAxiosInstance.get('/workspaces')
    console.log(response.data)
    setworkspaceCount(response.data.workspace.length)
    setProjects(response.data.workspace.projects)
    const totalProjects = response.data.workspace.reduce((sum, ws) => sum + ws.projects.length, 0);
setProjectsCount(totalProjects);
const totalTasks = response.data.workspace.reduce((total,workspace)=> total + workspace.tasks.length,0)
setTasksCount(totalTasks)

  }
  useEffect(()=>{
workspaces()
  },[])

  const fetchProjects = async () => {
    try {
      if (!workspaceId || typeof workspaceId !== "string") {
        console.error("Invalid workspaceId:", workspaceId);
        return;
    }
      const response = await userAxiosInstance.get(`/workspaces/${workspaceId}/projects`);
      const allProjects = response.data
      
      // const allProjects = response.data.projects.map((project) => ({
      //   name: project.projectName,
      //   members: project.members.length, 
      //   deadline: project.deadline || "No deadline", 
      //   tasks: project.tasks.length, 
      // }));
      console.log(allProjects,'allProjects')
      setProjects(allProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(()=>{
    
    fetchProjects()
  },[workspaceId])
  

  return (
    <Box
      sx={{
        backgroundColor: "#0f172a",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* Navbar */}
      <Box>
        <Navbar />
      </Box>

      {/* Main Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSm ? "column" : "row",
          flexGrow: 1,
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: isSm ? "100%" : isSidebarCollapsed ? "80px" : "250px",
            flexShrink: 0,
            transition: "width 0.3s ease",
          }}
        >
          <SideBar onCollapse={(collapsed) => setSidebarCollapsed(collapsed)} />
        </Box>

        {/* Dashboard Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            transition: "margin-left 0.3s ease",
          }}
        >
        
          {/* Top Summary Cards */}
          <Grid container spacing={4}>
            {summaryData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#1e293b",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box>{item.icon}</Box>
                  <Box textAlign="right">
                    <Typography variant="h5" fontWeight="bold">
                      {item.value}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {item.title}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <MembersPanel/>
          </Grid> */}

          {/* Transactions and Payments Section */}
          <Grid container spacing={4}>
          
            {/* <Grid item xs={12} md={6}>
  <Card
    sx={{
      p: 2,
      borderRadius: "16px",
      backgroundColor: "#1e293b",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      height: "100%",
    }}
  >
    <Typography variant="h6" fontWeight="bold" gutterBottom color="white">
      Projects
    </Typography>
    <Divider sx={{ mb: 2, bgcolor: "white" }} />
    
    
    <Stack sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "300px" }}>
      {projects.map((project, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            p: 1,
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#8a9098" },
          }}
        >
          <Box>
           
            <Typography fontWeight="bold" color="white">{project.name}</Typography>
           
            <Typography variant="caption" color="gray">
              Deadline: {project.deadline}
            </Typography>
          </Box>

         
          <Box textAlign="right">
            <Typography variant="body2" color="white">
              Members: {project.members}
            </Typography>
            <Typography variant="body2" color="white">
              Tasks: {project.tasks}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Stack>

  
    <Button fullWidth sx={{ mt: 2, color: "white", borderColor: "white" }} variant="outlined">
      View All
    </Button>
  </Card>
</Grid> */}


            {/* Upcoming Payments */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  backgroundColor: "#1e293b",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Upcoming Payments
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {upcomingPayments.map((item, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      p: 1,
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#8a9098" },
                    }}
                  >
                    <Box>
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.date}
                      </Typography>
                    </Box>
                    <Typography>{item.amount}</Typography>
                  </Stack>
                ))}
                <Button fullWidth sx={{ mt: 2 }} variant="outlined">
                  View All
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};



export default Activities
