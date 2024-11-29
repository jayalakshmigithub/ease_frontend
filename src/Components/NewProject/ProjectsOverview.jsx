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
// import { workspaceById } from "../../../../ease_backend/src/repository/workspaceRepository";
import { useParams } from "react-router-dom";
import ProgressionChart from "../Charts/ProgressionChart";
import { DataGrid } from '@mui/x-data-grid';
import TaskPage from "../Tasks/TaskPage";


// const ProjectsOverview = () => {
//   const [tasks, setTasks] = useState([]);
//   const [nav, setNav] = useState("overview");
//   const [mobileDropdown, setMobileDropdown] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { projectId } = useParams();
//   console.log('Fetching project with ID:', projectId);

//   const [projects, setProjects] = useState(null);
//    const {ProjectId} = useParams()
//   const fetchProject = async()=>{
//     try {
//       if (!projectId) throw new Error("Project ID is required");
//       const response = await userAxiosInstance.get(`/projects/${projectId}`)
//       console.log('dhhf',response.data)
//       if (response.data.project) {

//         setProjects(response.data.project);
//         console.log('Fetched projects:', response.data.project);
//       } else {
//         console.warn('No projects data found in the response');
//       }

//     } catch (error) {
//       console.error('error in fetching projects',error);

//     }
//   }
//   useEffect(()=>{
//     fetchProject()
//   },[projectId])

//   // const fetchProjects = async()=>{
//   //   try {
//   //     if(!projectId){
//   //       throw new Error ("invalid project Id")
//   //     }
//   //     const response = await userAxiosInstance.get(`/projects/${projectId}`)
//   //     console.log('response',response)
//   //     setProjects(response.data.projects)
//   //     console.log('projects',response.data.projects)
//   //   } catch (error) {
//   //     console.error('error fetching projects',error);

//   //   }

//   // }
//   // useEffect(()=>{
//   //   fetchProjects()
//   // },[projectId])

//   // return (
//   //   <Box
//   //     sx={{
//   //       backgroundImage: `
//   //         radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
//   //         radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%)
//   //       `,
//   //       width: "100vw",
//   //       minHeight: "100vh",
//   //       display: "flex",
//   //       boxSizing: "border-box",
//   //       overflowX: "hidden",
//   //       backgroundSize: "cover",
//   //       backgroundRepeat: "no-repeat",
//   //     }}
//   //   >
//   //     <Box sx={{ flexShrink: 0 }}>
//   //       <SideBar />
//   //     </Box>

//   //     <Box
//   //       sx={{
//   //         flexGrow: 1,
//   //         padding: { xs: "10px", md: "20px" },
//   //         display: "flex",
//   //         justifyContent: "center",
//   //         alignItems: "flex-start",
//   //         width:'100%'
//   //       }}
//   //     >
//   //       <Container
//   //         sx={{
//   //           flexGrow: 1,
//   //           padding: { xs: "10px", md: "15px" },
//   //           display: "flex",
//   //           flexDirection: "column",
//   //           justifyContent: "left",
//   //           alignItems: "flex-start",
//   //           backgroundColor: "transparent",
//   //           backdropFilter: "blur(20px)",
//   //           boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
//   //           borderRadius: "15px",
//   //           height: { xs: "auto", md: "90vh" },
//   //           marginTop: "30px",
//   //           width: "100%",
//   //         }}
//   //       >
//   //         <Box
//   //           sx={{
//   //             display: "flex",
//   //             justifyContent: "flex-start",
//   //             fontFamily: "Poppins",
//   //             marginLeft: "20px",
//   //           }}
//   //         >
//   //           <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
//   //             Tasks Overview
//   //           </Typography>

//   //           <Box
//   //             className="Navigator"
//   //             sx={{ mt: { xs: 5, md: 10 }, textAlign: "end" ,}}
//   //           >
//   //             <Container
//   //               maxWidth={false}
//   //               sx={{
//   //                 width: "100%",
//   //                 p: 0,
//   //                 p: 4,
//   //                 display: "flex",
//   //                 justifyContent: "center",

