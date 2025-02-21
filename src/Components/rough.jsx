import React, { useState } from "react";
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

const Activities = () => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  
    // Updated Dummy Data
    const workspaces = [
      { name: "Workspace Alpha", owner: "John Doe", projects: 5, members: 12 },
      { name: "Workspace Beta", owner: "Jane Smith", projects: 8, members: 20 },
    ];
  
    const projects = [
      {
        name: "Project X",
        deadline: "2025-02-01",
        members: ["Alice", "Bob", "Charlie"],
      },
      {
        name: "Project Y",
        deadline: "2025-03-01",
        members: ["Dave", "Eve", "Frank"],
      },
    ];
  
    const tasks = [
      { name: "Task 1", members: ["Alice"], deadline: "2025-01-25" },
      { name: "Task 2", members: ["Bob", "Charlie"], deadline: "2025-01-30" },
    ];
  
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
          flexDirection: "column",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        {/* Navbar */}
        <Box>
          <Hidden smDown>
            <Navbar />
          </Hidden>
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
          <Box sx={{ width: isSm ? "100%" : "100px", flexShrink: 0 }}>
            <SideBar />
          </Box>
  
          {/* Dashboard Content */}
          <Box
            sx={{
              flexGrow: 1,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              overflowY: "auto",
            }}
          >
            {/* Top Summary Cards */}
            <Grid container spacing={4}>
              {/* Workspaces */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, #f4f9ff, #ffffff)`,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Workspaces
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {workspaces.map((workspace, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#f1f5fc" },
                      }}
                    >
                      <Box>
                        <Typography fontWeight="bold">{workspace.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Owner: {workspace.owner}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Projects: {workspace.projects}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Members: {workspace.members}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Card>
              </Grid>
  
              {/* Projects */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, #f4f9ff, #ffffff)`,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Projects
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {projects.map((project, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#f1f5fc" },
                      }}
                    >
                      <Box>
                        <Typography fontWeight="bold">{project.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Deadline: {project.deadline}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Members: {project.members.join(", ")}
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
                          startIcon={<Edit />}
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Delete />}
                          size="small"
                        >
                          Remove
                        </Button>
                      </Box>
                    </Stack>
                  ))}
                </Card>
              </Grid>
  
              {/* Tasks */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, #f4f9ff, #ffffff)`,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Tasks
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {tasks.map((task, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#f1f5fc" },
                      }}
                    >
                      <Box>
                        <Typography fontWeight="bold">{task.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Members: {task.members.join(", ")}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Deadline: {task.deadline}
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
                          startIcon={<Edit />}
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Delete />}
                          size="small"
                        >
                          Delete
                        </Button>
                      </Box>
                    </Stack>
                  ))}
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  };


export default Activities
