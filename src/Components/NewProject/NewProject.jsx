import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Box,
  Grid,
  Paper,
  Stack,
  Chip
} from "@mui/material";
import { toast , ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateWorkspace from "../CreateWorkspace";
import Navbar from "../Navbar/Navbar";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


const NewProject = (workSpace) => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const workspaceId = workSpace?.workspace?._id;

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const handleDeleteEmail = (emailToDelete) => {
    setEmails(emails.filter(email => email !== emailToDelete));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const formData = { email, workspaceId };
    
    try {
      const response = await userAxiosInstance.post('/invite', formData, { withCredentials: true });
      console.log('Invitations sent:', response.data);
      toast.success('Invitation sent');
    //   setTimeout(() => {
    //     navigate('/home');
    //   }, 1000);
    } catch (err) {
      console.error('Error sending invitations:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  const [toggleName, setToggleName] = useState("workspace");
  const [render, setRender] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [projectDetails, setProjectDetails] = useState({ workspaceName: "" ,
    projectName: '',
    Description: '',
    fromDate: dayjs(),
    toDate: dayjs().add(1, 'day'),
  });

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await userAxiosInstance.get("/workspace", {
          withCredentials: true,
        });
        console.log("API Response:", response);
        if (response.data && response.data.workspace) {
          setWorkspaces(response.data.workspace);
          console.log(response.data.workspace, "Workspaces");
        } else {
          console.error("error happened:", response.data);
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        toast.error("Failed to load workspaces.");
      }
    };

    fetchWorkspaces();
  }, []);



const createProject = async(projectDetails)=>{
    try {
        const response = await userAxiosInstance.post('/createproject',projectDetails)
        if(response.status===200){
            toast.success('project created successfully')
        }
    } catch (error) {
        toast.error('project creation failed')
        console.error(error,'error')
        
    }
}

  return (
    <>
    <ToastContainer/>
    <Box
      sx={{
        backgroundImage: `
          radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
          radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
        `,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navbar />

      <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box>

      <Container
        sx={{
          marginTop: "50px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Streamline Your Project: Plan and Execute with EASE
        </Typography>

        <Paper elevation={3} sx={{ padding: 2 }}>
          <Tabs
            value={toggleName}
            onChange={(e, newValue) => setToggleName(newValue)}
            aria-label="project creation tabs"
          >
            <Tab label="Select a workspace" value="workspace" />
            <Tab label="Add Project" value="project" />
            <Tab label="Assign" value="Assign" />
          </Tabs>

          <Box p={2}>
            {toggleName === "workspace" && (
              <Box>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="workspaceSelect-label">
                        Select a workspace
                      </InputLabel>
                      <Select
                        labelId="workspaceSelect-label"
                        id="workspaceSelect"
                        variant="outlined"
                        value={projectDetails.workspaceName}
                        onChange={(e) =>
                          setProjectDetails({
                            ...projectDetails,
                            workspaceName: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="" disabled>
                          Select a Workspace
                        </MenuItem>
                        {!workspaces.length ? (
                          <MenuItem disabled>No workspace found</MenuItem>
                        ) : (
                          workspaces.map((workspace) => (
                            <MenuItem key={workspace._id} value={workspace._id}>
                              {workspace.name}{" "}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CreateWorkspace data={[render, setRender]} />
                  </Grid>
                </Grid>
                <Box textAlign="center" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (!projectDetails.workspaceName) {
                        toast.error("Please select a workspace");
                      } else {
                        setToggleName("project");
                      }
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            )}

            {/* Project Step */}
            {/* {toggleName === 'project' && (
            <Box>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  margin="normal"
                  label="Project Name"
                  variant="outlined"
                  value={projectDetails.projectName}
                  onChange={(e) => setProjectDetails({ ...projectDetails, projectName: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Project Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={projectDetails.projectDescription}
                  onChange={(e) => setProjectDetails({ ...projectDetails, projectDescription: e.target.value })}
                  required
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    

                    <Typography variant="h6">Add a due date
                        
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          type="date"
                          fullWidth
                          value={projectDetails.fromDate}
                          onChange={(e) => setProjectDetails({ ...projectDetails, fromDate: e.target.value })}
                          InputLabelProps={{ shrink: true }}
                          
                        />
                        
                      </Grid>
                      <Grid item xs={1} display="flex" alignItems="center">
                        <Typography variant="h6">to</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          type="date"
                          fullWidth
                          value={projectDetails.toDate}
                          onChange={(e) => setProjectDetails({ ...projectDetails, toDate: e.target.value })}
                          InputLabelProps={{ shrink: true }}
                          
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Box textAlign="center" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (
                        !projectDetails.projectName ||
                        !projectDetails.projectDescription ||
                        !projectDetails.fromDate ||
                        !projectDetails.toDate
                      ) {
                        toast.error('Please fill out all fields');
                      } else {
                        createProject(projectDetails);
                        setToggleName('Assign');
                      }
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Box>
          )} */}
           <>
      {/* {toggleName === 'project' && (
        <Box>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Project Name"
              variant="outlined"
              value={projectDetails.projectName}
              onChange={(e) => setProjectDetails({ ...projectDetails, projectName: e.target.value })}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Project Description"
              variant="outlined"
              multiline
              rows={4}
              value={projectDetails.projectDescription}
              onChange={(e) => setProjectDetails({ ...projectDetails, projectDescription: e.target.value })}
              required
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Add a due date</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      type="date"
                      fullWidth
                      value={projectDetails.fromDate}
                      onChange={(e) => setProjectDetails({ ...projectDetails, fromDate: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={1} display="flex" alignItems="center">
                    <Typography variant="h6">to</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      type="date"
                      fullWidth
                      value={projectDetails.toDate}
                      onChange={(e) => setProjectDetails({ ...projectDetails, toDate: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (
                    !projectDetails.projectName ||
                    !projectDetails.projectDescription ||
                    !projectDetails.fromDate ||
                    !projectDetails.toDate
                  ) {
                    toast.error('Please fill out all fields');
                  } else {
                    createProject(projectDetails);
                    setToggleName('Assign');
                  }
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      )} */}
      <>
      {toggleName === 'project' && (
        <Box>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Project Name"
              variant="outlined"
              value={projectDetails.projectName}
              onChange={(e) => setProjectDetails({ ...projectDetails, projectName: e.target.value })}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Project Description"
              variant="outlined"
              multiline
              rows={4}
              value={projectDetails.projectDescription}
              onChange={(e) => setProjectDetails({ ...projectDetails, Description: e.target.value })}
              required
            />

            <Typography variant="h6" marginTop="20px">Add Due Date:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                value={[projectDetails.fromDate, projectDetails.toDate]}
                onChange={(newValue) => {
                  setProjectDetails({
                    ...projectDetails,
                    fromDate: newValue[0],
                    toDate: newValue[1],
                  });
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} fullWidth margin="normal" />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} fullWidth margin="normal" />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>

            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (
                    !projectDetails.projectName ||
                    !projectDetails.Description ||
                    !projectDetails.fromDate ||
                    !projectDetails.toDate
                  ) {
                    toast.error('Please fill out all fields');
                  } else {
                    createProject(projectDetails);
                    setToggleName('Assign');
                  }
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
    </>
            {/* Assign Step */}
            <Box>
      {toggleName === 'Assign' && (
        <Box textAlign="center">
          <Typography variant="h6">Project created successfully! You can Assign here.</Typography>
          <Box
            component='form'
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            autoComplete='off'
            onSubmit={handleAddEmail}
          >
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {emails.map((email, index) => (
                <Chip
                  key={index}
                  label={email}
                  onDelete={() => handleDeleteEmail(email)}
                />
              ))}
            </Stack>
            <TextField
              fullWidth
              label="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddEmail(e);
                }
              }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
    </>
  );
};

export default NewProject;