//   //               }}
//   //             >
//   //               <Box
//   //                 sx={{
//   //                   display: {
//   //                     xs: mobileDropdown ? "block" : "none",
//   //                     md: "block",
//   //                   },
//   //                   width: { xs: "100%", md: "auto" },
//   //                   height: { xs: "auto", md: "2rem" },
//   //                 }}
//   //                 id="navbar-default"
//   //               >
//   //                 <List
//   //                   sx={{
//   //                     display: "flex",
//   //                     flexDirection: { xs: "column", md: "row" },
//   //                     p: { xs: 4, md: 3 },
//   //                     mt: 4,
//   //                     border: 1,
//   //                     borderColor: "grey.100",
//   //                     borderRadius: 2,
//   //                     bgcolor: "grey.50",
//   //                     width:'100%'
//   //                     // "&.MuiList-root": {
//   //                     //   md: {
//   //                     //     flexDirection: "row",
//   //                     //     gap: 2,
//   //                     //     mt: 0,
//   //                     //     border: 0,
//   //                     //     bgcolor: "transparent",
//   //                     //   },
//   //                     // },
//   //                   }}
//   //                 >
//   //                   <ListItem disablePadding>
//   //                     <Button
//   //                       variant="text"
//   //                       fullWidth
//   //                       sx={{
//   //                         justifyContent: "start",
//   //                         py: 1,
//   //                         px: 2,
//   //                         color:
//   //                           nav === "overview" ? "blue.700" : "text.primary",
//   //                         bgcolor:
//   //                           nav === "overview" ? "blue.700" : "transparent",
//   //                         "&:hover": { bgcolor: "blue.600" },
//   //                         borderRadius: 1,
//   //                       }}
//   //                       onClick={() => {
//   //                         setNav("overview");
//   //                         setMobileDropdown(!mobileDropdown);
//   //                       }}
//   //                     >
//   //                       Overview
//   //                     </Button>
//   //                   </ListItem>
//   //                   <ListItem disablePadding>
//   //                     <Button
//   //                       variant="text"
//   //                       fullWidth
//   //                       sx={{
//   //                         justifyContent: "start",
//   //                         py: 1,
//   //                         px: 2,
//   //                         color: nav === "task" ? "blue.700" : "text.primary",
//   //                         bgcolor: nav === "task" ? "blue.700" : "transparent",
//   //                         "&:hover": { bgcolor: "blue.600" },
//   //                         borderRadius: 1,
//   //                       }}
//   //                       onClick={() => {
//   //                         setNav("task");
//   //                         setMobileDropdown(!mobileDropdown);
//   //                       }}
//   //                     >
//   //                       Task
//   //                     </Button>
//   //                   </ListItem>
//   //                 </List>
//   //               </Box>
//   //             </Container>
//   //           </Box>
//   //         </Box>
//   //       </Container>
//   //     </Box>
//   //   </Box>
//   // );

//   return (
//     <Box
//       sx={{
//         backgroundImage: `
//           radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
//           radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%)
//         `,
//         width: "100vw",
//         minHeight: "100vh",
//         display: "flex",
//         boxSizing: "border-box",
//         overflowX: "hidden",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <Box sx={{ flexShrink: 0 }}>
//         <SideBar />
//       </Box>

