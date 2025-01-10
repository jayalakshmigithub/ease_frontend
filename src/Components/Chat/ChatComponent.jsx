import React, { useEffect, useRef, useState, useCallback } from "react";
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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SideBar from "../SideBar";
import groupChat from "../../Assets/groupChat.png";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import config from "../../config/config";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { CgAttachment } from "react-icons/cg";

const ChatComponent = () => {
  const user = useSelector((state) => state.user?.userInfo?.user);
  const [workspaces, setWorkspaces] = useState([]);
  const [sharedWorkspaces, setSharedWorkspaces] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [selectedSharedWorkspace, setSelectedSharedWorkspace] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [chatRoom, setChatRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [currentChatRoomId, setCurrentChatRoomId] = useState("");
  const [existingChatRooms, setExistingChatRooms] = useState([]);
  const socket = io(config.API_URL_SOCKET);
  const messageEndRef = useRef(null);
  const fetchChatRooms = async (workspaceId) => {
    try {
      const response = await userAxiosInstance.get(`/chatrooms/${workspaceId}`);
      console.log("resposnse.data", response.data);
      setExistingChatRooms(response.data);
    } catch (error) {
      console.error("Error fetching chatooms:", error);
      throw error;
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
      console.log('message in socket',messages)
      
      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket]);

  useEffect(() => {
    if ((selectedWorkspace || selectedSharedWorkspace) && selectedProject) {
      checkChatRoomExistence();
    }
  }, [selectedWorkspace, selectedSharedWorkspace, selectedProject]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    const message = {
      senderId: user?._id,
      message: newMessage.trim(),
      chatId: chatRoom._id,
      read: false,
      date: new Date().toISOString(),
    };
    console.log('messageeee',message)

    setCurrentChatRoomId(chatRoom._id);

    try {
      const response = await userAxiosInstance.post("/messages", message);

      if (response.data && response.data.message) {

        if (typeof response.data.message.senderId === "string") {
          response.data.message.senderId = {
            _id: response.data.message.senderId,
          };
        }
        console.log('response.data.message.senderId',response.data.message.senderId?.name)
        setMessages((prevMessages) => [...prevMessages, message]);
        const message = response.data.message;
        console.log(message,'message socket to send m=founcion')
        setNewMessage("");
        socket.emit("send-message", { message });
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
      const userWorkspaces = response.data.workspace || [];
      const userSharedWorkspace = response.data.sharedWorkspace || [];
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
      setProjects(response.data.projects);
      setMembers(response.data.members);
    } catch (error) {
      console.error("error fetching projects", error);
      setError("failed to fetch projects");
    }
  };

  const handleWorkspaceChange = (event) => {
    const selectedWorkspaceId = event.target.value;
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

  useEffect(() => {
    if (selectedWorkspace || selectedSharedWorkspace) {
      let workspace = selectedWorkspace || selectedSharedWorkspace;
      setProjects([]);
      fetchProjects(workspace);
      fetchChatRooms(workspace);
    }
  }, [selectedWorkspace, selectedSharedWorkspace]);

  const createChatRoom = async (workspaceId, projectId) => {
    try {
      const response = await userAxiosInstance.post("/chat", {
        workspaceId,
        projectId,
      });
      const newChatRoom = response.data.chatRoom;
      setChatRoom(newChatRoom);
      return newChatRoom;
    } catch (error) {
      console.error("Error creating chat room:", error);
      setError("Failed to create chat room");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
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
      fetchProjects(workspaceId);
    }
  }, [selectedWorkspace, selectedSharedWorkspace]);

  useEffect(() => {
    if (chatRoom && messages.length > 0) {
      const unreadMessageIds = messages
        .filter((msg) => !msg.read && msg.senderId?._id !== user?._id)
        .map((msg) => msg._id);

      if (unreadMessageIds.length > 0) {
        socket.emit("mark-as-read", {
          messageIds: unreadMessageIds,
          userId: user?._id,
        });
      }
    }
  }, [chatRoom, messages]);

  useEffect(() => {
    if (socket) {
      socket.on("message-read", (data) => {
        if (
          !data ||
          (!Array.isArray(data.messageIds) && !data.messageId) ||
          !data.readerId
        ) {
          console.error("Invalid payload:", data);
          return;
        }

        const messageIds = data.messageIds || [data.messageId];

        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((msg) =>
            messageIds.includes(msg._id)
              ? {
                  ...msg,
                  read: true,
                  readBy: [...(msg.readBy || []), data.readerId],
                }
              : msg
          );

          return updatedMessages;
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (messages.length > 0) {
      const timeout = setTimeout(() => {
        scrollToDown();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const scrollToDown = useCallback(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
        <Typography variant="h6" sx={{ mt: 3 }}>
          Chat Rooms
        </Typography>
        {existingChatRooms && existingChatRooms.chatRooms?.length > 0 ? (
          <List>
            {existingChatRooms.chatRooms.map((chatRoom) => (
              <ListItem
                key={chatRoom._id}
                sx={{
                  bgcolor: "#fff",
                  mb: 1,
                  boxShadow: 1,
                  borderRadius: "4px",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
                onClick={() => {
                  createChatRoom(
                    chatRoom.workspaceId,
                    chatRoom.projectId,
                    setOpen(true)
                  );
                }}
              >
                <ListItemText
                  sx={{ color: "black" }}
                  primary={`Project: ${chatRoom.projectId.projectName}`}
                  secondary={`Members: ${chatRoom.members.length}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" sx={{ color: "#999" }}>
            No chat rooms available.
          </Typography>
        )}
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
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 300px)",
                  width: "100%",
                  height: "auto",
                }}
              >
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={
                      msg.senderId?._id === user?._id
                        ? "flex-end"
                        : "flex-start"
                    }
                    mb={2}
                    sx={{ "&:last-child": { mb: 0 }, px: 2 }}
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        borderRadius: "12px",
                        maxWidth: "70%",
                        bgcolor:
                          msg.senderId?._id === user?._id
                            ? "primary.light"
                            : "grey.300",
                        color:
                          msg.senderId?._id === user?._id
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
                              msg.senderId?._id === user?._id
                                ? "white"
                                : "textSecondary",
                               
                          }}
                         
                        >
                          {msg.senderId?._id === user?._id
                            ? user?.name
                            : msg?.senderId?.name}
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{ wordBreak: "break-word" }}
                        >
                          {msg.content}
                        </Typography>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.75rem", color: "textSecondary" }}
                          >
                            {msg.createdAt
                              ? (() => {
                                  const parsedDate = new Date(msg.createdAt);
                                  if (isNaN(parsedDate.getTime()))
                                    return "Invalid Date";
                                  return parsedDate.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  });
                                })()
                              : "Invalid Date"}
                          </Typography>

                          <Box ml={1}>
                            {msg.senderId?._id === user?._id ? (
                              msg.readBy?.length > 0 ? (
                                <DoneAllIcon
                                  sx={{ fontSize: "1rem", color: "blue" }}
                                />
                              ) : (
                                <DoneIcon
                                  sx={{ fontSize: "1rem", color: "gray" }}
                                />
                              )
                            ) : null}
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                ))}
                <Box ref={messageEndRef} sx={{ height: 1 }} />
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
              <CgAttachment/>
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
