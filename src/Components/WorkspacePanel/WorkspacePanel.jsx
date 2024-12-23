import { Box, Container, margin, width } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import {
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { GrProjects } from "react-icons/gr";
import AddIcon from "@mui/icons-material/Add";
import InviteMembers from "../InviteMembers";
import { MdOutlineDescription } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { BsListCheck } from "react-icons/bs";
import dayjs from "dayjs";
import { Divider } from "@mui/material";
import { keyframes } from "@mui/system";

const WorkspacePanel = () => {
  const userInfo = useSelector((state) => state?.user?.userInfo?.user);
  
  const userId = userInfo?._id;
  const location = useLocation();
  const [workspace, setWorkspace] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openInvite, setOpenInvite] = useState(false);
  const [OwnerId, setOwnerId] = useState(null);

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

  const navigate = useNavigate();

  const formattedDate = dayjs(projects.toDate).format("YYYY-MM-DD");

  const handelOpenInvite = () => {
    setOpenInvite(true);
  };
  const handleCloseInvite = () => {
    setOpenInvite(false);
  };
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

      setWorkspace(response.data.workspace);
      setOwnerId(response.data.workspace.OwnerId);

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
    const token = query.get("token");
    // const workspaceId = query.get('workspaceId');
    const encryptedEmail = query.get("email");

    if (token && workspaceId && encryptedEmail) {
      try {
        await userAxiosInstance.post(
          "/invite",
          { token, workspaceId, encryptedEmail },
          { withCredentials: true }
        );
        console.log("workspaceid", workspaceId);

        navigate("/workspace");
      } catch (error) {
        console.error("Error processing invitation:", error);
      }
    }
  };

  useEffect(() => {
    handleInvitation();
  }, [location.search]);

  const fetchProjects = async () => {
    try {
      const response = await userAxiosInstance.get(
        `/workspaces/${workspaceId}/projects`
      );

      const currentUserId = userId;

      const userProjects = response.data.projects.filter(
        (project) =>
          project.members.some((member) => member._id === currentUserId) ||
          OwnerId === currentUserId
      );

      setProjects(userProjects);
      console.log("User Projects:", userProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [workspaceId, OwnerId, userId]);

  const handleProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };


  const StyledButton = styled(Button)(({ theme }) => ({
    position: "relative",
    display: "inline-block",
    padding: "15px 30px",
    border: "2px solid #fefefe",
    textTransform: "uppercase",
    color: "#fefefe",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "20px",
    backgroundColor: "transparent",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "6px",
      left: "-2px",
      width: "calc(100% + 4px)",
      height: "calc(100% - 12px)",
      backgroundColor: "#88AED0",
      transition: "0.3s ease-in-out",
      transform: "scaleY(1)",
      zIndex: 1,
    },
    "&:hover::before": {
      transform: "scaleY(0)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: "6px",
      top: "-2px",
      height: "calc(100% + 4px)",
      width: "calc(100% - 12px)",
      backgroundColor: "#88AED0",
      transition: "0.3s ease-in-out",
      transform: "scaleX(1)",
      transitionDelay: "0.5s",
      zIndex: 0,
    },
    "&:hover::after": {
      transform: "scaleX(0)",
    },
    "&:hover": {
      color: "white",
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


  return (
    <Box
      className="homepage"
      sx={{
        backgroundImage: `
        radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
            radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
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
          width: { xs: "100%", md: "260px" },
          flexShrink: 0,
          boxShadow: { md: "4px 0px 10px rgba(0, 0, 0, 0.05)" },
        }}
      />
      
  
    
      <Box
        sx={{
          flexGrow: 1,
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
       
        {/* Workspace Section */}
        <Container
          sx={{
            maxWidth: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
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
                  fontFamily: "Poppins",
                  display: "flex",
                  alignItems: "center",
                  color: "#2A5175",
                  mb: "5px",
                }}
              >
                <VscWorkspaceTrusted
                  style={{ marginRight: "12px", fontSize: "36px" }}
                />
                {workspace.name}
              </Typography>
            ) : (
              <Typography variant="h4">No workspace found</Typography>
            )}
  
            <StyledButton
              component="a"
              href="#"
              onClick={handelOpenInvite}
              sx={{
                padding: "8px 16px",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                backgroundColor: "#357793",
                color: "white",
                "&:hover": {
                  backgroundColor: "#2A5175",
                },
              }}
            >
              <AddIcon sx={{ marginRight: "8px" }} />
              <span style={{ position: "relative", zIndex: 3 }}>
               Invite members
             </span>
            </StyledButton>
          </Box>
  
          <InviteMembers
            workspace={workspaceId}
            open={openInvite}
            onClose={handleCloseInvite}
          />
        </Container>
  
        {/* Project Section */}
        <Container
          sx={{
            maxWidth: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
            marginTop: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Poppins",
                display: "flex",
                alignItems: "center",
                color: "#2A5175",
              }}
            >
              <BsListCheck
                style={{
                  marginRight: "12px",
                  fontSize: "30px",
                }}
              />
              List of Projects
            </Typography>
  
            <Typography
              sx={{
               textAlign: "right",
               paddingRight: "30px",
               animation: `${jumpAnimation} 2s ease-in-out infinite`,
              fontSize: "20px",
              color:'grey'
           }}
          >
             * select a project for details
           </Typography>
          </Box>
  
          {/* Project List */}
          <List>
            {currentProjects.length > 0 ? (
              currentProjects.map((project) => (
                <Box key={project._id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#F9FAFC",
                        borderRadius: "8px",
                      },
                    }}
                    onClick={() => handleProject(project._id)}
                  >
                    <ListItem sx={{ width: "75%" }}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "500",
                              color: "#2A5175",
                            }}
                          >
                            {project.projectName}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{ fontSize: "16px", color: "grey" }}
                          >
                            {project.Description}
                          </Typography>
                        }
                      />
                    </ListItem>
  
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: project.status ? "#357793" : "grey",
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                    >
                      {project.status ? "Active" : "Pending"}
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                </Box>
              ))
            ) : (
              <Typography variant="body1">No projects found.</Typography>
            )}
          </List>
  
          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              variant="contained"
            >
              Previous
            </Button>
            <Typography>
              Page {currentPage + 1} of {totalPages}
            </Typography>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              variant="contained"
            >
              Next
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
  
};

export default WorkspacePanel;