//       <Box
//         sx={{
//           flexGrow: 1,
//           padding: { xs: "10px", md: "20px" },
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "flex-start",
//           width: "90%",
//         }}
//       >
//         <Container
//           sx={{
//             flexGrow: 1,
//             padding: { xs: "10px", md: "15px" },
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "left",
//             alignItems: "flex-start",
//             backgroundColor: "transparent",
//             backdropFilter: "blur(20px)",
//             boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
//             borderRadius: "15px",
//             height: { xs: "auto", md: "90vh" },
//             marginTop: "30px",
//             width: "100%",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "90%",
//               marginBottom: 3,
//               fontFamily: "Poppins",
//               padding: { xs: "0 20px", md: "0 30px" },
//             }}
//           >
//             <Typography variant="h4" sx={{ color: "#fff" }}>
//               {projects ? projects.projectName : "Loading Project..."}
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               width: "90%",
//               backgroundColor: "white",
//               borderRadius: 2,
//               p: { xs: 1, md: 1 },
//               boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Container
//               maxWidth={false}
//               sx={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "flex-start",
//                 p: 0,
//                 width: "90%",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: {
//                     xs: mobileDropdown ? "block" : "none",
//                     md: "flex",
//                     flexDirection: { xs: "column", md: "row" },
//                   },
//                   width: { xs: "100%", md: "auto" },
//                 }}
//                 id="navbar-default"
//               >
//                 <List
//                   sx={{
//                     display: "flex",
//                     flexDirection: { xs: "column", md: "row" },
//                     width: "90%",
//                     p: 0,
//                     gap: { xs: 1, md: 2 }
//                   }}
//                 >
//                   <ListItem disablePadding>
//                     <Button
//                       variant="text"
//                       fullWidth
//                       sx={{
//                         justifyContent: "start",
//                         width: { xs: "100%", md: "auto" },
//                         py: 1,
//                         px: 2,
//                         color: nav === "overview" ? "blue.700" : "text.primary",
//                         bgcolor:
//                           nav === "overview" ? "blue.100" : "transparent",
//                         borderBottom:
//                           nav === "overview" ? "2px solid blue" : "none",

//                         "&:focus": { outline: "none" },
//                         "&:hover": { bgcolor: "blue.600" },
//                         "&:active": { outline: "none", boxShadow: "none" },
//                         "&:focus-visible": { outline: "none" },
//                         "&:hover": { bgcolor: "blue.200" },
//                         borderRadius: 1,
//                       }}
//                       onClick={() => {
//                         setNav("overview");
//                         setMobileDropdown(!mobileDropdown);
//                       }}
//                     >
//                       Overview
//                     </Button>
//                   </ListItem>
//                   <ListItem disablePadding>
//                     <Button
//                       variant="text"
//                       fullWidth
//                       disableRipple
//                       sx={{
//                         justifyContent: "start",
//                         width: { xs: "100%", md: "auto" },
//                         py: 1,
//                         px: 2,
//                         color: nav === "task" ? "blue.700" : "text.primary",
//                         bgcolor: nav === "task" ? "blue.700" : "transparent",
//                         borderBottom:
//                           nav === "task" ? "2px solid blue" : "none",
//                         borderRadius: 1,

//                         "&:focus": { outline: "none" },
//                         "&:hover": { bgcolor: "blue.600" },
//                         "&:active": { outline: "none", boxShadow: "none" },
//                         "&:focus-visible": { outline: "none" },
//                         "&:hover": { bgcolor: "blue.600" },
//                       }}
//                       onClick={() => {
//                         setNav("task");
//                         setMobileDropdown(!mobileDropdown);
//                       }}
//                     >
//                       Task
//                     </Button>
//                   </ListItem>
//                 </List>
//               </Box>
//             </Container>
//           </Box>
//           <Box
//           sx={{
//             overflow: "auto",
//             maxHeight: "80vh",  // Adjust this value based on your layout needs
//             mt: 3,
//             width: "100%",
//           }}
//         >
//           {nav === "overview" && <ProjectsOverview projects={projects} />}
//           {nav === "task" && <TaskCmp projectId={details._id} />}
//         </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

