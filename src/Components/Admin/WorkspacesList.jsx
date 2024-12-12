import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminSideBar from "./AdminSideBar";
import { adminAxiosInstance } from "../../utils/api/axiosInstance";
import { toast } from "react-toastify";
import { FaCrown } from "react-icons/fa6";
import { MdOutlineWorkspaces } from "react-icons/md";
import { GrProjects } from "react-icons/gr";

// const WorkspaceList = () => {
//   const [workspace, setWorkspace] = useState([]);
//   const [user, setUser] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const theme = useTheme();
//   const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // For tablets and up
//   const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

//   const fetchWorkspaceInAdmin = async () => {
//     try {
//       console.log("in fetcworkspaceDMIN FN");
//       const response = await adminAxiosInstance.get("/workspacelist");
//       return response.data;
//     } catch (error) {
//       console.log("error in workspace list", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const getWorkspaces = async () => {
//       try {
//         setLoading(true);
//         const workspaceData = await fetchWorkspaceInAdmin();
//         setWorkspace(workspaceData);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to load workspaces. Please try again later.");
//         setLoading(false);
//         toast.error(error.message || "Error fetching workspaces");
//       }
//     };
//     getWorkspaces();
//   }, []);

//   // const fetchWorkspaceInAdmin = async () => {
//   //   try {
//   //     console.log("Fetching workspace list in admin...");
//   //     const response = await adminAxiosInstance.get("/workspacelist");
//   //     console.log("Response data:", response.data);
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Error in fetching workspace list", error);
//   //     throw error;
//   //   }
//   // };

//   // useEffect(() => {
//   //   const getWorkspaces = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const workspaceData = await fetchWorkspaceInAdmin();
//   //       setWorkspace(workspaceData);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error("Caught error in useEffect:", error);
//   //       setError("Failed to load workspaces. Please try again later.");
//   //       setLoading(false);
//   //       toast.error(error.message || "Error fetching workspaces");
//   //     }
//   //   };
//   //   getWorkspaces();
//   // }, []);

//   const columns = [
//     {
//       field: "name",
//       headerName: "Workspace Name",
//       width: isSmDown ? 150 : 250,
//       renderHeader: () => (
//         <Box
//           style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}
//         >
//           <span>
//             {" "}
//             <MdOutlineWorkspaces /> Workspace Name
//           </span>
//         </Box>
//       ),
//     },
//     {
//       field: "owner",
//       headerName: "Owner",
//       width: isSmDown ? 150 : 250,
//       renderHeader: () => (
//         <Box
//           style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}
//         >
//           <span>
//             <FaCrown /> Owner
//           </span>
//         </Box>
//       ),
//       renderCell: (params) => {
//         const ownerId = params.row.OwnerId;
//         return (
//           <Typography>
//             {ownerId && ownerId.name ? ownerId.name : "Owner not available"}
//           </Typography>
//         );
//       },
//     },
//     {
//       field: "projects",
//       width: isSmDown ? 150 : 250,
//       renderHeader: () => (
//         <Box
//           style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}
//         >
//           <span>
//             <GrProjects /> projects{" "}
//           </span>
//         </Box>
//       ),
//     },
//     // { field: "action", headerName: "Action", width: 250 ,
//     //   renderHeader: () => (
//     //     <Box style={{ color: '#734128', fontSize:'18px', fontFamily:"poppins" }}>
//     //       <span><VscSettingsGear /> Actions </span>
//     //     </Box>
//     //   ),
//     //   renderCell:(params)=>{
//     //     const isBlocked = params.row.isBlocked
//     //     const userId = params.row._id

//     //     const handleAction =()=>{
//     //       console.log('inn handle action',userId)

//     //       if(isBlocked){
//     //         handleUnblock(userId)
//     //       }else{
//     //         handleBlock(userId)
//     //       }
//     //     }

//     //     return (
//     //      <Button variant="contained"
//     //      color={isBlocked ? "secondary" : "primary"}
//     //      onClick={handleAction}>
//     //     {isBlocked ? "Unblock" :"Block"}
//     //      </Button>

//     //     )

//     //   }

//     // },
//     // {field:"isBlocked",
//     //   headerName:'Status',
//     //   width:250,
//     //   renderHeader: () => (
//     //     <Box style={{ color: '#734128', fontSize:'18px', fontFamily:"poppins" }}>
//     //       <span><FaBarsProgress /> Status </span>
//     //     </Box>
//     //   ),
//     //   renderCell: (params) => (
//     //     <span>{params.row.isBlocked ? "Blocked" : "Active"}</span>
//     //   ),
//     // }
//   ];

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#F6F5EC",
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         boxSizing: "border-box",
//         overflowX: "hidden",
//         flexDirection: isMdUp ? "row" : "column",
//       }}
//     >
//       <AdminSideBar />
//       <Box
//         sx={{
//           flexGrow: 1,
//           padding: isSmDown ? "10px" : "20px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: isSmDown ? "stretch" : "flex-start",
//         }}
//       >
//         <Container
//           sx={{
//             width: "100%",
//             backgroundColor: "transparent",
//             backdropFilter: "blur(20px)",
//             boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
//             borderRadius: "15px",
//             height: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <Typography variant={isSmDown ? "h6" : "h4"}  gutterBottom sx={{ color: "#7B7369" }}>
//             workspace Management
//           </Typography>

