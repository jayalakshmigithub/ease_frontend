import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import SideBar from "./SideBar";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  CircularProgress
} from "@mui/material";
import { userAxiosInstance } from "../utils/api/axiosInstance";
import { Container } from "@mui/system";
import CreateWorkspaceForm from "./CreateWorkspace";
import { useSelector } from "react-redux";
import WorkspaceList from "./WorkspaceList";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Workspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [workspaces, setWorkspaces] = useState([]);
  const [sharedWorkspaces, setSharedWorkspaces] = useState([]);
  const [OpenCreateWorkspace, setOpenCreateWorkspace] = useState(false);
  const [nav, setNav] = useState("board");
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [filteredWorkspaces, setFilteredWorkspaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading] = useState(true)

  const handleInvitation = async () => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const workspaceId = query.get("workspaceId");
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





  
  const userInfo = useSelector((state) => state?.user?.userInfo?.user);

  const fetchWorkspaces = async () => {
    setLoading(true);
    try {
      const response = await userAxiosInstance.get("/workspaces", {
        withCredentials: true,
      });
      const userWorkspaces = response.data.workspace || [];
      const userSharedWorkspace = response.data.sharedWorkspace || [];

      setWorkspaces(userWorkspaces);
      setSharedWorkspaces(userSharedWorkspace);
      setFilteredWorkspaces(userWorkspaces);
      console.log(userWorkspaces, "userWorkspaces");
    } catch (error) {
      if(error.response && error.response.status==404 || error.response.status === 403){
        toast.error(error.response.data.message)
      }
      console.error("Error fetching workspaces:", error);
    }
    finally {
      setLoading(false); 
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = workspaces.filter((workspace) =>
      workspace.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredWorkspaces(filtered);
  };

  const handleSort = (field) => {
    const sortedWorkspaces = [...filteredWorkspaces].sort((a, b) => {
      if (field === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return a[field].localeCompare(b[field]);
      }
    });
    setFilteredWorkspaces(sortedWorkspaces);
  };

  // const handleDelete = async (workspaceId) => {
  //   try {
  //     await userAxiosInstance.delete(`/workspaces/${workspaceId}`, { withCredentials: true });
  //     setWorkspaces((prev) => prev.filter((workspace) => workspace._id !== workspaceId));
  //     setFilteredWorkspaces((prev) => prev.filter((workspace) => workspace._id !== workspaceId));
  //   } catch (error) {
  //     console.error('Error deleting workspace:', error);
  //   }
  // };
  const handleDelete = (workspaceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this workspace?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        userAxiosInstance
          .delete(`/workspaces/${workspaceId}`, { withCredentials: true })
          .then(() => {
            setWorkspaces((prev) =>
              prev.filter((workspace) => workspace._id !== workspaceId)
            );
            setFilteredWorkspaces((prev) =>
              prev.filter((workspace) => workspace._id !== workspaceId)
            );
            Swal.fire("Deleted!", "The workspace has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting workspace:", error);
            Swal.fire("Error!", "Failed to delete the workspace.", "error");
          });
      }
    });
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <>
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
          flexDirection: "column",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <Navbar />
        {/* <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexGrow: 1,
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "250px" }, flexShrink: 0 }}>
            <SideBar />
          </Box>
          <Container
            sx={{
              marginTop: "20px",
              backgroundColor: "transparent",
              backdropFilter: "blur(10px)",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
              maxWidth: "600px",
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
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "12px",
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
                        borderBottom:
                          nav === "board" ? "2px solid #357793" : "none",
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
                        borderBottom:
                          nav === "list" ? "2px solid #357793" : "none",
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

            {nav === "board" ? (
            
<>
  {loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Adjust to fit your layout
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Box sx={{ padding: "20px" }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-start",
            color: "#2A5175",
          }}
        >
          Your Workspaces
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {workspaces?.length > 0 ? (
            workspaces.map((workspace) => (
              <Card
                key={workspace._id}
                sx={{
                  width: 320,
                  borderRadius: "12px",
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-3px)",
                  },
                  bgcolor: "background.paper",
                }}
                onClick={() => handleWorkspacePanel(workspace._id)}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: "primary.main",
                      mb: 1,
                    }}
                  >
                    {workspace.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.6 }}
                  >
                    {workspace.description || "No description available"}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                      }}
                    >
                      Created at:{" "}
                      {new Date(workspace.createdAt).toLocaleDateString()}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "medium",
                        color: "text.primary",
                      }}
                    >
                      Owner: {workspace.OwnerId?.name || "Unassigned"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography sx={{ textAlign: "center" }} variant="body1">
              No workspaces found.
            </Typography>
          )}

          <Card
            sx={{
              width: 320,
              borderRadius: "12px",
              boxShadow: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 120,
              cursor: "pointer",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-3px)",
              },
            }}
            onClick={handleOpenCreateWorkspace}
          >
            <Typography variant="h6" color="primary">
              + Create New Workspace
            </Typography>
          </Card>
        </Box>
      </Box>

      {/* Shared Workspaces Section */}
      <Box sx={{ marginTop: "40px", padding: "20px" }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-start",
            color: "#2A5175",
          }}
        >
          Shared Workspaces
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {sharedWorkspaces?.length > 0 ? (
            sharedWorkspaces.map((workspace) => (
              <Card
                key={workspace._id}
                sx={{
                  width: 320,
                  borderRadius: "12px",
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-3px)",
                  },
                  bgcolor: "background.paper",
                }}
                onClick={() => handleWorkspacePanel(workspace._id)}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: "primary.main",
                      mb: 1,
                    }}
                  >
                    {workspace.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.6 }}
                  >
                    {workspace.description || "No description available"}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                      }}
                    >
                      Created at:{" "}
                      {new Date(workspace.createdAt).toLocaleDateString()}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "medium",
                        color: "text.primary",
                      }}
                    >
                      Owner: {workspace.OwnerId?.name || "Unassigned"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No shared workspaces found.</Typography>
          )}
        </Box>
      </Box>

      {/* Create Workspace Form Modal */}
      <CreateWorkspaceForm
        open={OpenCreateWorkspace}
        onClose={handleCloseCreateWorkspace}
        setWorkSpace={(newWorkspace) =>
          setWorkspaces((prev) => [...prev, newWorkspace])
        }
        fetchWorkspaces={fetchWorkspaces}
        existingWorkspaceNames={workspaces.map((workspace) => workspace.name)}
      />
    </>
  )}
</>

          

            ) : (
              <WorkspaceList
                workspaces={filteredWorkspaces}
                searchTerm={searchTerm}
                onSearch={handleSearch}
                onDelete={handleDelete}
                handleSort={handleSort}
              />
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Workspace;