const ProjectsOverview = () => {
  const [tasks, setTasks] = useState([]);
  const [nav, setNav] = useState("overview");
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members,setMembers] = useState([])
  const { projectId } = useParams();

  const [project, setProject] = useState(null);

  const fetchProject = async () => {
    try {
      if (!projectId) throw new Error("Project ID is required");
      const response = await userAxiosInstance.get(`/projects/${projectId}`);
      if (response.data.project) {
        setProject(response.data.project);
        console.log('Fetched projects:', response.data.project);
        setMembers(response.data.project.members);
        // setTasks(response.data.project.tasks)
        // console.log('tasksss',response.data.project.tasks)
      } else {
        console.warn("No project data found in the response");
      }
    } catch (error) {
      console.error("Error fetching project", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchTasks = async()=>{
    try {
      if(!projectId)throw new Error('project not found')
        const response = await userAxiosInstance.get(`/projects/${projectId}/tasks`)
      console.log('response in task page ', response.data)
      setTasks(response.data.tasks)
    } catch (error) {
      console.error('error fetching tasks',error);
      
    }
  }
  useEffect(()=>{
    fetchTasks()
  },[projectId,tasks])
 const calculateProgress = () => {
  if (!tasks.length) return { completed: 0, inProgress: 0 };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'ongoing').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;

  return {
    completed: (completedTasks / totalTasks) * 100,
    inProgress: (inProgressTasks / totalTasks) * 100,
    pending: (pendingTasks / totalTasks) * 100,  
  };
};


  const { completed, inProgress,pending } = calculateProgress();

// will change 
  // const fetchMembers = async (projectId) => {
  //   try {
  //     if (!projectId) throw new Error("Project ID is required");
  
      
  //     const response = await userAxiosInstance.get(`/projects/${projectId}/members`);
  //     console.log('members response',response)
  
  //     if (response.data.members) {
  //       setMembers(response.data.members);
  //       console.log('Fetched members:', response.data.members);
  //     } else {
  //       console.warn("No members data found in the response");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching project members", error);
  //     setError(error.message); 
  //   } finally {
  //     setLoading(false); 
  //   }
  // };
  
  // useEffect(() => {
  //   fetchMembers(projectId);
  // }, [projectId]);


  // const fetchMembers = async (projectId) => {
  //   try {
  //     if (!projectId) throw new Error("Project ID is required");
  
  //     setLoading(true); // Set loading state to true at the start
  
  //     const response = await userAxiosInstance.get(`/projects/${projectId}/members`);
  //     console.log('members response', response);
  
  //     // Check if response data has a valid members array
  //     if (Array.isArray(response.data.members) && response.data.members.length > 0) {
  //       setMembers(response.data.members);
  //       console.log('Fetched members:', response.data.members);
  //     } else {
  //       console.warn("No members data found in the response");
  //       setMembers([]); // Reset members to an empty array if no members are found
  //     }
  //   } catch (error) {
  //     console.error("Error fetching project members:", error.response || error);
  //     setError(error.message); // Handle error state
  //   } finally {
  //     setLoading(false); // Set loading state to false when done
  //   }
  // };
  
  // useEffect(() => {
  //   if (projectId) {
  //     fetchMembers(projectId); // Fetch members when projectId is provided
  //   }
  // }, [projectId]);
  
  
  

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
        backgroundImage: `
          radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
          radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%)
        `,
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
            backgroundColor: "transparent",
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
            height: "55vh",
            backgroundColor: "transparent",
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

<Box sx={{ height: '200px', width: '100%', marginTop: '20px' }}>
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
    <TaskPage projectId={projectId} members={members}/>
   
  )}
</Box>


          
        </Container>
      </Box>
    </Box>
  );
};

export default ProjectsOverview;



















//   return (
//     <Box
//       sx={{
//         backgroundImage: `
//         radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
//         radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%)
//       `,
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         boxSizing: "border-box",
//         overflowX: "hidden",
//       }}
//     >
//       <SideBar
//         sx={{
//           backgroundColor: "white",
//           width: { xs: "100%", md: "250px" },
//           flexShrink: 0,
//         }}
//       />

//       <Box
//         sx={{
//           flexGrow: 1,
//           padding: "20px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "flex-start",
//         }}
//       >
//         <Container
//           sx={{
//             flexGrow: 1,
//             padding: "15px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "left",
//             alignItems: "flex-start",
//             backgroundColor: "transparent",
//             backdropFilter: "blur(20px)",
//             boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
//             borderRadius: "15px",
//             height: "90vh",
//             marginTop: "30px",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-start",
//               fontFamily: "Poppins",
//               marginLeft: "20px",
//             }}
//           >
//             <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
//               Tasks Overview
//             </Typography>
//           </Box>

