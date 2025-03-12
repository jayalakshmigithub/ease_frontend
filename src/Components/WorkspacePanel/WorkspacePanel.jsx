import { Box, Container, fontSize, margin, width } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import MembersList from "../MembersList";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  Hidden,
} from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { GrProjects } from "react-icons/gr";
import AddIcon from "@mui/icons-material/Add";
import InviteMembers from "../InviteMembers";
import { BsListCheck } from "react-icons/bs";
import dayjs from "dayjs";
import { Divider } from "@mui/material";
import { keyframes } from "@mui/system";
import { toast } from "react-toastify";
import SideBar from "../SideBar";
import { FaEdit } from "react-icons/fa";
import EditProjectModal from "../NewProject/EditProject";

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
  const [members, setMembers] = useState([]);
  const [workspaceMembers, setWorkspaceMembers] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [SelectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditProject = (project) => {
    setEditProject(project);
    setOpenEditModal(true);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 4;

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    currentPage * projectsPerPage + projectsPerPage
  );

  const handleOpenModal = (projectId) => {
    console.log("projectid", projectId);
    setSelectedProject(projectId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
      console.log(response.data.workspace, "response.data.workspace");
      setOwnerId(response.data.workspace.OwnerId);
      setWorkspaceMembers(response.data.workspace.members);
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

      const today = dayjs().format("YYYY-MM-DD");

      const currentUserId = userId;

      // const userProjects = response.data.projects.filter((project) => {
      //   console.log("Project Members:", project.members);
      //   return (
      //     project.members.some((member) => member._id === currentUserId) ||
      //     OwnerId === currentUserId
      //   );
      // });
      const userProjects = response.data.projects
        .filter((project) => {
          return (
            project.members.some((member) => member._id === currentUserId) ||
            OwnerId === currentUserId
          );
        })
        .map((project) => {
          const projectDeadline = dayjs(project.toDate).format("YYYY-MM-DD");
          return {
            ...project,
            status: projectDeadline < today ? "Closed" : "Active",
          };
        });

      console.log("User Projects:", userProjects);

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

  // const handleProject = (projectId) => {
  //   navigate(`/projects/${projectId}`);
  // };

  const handleProject = (projectId) => {
    const today = dayjs().format("YYYY-MM-DD");

    const project = projects.find((proj) => proj._id === projectId);
    if (!project) {
      toast.error("Project not found.");
      return;
    }

    const projectDeadline = dayjs(project.toDate).format("YYYY-MM-DD");

    if (projectDeadline < today && OwnerId !== userId) {
      console.log(OwnerId, "owner");
      toast.error("Deadline expired. Only the workspace owner has access.");
      return;
    }
console.log('ownerid before navigating',OwnerId)
    navigate(`/projects/${projectId}`,{state:{OwnerId:OwnerId}});
  };

  useEffect(() => {
    console.log("Projects state after update:", projects);
  }, [projects]);

  const handleAddMember = async (member, projectId) => {
    try {
      const project = projects.find((proj) => proj._id === projectId);

      if (!project) {
        toast.error("Project not found", { autoClose: 1000 });
        return;
      }

      const isWorkspaceOwner = OwnerId === userId;

      if (!isWorkspaceOwner) {
        toast.error("Only workspace owner can add members", {
          autoClose: 1000,
        });
        return;
      }

      const isMemberExists = project.members.some(
        (existingMember) => existingMember.email === member.email
      );

      if (isMemberExists) {
        toast.error(
          `Member already exists in project: ${project.projectName}`,
          { autoClose: 1000 }
        );
        return;
      }

      const response = await userAxiosInstance.post("/projects/addmembers", {
        projectId,
        memberEmails: [member.email],
      });

      if (response.status === 200) {
        toast.success(
          `Member added to project: ${response.data.project.projectName}`,
          { autoClose: 1000 }
        );

        const updatedProjects = projects.map((proj) =>
          proj._id === projectId ? response.data.project : proj
        );
        setProjects(updatedProjects);
      }
    } catch (error) {
      console.error("Error adding member to the project:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message, { autoClose: 1000 });
      } else {
        toast.error("Failed to add member.", { autoClose: 1000 });
      }
    }
  };
  useEffect(() => {
    if (workspace && projects) {
      const projectMembers = new Set();
      projects.forEach((project) =>
        project.members.forEach((member) => projectMembers.add(member._id))
      );

      const availableMembers = workspace.members.filter(
        (member) => !projectMembers.has(member._id)
      );

      setAvailableMembers(availableMembers);
    }
  }, [workspace, projects]);

  const StyledButton = styled(Button)(({ theme }) => ({
    position: "relative",
    display: "inline-block",
    padding: "15px 30px",
    border: "2px solid #fefefe",
    textTransform: "uppercase",
    color: "#1e293b",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "20px",
    backgroundColor: "#1e293b",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "6px",
      left: "-2px",
      width: "calc(100% + 4px)",
      height: "calc(100% - 12px)",
      backgroundColor: "#1e293b",
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
      backgroundColor: "#1e293b",
      transition: "0.3s ease-in-out",
      transform: "scaleX(1)",
      transitionDelay: "0.5s",
      zIndex: 0,
    },
    "&:hover::after": {
      transform: "scaleX(0)",
    },
    "&:hover": {
      color: "#1e293b",
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
        backgroundColor: "#0f172a",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Hidden smDown>
        <Navbar />
      </Hidden>

      <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "row" }}>
        <SideBar />

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
          <Container>
            <InviteMembers
              workspace={workspaceId}
              open={openInvite}
              onClose={handleCloseInvite}
            />
          </Container>

          {/* Project Section */}
          {/* <Box sx={{display:'flex',flexDirection:'row'}}> */}
          <Container
            sx={{
              maxWidth: "100%",
              backgroundColor: "#1e293b",
              backdropFilter: "blur(12px)",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              marginTop: "8px",
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
                    color: "#318CE7",
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
                  color: "#fff",
                }}
              >
                <BsListCheck
                  style={{
                    marginRight: "12px",
                    fontSize: "30px",
                    color: "#fff",
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
                  color: "grey",
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
                        color: "#318CE7",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 0",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#0f172a",
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
                                color: "#fff",
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
                      {OwnerId === userId && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditProject(project);
                          }}
                          sx={{ minWidth: 0 }}
                        >
                          <FaEdit size={21} color="#fff" />
                        </Button>
                      )}

                      <Typography
                        sx={{
                          fontSize: "18px",
                          color:
                            project.status === "Active"
                              ? "#357793"
                              : project.status === "Closed"
                              ? "#357793"
                              : "grey",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        {project.status}
                      </Typography>

                      {/* <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(project._id);
                        }}
                        sx={{
                          padding: "8px 16px",
                          fontSize: "15px",
                          backgroundColor: "#fff",
                          marginRight: "8px",
                          color:'#0f172a',
                          "&:hover": { backgroundColor: "#fff" },
                        }}
                      >
                        <AddIcon sx={{ marginRight: "8px" }} />
                        Add Members
                      </Button> */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(project._id);
                        }}
                        sx={{
                          fontFamily: " sans-serif poppins",
                          fontWeight: "600",
                          padding: "8px 16px",
                          fontSize: "15px",
                          backgroundColor: "#fff",
                          marginRight: "8px",
                          color: "#0f172a",
                          "&:hover": { backgroundColor: "#fff" },
                        }}
                      >
                        {/* <AddIcon sx={{ marginRight: "8px" }} /> */}
                        Manage
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                  </Box>
                ))
              ) : (
                <Typography variant="body1">No projects found.</Typography>
              )}
            </List>
            {openEditModal && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <EditProjectModal
                  project={editProject}
                  onClose={() => setOpenEditModal(false)}
                  onUpdate={fetchProjects}
                />
              </LocalizationProvider>
            )}

            {/* Pagination */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
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

          {/* </Box> */}

          <MembersList
            open={isModalOpen}
            onClose={handleCloseModal}
            members={workspaceMembers}
            onAddMember={(member) => handleAddMember(member, SelectedProject)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkspacePanel;

//workinggg

// useEffect(() => {
//   if (
//     workspace?.members?.length > 0 &&
//     Array.isArray(projects) &&
//     projects.length > 0
//   ) {
//     const projectMembers = new Set();
//     projects.forEach((project) =>
//       project.members.forEach((member) => projectMembers.add(member._id))
//     );

//     const availableMembers = workspace.members.filter(
//       (member) => !projectMembers.has(member._id)
//     );

//     console.log("Calculated availableMembers:", availableMembers);
//     setAvailableMembers(availableMembers);
//   }
// }, [workspace, projects]);

// const getAvailableMembers = (workspace, projects) => {
//   if (!workspace || !workspace.members || !projects) return [];

//   const projectMembers = new Set(
//     projects.flatMap((project) => project.members.map((m) => m._id))
//   );

//   return workspace.members.filter(
//     (member) => !projectMembers.has(member._id)
//   );
// };

// useEffect(() => {
//   const members = getAvailableMembers(workspace, projects);
//   console.log("Calculated availableMembers:", members);
//   setAvailableMembers(members);
// }, [workspace, projects]);

// console.log("Rendered availableMembers:", availableMembers);

{
  /* <Container
          sx={{
            width:'35%',
            // maxWidth: "50%",
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
                  fontSize: "5px",
                }}
              />
              Members
            </Typography>
  
           
          </Box>
  
          <List>
  {availableMembers.length > 0 ? (
    availableMembers.map((member) => ( 
      <Box key={member._id}>
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
                  {member.email}
                </Typography>
              }
            />
          </ListItem>

          <Button
            sx={{
              fontSize: "15px",
              color: "#357793",
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            Add
          </Button>
          
        </Box>
    <Typography variant="body1">No members available.</Typography>
  )}
</List>

  
         
       
        </Container>  */
}

{
  /* <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
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
          </Box> */
}

{
  /* <Button
                  
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 ,}}
          onClick={handleShowMembers}
        >
          {showMembers ? "Hide Members" : "Show Members"}
        </Button> */
}
{
  /* {showMembers && (
        <Container sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Workspace Members:
          </Typography>
          <List>
            {workspaceMembers.length > 0 ? (
              workspaceMembers.map((member) => (
                <ListItem key={member._id}>
                  <ListItemText
                    primary={`${member.name} (${member.email})`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No members found in this workspace.</Typography>
            )}
          </List>
        </Container>
      )} */
}
