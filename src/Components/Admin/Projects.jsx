

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminSideBar from "./AdminSideBar";
import { adminAxiosInstance } from "../../utils/api/axiosInstance";

import { toast } from "react-toastify";

import { FaCrown } from "react-icons/fa6";
import { MdOutlineWorkspaces } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { MdOutlineUpdate } from "react-icons/md";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  
  const fetchProjectInAdmin = async () => {
    try {
      const response = await adminAxiosInstance.get("/projectlist");
      return response.data;
    } catch (error) {
      console.log("error in projectlist ", error);
      throw error;
    }
  };

  useEffect(() => {
    const getProjectsList = async () => {
      try {
        setLoading(true);
        const projectData = await fetchProjectInAdmin();
        setProjects(projectData);
        setFilteredProjects(projectData); 
        setLoading(false);
      } catch (error) {
        setError("Failed to load workspaces. Please try again later.");
        setLoading(false);
        toast.error(error.message || "Error fetching workspaces");
      }
    };
    getProjectsList();
  }, []);

 
  const columns = [
    {
      field: "projectName",
      headerName: "Project Name",
      width: 250,
      renderHeader: () => (
        <Box style={{ color: '#734128', fontSize: '18px', fontFamily: "poppins" }}>
          <span><MdOutlineWorkspaces /> Project Name</span>
        </Box>
      ),
    },
    {
      field: "workspaceName",
      headerName: "Workspace Name",
      width: 250,
      renderHeader: () => (
        <Box style={{ color: '#734128', fontSize: '18px', fontFamily: "poppins" }}>
          <span><FaCrown /> Workspace</span>
        </Box>
      ),
      renderCell: (params) => (
        <Typography>{params.row.workspaceName || 'No workspace'}</Typography>
      ),
    },
    {
      field: "members",
      headerName: "Members",
      width: 250,
      renderHeader: () => (
        <Box style={{ color: '#734128', fontSize: '18px', fontFamily: "poppins" }}>
          <span><GrProjects /> Members</span>
        </Box>
      ),
      renderCell: (params) => (
        <Typography>
          {params.row.members.length > 0
            ? params.row.members.map((member) => member.email || "Unknown").join(", ")
            : "No members"}
        </Typography>
      ),
    },
    {
      field: "fromDate",
      headerName: "Started at",
      width: 250,
      renderHeader: () => (
        <Box style={{ color: '#734128', fontSize: '18px', fontFamily: "poppins" }}>
          <span><MdOutlineUpdate /> Started at</span>
        </Box>
      ),
      renderCell: (params) => (
        <Typography>{new Date(params.row.fromDate).toLocaleDateString() || "invalid date"}</Typography>
      ),
    },
  ];

  
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

   
    const filtered = projects.filter((project) =>
      project.projectName.toLowerCase().includes(term) ||
      project.workspaceName.toLowerCase().includes(term) ||
      project.members.some((member) =>
        member.email.toLowerCase().includes(term)
      )
    );

    setFilteredProjects(filtered);
  };

  return (
    <Box
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
        <Container sx={{
          width: "100%",
          backgroundColor: "transparent",
          backdropFilter: "blur(20px)",
          boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
          borderRadius: '15px',
          height: '90vh'
        }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#7B7369' }}>
            Project Management
          </Typography>

         
          <TextField
            label="Search Projects"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            sx={{ marginBottom: '20px' }}
          />

          <Box style={{ height: 400, width: "100%" }}>
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  flexGrow: 1,
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <CircularProgress sx={{ color: 'brown' }} />
              </Box>
            ) : error ? (
              <Typography variant="h4" color="error">
                {error}
              </Typography>
            ) : filteredProjects.length > 0 ? (
              <DataGrid
                sx={{
                  padding: "18px",
                  borderRadius: "10px",
                  fontFamily: "poppins",
                }}
                rows={filteredProjects}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                getRowId={(row) => row._id}
              />
            ) : (
              <Typography variant="h4">No projects found</Typography>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Projects;