//           <Box sx={{ flexGrow: 1, padding: "20px" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "20px",
//                 justifyContent: "flex-start",
//               }}
//             >
//               <Card
//                 sx={{
//                   minHeight: 265,
//                   minWidth: 335,
//                   maxWidth: "30%",
//                   cursor: "pointer",
//                   marginLeft: "30px",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: "15px",
//                   }}
//                 >
//                   <Typography sx={{marginLeft:'18px',marginTop:'6px'}}>Priority</Typography>
//                   <IconButton aria-label="more options" onClick={handleMenuClick}>
//           <MoreVertIcon />
//         </IconButton>
//                 </Box>

//                 <CardContent
//                   sx={{
//                     marginLeft: "8px",
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                      {/* <Box
//         sx={{
//           borderTop: '2px dotted #ccc',
//           width: '100%',
//           margin: '15px 0',
//         }}
//       ></Box> */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       width: "100%",
//                     }}
//                   >

//                     <Typography variant="h6" component="div">
//                       Task Name
//                     </Typography>
//                     <Typography variant="h6" component="div">
//                       Status
//                     </Typography>

//                   </Box>
//                   <Box
//         sx={{
//           borderTop: '2px dotted #ccc',
//           width: '100%',
//           margin: '15px 0',
//         }}
//       ></Box>
//                   <Typography color="text.secondary" component="div">
//                     Task description
//                   </Typography>
//                 </CardContent>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: "15px",
//                     marginTop: "auto",
//                   }}
//                 >
//                   <Button
//                     sx={{ color: "#333", fontSize: "12px" ,fontFamily:'poppins'}}
//                     startIcon={<FaRegEdit  sx={{color:'#333'}}/>}
//                   >
//                     Edit
//                   </Button>
//                 </Box>

//                 <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={() => handleMenuItemClick('Open Task')}>Open Task</MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick('Delete Task')}>Delete Task</MenuItem>
//       </Menu>
//               </Card>

//               {/* Card 2 */}
//               <Card
//                 sx={{
//                   minHeight: 265,
//                   minWidth: 335,
//                   maxWidth: "30%",
//                   cursor: "pointer",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     Task Name
//                   </Typography>
//                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     Task description
//                   </Typography>
//                 </CardContent>
//               </Card>

//               {/* Card 3 */}
//               <Card
//                 sx={{
//                   minHeight: 265,
//                   minWidth: 335,
//                   maxWidth: "30%",
//                   cursor: "pointer",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     Task Name
//                   </Typography>
//                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     Task description
//                   </Typography>
//                 </CardContent>
//               </Card>

//             </Box>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// return (
//     <Box sx={{ flexGrow: 1, padding: { xs: "10px", md: "20px" } }}>
//     <Grid
//       container
//       spacing={{ xs: 2, sm: 3, md: 5 }} // Adjust the spacing here for mid-size screens
//       sx={{ marginTop: '10px' }}
//     >
//       {/* Card 1 */}
//       <Grid item xs={12} sm={6} md={4}>
//         <Card
//           sx={{
//             minHeight: 265,
//             minWidth: 335,
//             maxWidth: "100%", // Ensures the card doesn't overflow
//             cursor: "pointer",
//             marginLeft: { xs: "0", md: "0" }, // No margin for consistency
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: "15px",
//             }}
//           >
//             <Typography sx={{ marginLeft: '18px', marginTop: '6px' }}>Priority</Typography>
//             <IconButton aria-label="more options" onClick={handleMenuClick}>
//               <MoreVertIcon />
//             </IconButton>
//           </Box>

//           <CardContent
//             sx={{
//               marginLeft: "8px",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 width: "100%",
//               }}
//             >
//               <Typography variant="h6" component="div">
//                 Task Name
//               </Typography>
//               <Typography variant="h6" component="div">
//                 Status
//               </Typography>
//             </Box>

//             <Box
//               sx={{
//                 borderTop: '2px dotted #ccc',
//                 width: '100%',
//                 margin: '15px 0',
//               }}
//             ></Box>

//             <Typography color="text.secondary" component="div">
//               Task description
//             </Typography>
//           </CardContent>

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: "15px",
//               marginTop: "auto",
//             }}
//           >
//             <Button
//               sx={{ color: "#333", fontSize: "12px", fontFamily: 'Poppins' }}
//               startIcon={<FaRegEdit sx={{ color: '#333' }} />}
//             >
//               Edit
//             </Button>
//           </Box>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={() => handleMenuItemClick('Open Task')}>Open Task</MenuItem>
//             <MenuItem onClick={() => handleMenuItemClick('Delete Task')}>Delete Task</MenuItem>
//           </Menu>
//         </Card>
//       </Grid>

//       {/* Card 2 */}
//       <Grid item xs={12} sm={6} md={4}>
//         <Card
//           sx={{
//             minHeight: 265,
//             minWidth: 335,
//             maxWidth: "100%",
//             cursor: "pointer",
//           }}
//         >
//           <CardContent>
//             <Typography variant="h5" component="div">
//               Task Name
//             </Typography>
//             <Typography sx={{ mb: 1.5 }} color="text.secondary">
//               Task description
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       {/* Card 3 */}
//       <Grid item xs={12} sm={6} md={4}>
//         <Card
//           sx={{
//             minHeight: 265,
//             minWidth: 335,
//             maxWidth: "100%",
//             cursor: "pointer",
//           }}
//         >
//           <CardContent>
//             <Typography variant="h5" component="div">
//               Task Name
//             </Typography>
//             <Typography sx={{ mb: 1.5 }} color="text.secondary">
//               Task description
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   </Box>

//   );

// import { FaRegEdit } from "react-icons/fa";
// import { CgMoreVertical } from "react-icons/cg";
// import { TfiMoreAlt } from "react-icons/tfi";
// import { color } from "framer-motion";
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const handleMenuClick = (event) => {
//   setAnchorEl(event.currentTarget);
// };

// const handleMenuItemClick = (option) => {
//   if (option === 'Open Task') {
//     console.log('Opening task...');
//   } else if (option === 'Delete Task') {
//     console.log('Deleting task...');
//   }
//   setAnchorEl(null);
// };

// const handleClose = () => {
//   setAnchorEl(null);
// };

{
  /* <Box sx={{ flexGrow: 1, padding: { xs: "10px", md: "20px" } }}>
<Grid
  container
  spacing={{ xs: 2, sm: 3, md: 5 }} 
  sx={{ marginTop: '10px' }}
>
 
  <Grid item xs={12} sm={6} md={4}>
    <Card
      sx={{
        minHeight: 265,
        minWidth: 335,
        maxWidth: "100%",
        cursor: "pointer",
        marginLeft: { xs: "0", md: "0" }, 
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <Typography sx={{ marginLeft: '18px', marginTop: '6px' }}>Priority</Typography>
        <IconButton aria-label="more options" onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <CardContent
        sx={{
          marginLeft: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h6" component="div">
            Task Name
          </Typography>
          <Typography variant="h6" component="div">
            Status
          </Typography>
        </Box>

        <Box
          sx={{
            borderTop: '2px dotted #ccc',
            width: '100%',
            margin: '15px 0',
          }}
        ></Box>

        <Typography color="text.secondary" component="div">
          Task description
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
          marginTop: "auto",
        }}
      >
        <Button
          sx={{ color: "#333", fontSize: "12px", fontFamily: 'Poppins' }}
          startIcon={<FaRegEdit sx={{ color: '#333' }} />}
        >
          Edit
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('Open Task')}>Open Task</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Delete Task')}>Delete Task</MenuItem>
      </Menu>
    </Card>
  </Grid>

 

 
</Grid>
</Box> */
}
