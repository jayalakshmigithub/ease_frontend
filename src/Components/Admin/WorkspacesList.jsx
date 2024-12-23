import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Container,
  TextField,
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



const WorkspaceList = () => {
  const [workspace, setWorkspace] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalWorkspace, setOriginalWorkspace] = useState([]); 

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
        setOriginalWorkspace(workspaceData); 
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
  
 
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  
 
    if (term === "") {
      setWorkspace(originalWorkspace);
    } else {
      
      const filteredWorkspaces = originalWorkspace.filter((workspace) =>
        workspace.name.toLowerCase().includes(term)
      );
      setWorkspace(filteredWorkspaces); 
    }
  };
  

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
          <TextField
           label="Search workspace"
           variant="outlined"
           fullWidth
           margin="normal"
           value={searchTerm}
           onChange={handleSearch}
          />

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












 // useEffect(() => {
  //   const getWorkspaces = async () => {
  //     try {
  //       setLoading(true);
  //       const workspaceData = await fetchWorkspaceInAdmin();
  //       setWorkspace(workspaceData);
  //       setLoading(false);
  //     } catch (error) {
  //       setError("Failed to load workspaces. Please try again later.");
  //       setLoading(false);
  //       toast.error(error.message || "Error fetching workspaces");
  //     }
  //   };
  //   getWorkspaces();
  // }, []);
  // const handleSearch = (event) => {
  //   const term = event.target.value.toLowerCase();
  //   setSearchTerm(term);
  
   
  //   const filteredWorkspaces = workspace.filter((workspace) =>
  //     workspace.name.toLowerCase().includes(term)
  //   );
  //   setWorkspace(filteredWorkspaces); 
  // };