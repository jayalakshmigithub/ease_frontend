import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Button,
  Avatar,
  Paper,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import SideBar from "../SideBar";
import groupChat from "../../Assets/groupChat.png";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import config from "../../config/config";

const ChatComponent = () => {
  const user = useSelector((state) => state.user.userInfo?.user);

  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [members, setMembers] = useState([]);
  const [sharedWorkspaces, setSharedWorkspaces] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log(messages, "????");
  }, [messages]);

  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [selectedSharedWorkspace, setSelectedSharedWorkspace] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [chatRoom, setChatRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [currentChatRoomId, setCurrentChatRoomId] = useState("")
  const socket = io(config.API_URL);

  const handleWorkspaceChange = (event) => {
    const selectedWorkspaceId = event.target.value;

    console.log("Selected Workspace ID:", selectedWorkspaceId);

    if (workspaces.some((workspace) => workspace._id === selectedWorkspaceId)) {
      setSelectedWorkspace(selectedWorkspaceId);
      setSelectedSharedWorkspace("");
    } else if (
      sharedWorkspaces.some(
        (sharedWorkspace) => sharedWorkspace._id === selectedWorkspaceId
      )
    ) {
      setSelectedSharedWorkspace(selectedWorkspaceId);
      setSelectedWorkspace("");
    }
  };

  const checkChatRoomExistence = async () => {
    const workspaceId = selectedWorkspace || selectedSharedWorkspace;
    const projectId = selectedProject;

    if (workspaceId && projectId) {
      try {
        const response = await userAxiosInstance.get("/chat", {
          params: { workspaceId, projectId },
        });
        if (response.data.chatRoom) {
          setChatRoom(response.data.chatRoom);
          setOpen(true);
        } else {
          setChatRoom(null);
          setOpen(false);
        }
      } catch (error) {
        console.error("Error checking chat room:", error);
        setError("Failed to fetch chat room");
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("join-chat", currentChatRoomId);

      socket.on("receive-message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);  
      });

      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket]);

  useEffect(() => {
    if ((selectedWorkspace || selectedSharedWorkspace) && selectedProject) {
      checkChatRoomExistence();
      console.log("Selected Workspace:", selectedWorkspace);
      console.log("Selected Shared Workspace:", selectedSharedWorkspace);
    }
  }, [selectedWorkspace, selectedSharedWorkspace, selectedProject]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      console.log("Cannot send an empty message.");
      return;
    }

    const message = {
      senderId: user._id,
      message: newMessage.trim(),
      chatId: chatRoom._id,
      read: false,
    };

    setCurrentChatRoomId(chatRoom._id)

    try {
      const response = await userAxiosInstance.post("/messages", message);

      if (response.data && response.data.message) {
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
        console.log(response.data.message,'messages')
        const message = response.data.message
        setNewMessage("");
        socket.emit("send-message", {message
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const fetchWorkspaces = async () => {
    try {
      const response = await userAxiosInstance.get("/workspaces", {
        withCredentials: true,
      });
      console.log("responseee", response.data);
      const userWorkspaces = response.data.workspace || [];
      const userSharedWorkspace = response.data.sharedWorkspace || [];

      console.log("userSharedWorkspaces", userSharedWorkspace);
      console.log("Workspaces:", userWorkspaces);
      console.log("Shared Workspaces:", userSharedWorkspace);

      setSharedWorkspaces(userSharedWorkspace);
      setWorkspaces(userWorkspaces);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchProjects = async (workspaceId) => {
    try {
      const response = await userAxiosInstance.get(
        `/workspaces/${workspaceId}/projects`
      );
      console.log("response from projects", response);
      setProjects(response.data.projects);
      console.log("response.data.projects", response.data.projects);
      setMembers(response.data.members);
    } catch (error) {
      console.error("error fetching projects", error);
      setError("failed to fetch projects");
    }
  };

  // useEffect(() => {
  //   if (selectedWorkspace) {
  //     fetchProjects(selectedWorkspace);
  //   }
  // }, [selectedWorkspace]);
  useEffect(() => {
    if (selectedWorkspace) {
      setProjects([]);
      fetchProjects(selectedWorkspace);
    }
  }, [selectedWorkspace]);

  const createChatRoom = async (workspaceId, projectId) => {
    try {
      console.log("workspaceId, projectId, members", workspaceId, projectId);
      const response = await userAxiosInstance.post("/chat", {
        workspaceId,
        projectId,
      });
      const newChatRoom = response.data.chatRoom;
      setChatRoom(newChatRoom);
      console.log("Chat room created successfully:", newChatRoom);
      return newChatRoom;
    } catch (error) {
      console.error("Error creating chat room:", error);
      setError("Failed to create chat room");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      console.log(chatRoom, "chatRoom");

      try {
        const res = await userAxiosInstance.get(
          `/messages?chatId=${chatRoom._id}`
        );

        if (res.data && res.data.message) {
          setMessages((prevMessages) => [...prevMessages, ...res.data.message]);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (chatRoom) {
      fetchMessages();
    }
  }, [chatRoom]);

  const handleCreateChatRoom = async () => {
    const workspaceId = selectedWorkspace || selectedSharedWorkspace;
    const projectId = selectedProject;

    if (workspaceId && projectId) {
      if (!chatRoom) {
        await createChatRoom(workspaceId, projectId);
      } else {
        setOpen(true);
      }
    }
  };
  useEffect(() => {
    const workspaceId = selectedWorkspace || selectedSharedWorkspace;
    if (workspaceId) {
      console.log("Fetching projects for workspace:", workspaceId);
      fetchProjects(workspaceId);
    }
  }, [selectedWorkspace, selectedSharedWorkspace]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundImage: `
    radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
    radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
  `,
        overflowX: "hidden",
      }}
    >
      <Box sx={{ display: { xs: "none", md: "block" }, width: 250 }}>
        <SideBar />
      </Box>

     
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: 300,
          bgcolor: "#f0f0f0",
          p: 2,
          borderRight: "1px solid #ddd",
        }}
      >
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Select a Workspace</InputLabel>
          <Select
            label="Select a Workspace"
            value={selectedWorkspace || selectedSharedWorkspace || ""}
            onChange={handleWorkspaceChange}
          >
            <MenuItem value="" disabled>
              Choose a workspace
            </MenuItem>

            {workspaces.map((workspace) => (
              <MenuItem key={workspace._id} value={workspace._id}>
                {workspace.name}
              </MenuItem>
            ))}

            {sharedWorkspaces.length > 0 && (
              <MenuItem disabled key="sharedWorkspacesLabel">
                Shared Workspaces
              </MenuItem>
            )}
            {sharedWorkspaces.map((sharedWorkspace) => (
              <MenuItem key={sharedWorkspace._id} value={sharedWorkspace._id}>
                {sharedWorkspace.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Select a Project</InputLabel>
          <Select
            label="Select a Project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <MenuItem value="" disabled>
              Choose a project
            </MenuItem>
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.projectName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateChatRoom}
          sx={{ mt: 2 }}
        >
          {chatRoom ? "Open" : "Create Chat Room"}
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          bgcolor: "#e9e9e9",
          p: 2,
        }}
      >
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <ArrowBackIcon
            sx={{ display: { md: "none" }, mr: 1, cursor: "pointer" }}
          />
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>C</Avatar>
          <Typography variant="h6">{selectedProject.projectName}</Typography>
        </Box>

       
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            bgcolor: "#f9f9f9",
            p: 3,
            borderRadius: 2,
            maxHeight: "calc(100vh - 300px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {!open ? (
            <Box
              sx={{
                textAlign: "center",
                color: "grey.600",
                marginBottom: "80px",
              }}
            >
              <img
                src={groupChat}
                alt="No messages illustration"
                style={{ width: "30%", maxWidth: 300, marginBottom: 16 }}
              />
              <Typography variant="h6" color="textSecondary">
                No messages yet
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Start a conversation to see messages here.
              </Typography>
            </Box>
          ) : (
            <>
              {/* Display Messages */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "auto",
                }}
              >
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={
                      msg.senderId?._id === user._id ? "flex-end" : "flex-start"
                    }
                    mb={2}
                    sx={{
                      "&:last-child": { mb: 0 },
                      px: 2,
                    }}
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        borderRadius: "12px",
                        maxWidth: "70%",
                        bgcolor:
                          msg.senderId?._id === user._id
                            ? "primary.light"
                            : "grey.300",
                        color:
                          msg.senderId?._id === user._id
                            ? "primary.contrastText"
                            : "text.primary",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.75rem",
                            color:
                              messages.senderId?._id === user._id
                                ? "white"
                                : "textSecondary",
                          }}
                        >
                          {messages.senderId?._id === user._id
                            ? user.name
                            : msg?.senderId?.name}
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{ wordBreak: "break-word" }}
                        >
                          {msg.content}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          textAlign="right"
                          color="textSecondary"
                        >
                          {msg.time}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Message Box */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderTop: 1,
                  borderColor: "grey.300",
                  bgcolor: "#fff",
                  borderRadius: "0 0 12px 12px",
                }}
              >
                <TextField
                  variant="outlined"
                  label="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  fullWidth
                  sx={{ mr: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                  sx={{
                    width: "fit-content",
                    px: 3,
                    py: 1.5,
                  }}
                >
                  Send
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatComponent;

// useEffect(() => {
//   const createChatRoom = async () => {
//     try {
//       console.log(
//         "workspaceId, projectId, members",
//         selectedWorkspace,
//         selectedProject
//       );
//       const response = await userAxiosInstance.get("/chat", {
//         selectedWorkspace,
//         selectedProject,
//       });
//       const newChatRoom = response.data.chatRoom;
//       setChatRoom(newChatRoom);
//       console.log("Chat room created successfully:", newChatRoom);
//       return newChatRoom;
//     } catch (error) {
//       console.error("Error creating chat room:", error);
//       setError("Failed to create chat room");
//     }
//   };
//   createChatRoom();
// }, [selectedProject]);