//           <Box style={{ height: 400, width: "100%" }}>
//             {loading ? (
//               <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 sx={{
//                   flexGrow: 1,
//                   padding: "20px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <CircularProgress sx={{ color: "brown" }} />
//               </Box>
//             ) : error ? (
//               <Typography variant="h4" color="error">
//                 {error}
//               </Typography>
//             ) : workspace ? (
//               // <Grid container spacing={3}>
//               //   {workspace.map((workspace)=>(
//               //     <Grid item xs ={12} sm={6} md ={4} key={workspace._id}>
//               //       <Paper elevation={3} sx={{padding :2}}>
//               //         <Typography variant="h6" sx={{fontFamily:'poppins',color:'black'}}>{workspace.name}</Typography>
//               //         <Typography variant="h6"> {workspace.OwnerId ? workspace.OwnerId.name : 'Owner not available'}</Typography>
//               //         {console.log('owner name',workspace.OwnerId?.name)}

//               //       </Paper>

//               //     </Grid>
//               //   ))}

//               // </Grid>
//               <DataGrid
//                 sx={{
//                   padding: "18px",
//                   borderRadius: "10px",
//                   fontFamily: "poppins",
//                   fontSize: isSmDown ? "12px" : "14px",
//                 }}
//                 rows={workspace}
//                 columns={columns}
//                 pageSize={isSmDown ? 3 : 5} 
//                 rowsPerPageOptions={[5]}
//                 disableSelectionOnClick
//                 getRowId={(row) => row._id}
//                 pagination
//               />
//             ) : (
//               <Typography variant="h4">No workspace found</Typography>
//             )}
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

const WorkspaceList = () => {
  const [workspace, setWorkspace] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); 
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm")); 

  const fetchWorkspaceInAdmin = async () => {
    try {
      const response = await adminAxiosInstance.get("/workspacelist");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        setLoading(true);
        const workspaceData = await fetchWorkspaceInAdmin();
        setWorkspace(workspaceData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load workspaces. Please try again later.");
        setLoading(false);
        toast.error(error.message || "Error fetching workspaces");
      }
    };
    getWorkspaces();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Workspace Name",
      width: isSmDown ? 150 : 250,
      renderHeader: () => (
        <Box style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}>
          <MdOutlineWorkspaces /> Workspace Name
        </Box>
      ),
    },
    {
      field: "owner",
      headerName: "Owner",
      width: isSmDown ? 150 : 250,
      renderHeader: () => (
        <Box style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}>
          <FaCrown /> Owner
        </Box>
      ),
      renderCell: (params) => {
        const ownerId = params.row.OwnerId;
        return (
          <Typography noWrap>
            {ownerId && ownerId.name ? ownerId.name : "Owner not available"}
          </Typography>
        );
      },
    },
    {
      field: "projects",
      headerName: "Projects",
      width: isSmDown ? 100 : 250,
      renderHeader: () => (
        <Box style={{ color: "#734128", fontSize: "18px", fontFamily: "poppins" }}>
          <GrProjects /> Projects
        </Box>
      ),
      renderCell: (params) => {
        const projectCount = params.row.projects?.length || 0;
        return (
          <Typography
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: isSmDown ? "12px" : "14px", 
              maxWidth: isSmDown ? "80px" : "200px", 
            }}
          >
            {projectCount > 0
              ? `${projectCount} Project${projectCount > 1 ? "s" : ""}`
              : "No Projects"}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#F6F5EC",
        width: "100vw",
        height: "100vh",
        display: "flex",
        boxSizing: "border-box",
        overflowX: "hidden",
        flexDirection: isMdUp ? "row" : "column",
      }}
    >
      <AdminSideBar />
      <Box
        sx={{
          flexGrow: 1,
          padding: isSmDown ? "10px" : "20px", 
          display: "flex",
          justifyContent: "center",
          alignItems: isSmDown ? "stretch" : "flex-start", 
        }}
      >
        <Container
          sx={{
            width: "100%",
            backgroundColor: "transparent",
            backdropFilter: "blur(20px)",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
            borderRadius: "15px",
            height: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography
            variant={isSmDown ? "h6" : "h4"}
            gutterBottom
            sx={{ color: "#7B7369", textAlign: isSmDown ? "center" : "left" }}
          >
            Workspace Management
          </Typography>

          <Box style={{ height: isSmDown ? 300 : 400, width: "100%" }}>
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  flexGrow: 1,
                  padding: "20px",
                }}
              >
                <CircularProgress sx={{ color: "brown" }} />
              </Box>
            ) : error ? (
              <Typography variant="h6" color="error" textAlign="center">
                {error}
              </Typography>
            ) : workspace ? (
              <DataGrid
                sx={{
                  padding: "18px",
                  borderRadius: "10px",
                  fontFamily: "poppins",
                  fontSize: isSmDown ? "12px" : "14px", 
                }}
                rows={workspace}
                columns={columns}
                pageSize={isSmDown ? 3 : 5} 
                rowsPerPageOptions={[3, 5]}
                disableSelectionOnClick
                getRowId={(row) => row._id}
                pagination
              />
            ) : (
              <Typography variant="h6" textAlign="center">
                No workspace found
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default WorkspaceList;
