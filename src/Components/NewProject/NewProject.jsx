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
  Chip,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CreateWorkspace from "../CreateWorkspace";
import Navbar from "../Navbar/Navbar";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const NewProject = (workSpace) => {
  const navigate = useNavigate();
  const [selectedMembers, setSelectedMembers] = useState([]);
  // const workspaceId = workSpace?.workspace?._id;

  const location = useLocation;
  let { workspaceId } = useParams();

  const [toggleName, setToggleName] = useState("workspace");
  const [render, setRender] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [members, setMembers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    workspaceName: "",
    projectName: "",
    Description: "",
    fromDate: dayjs(),
    toDate: dayjs().add(1, "day"),
    members: [],
  });

  const today = dayjs();
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await userAxiosInstance.get("/workspaces", {
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

  // const handleWorkspaceChange = (workspaceId) => {
  //   const selectedWorkspace = workspaces.find((ws) => ws._id === workspaceId);
  //   if (selectedWorkspace) {
  //     const memberEmails = selectedWorkspace.members.map(
  //       (member) => member.email
  //     );
  //     setEmails(memberEmails); 
  //     setProjectDetails({ ...projectDetails, workspaceName: workspaceId });
  //   }
  // };
//   const handleWorkspaceChange = (workspaceId) => {
//     const selectedWorkspace = workspaces.find((ws) => ws._id === workspaceId);
//     if (selectedWorkspace) {
       
//         const memberDetails = selectedWorkspace.members.map((member) => ({
//             _id: member._id,
//             email: member.email 
//         }));
//         console.log('memberDetails',memberDetails)
        
//         setEmails(memberDetails.map(member => member.email));
//         setProjectDetails({ ...projectDetails, workspaceName: workspaceId, members: memberDetails });
//     }
// };
const handleWorkspaceChange = (workspaceId) => {
  const selectedWorkspace = workspaces.find((ws) => ws._id === workspaceId);
  if (selectedWorkspace) {
      const memberDetails = selectedWorkspace.members.map((member) => ({
          _id: member._id,
          email: member.email,
      }));
      setEmails(memberDetails); 
      console.log("Member Details:", memberDetails); 
      setProjectDetails({ ...projectDetails, workspaceName: workspaceId });
  }
};



  const createProject = async (projectDetails) => {
    try {
      console.log("Project Details Before Sending:", projectDetails);

      const response = await userAxiosInstance.post(
        "/createproject",
        projectDetails
      );
      if (response.status === 200) {
        toast.success("project created successfully");
        setTimeout(() => {
          navigate("/workspace");
        }, 1000);
      }
    } catch (error) {
      toast.error("project creation failed");
      console.error(error, "error");
    }
  };

  // const handleToggle = (email) => {
  //   setProjectDetails((prevDetails) => {
      
  //     const updatedMembers = prevDetails.members.includes(email)
  //       ? prevDetails.members.filter((member) => member !== email) 
  //       : [...prevDetails.members, email];

  //       console.log("Updated Members List:", updatedMembers)
  //     return {
  //       ...prevDetails,
  //       members: updatedMembers,
  //     };
  //   });
  // };
  
  
  const handleToggle = (email) => {
    setProjectDetails((prevDetails) => {
        const selectedMember = prevDetails.members.find(member => member.email === email);
        
        let updatedMembers;
        if (selectedMember) {
        
            updatedMembers = prevDetails.members.filter(member => member.email !== email);
        } else {
            
            const newMember = emails.find(member => member.email === email);
            if (newMember) {
               
                updatedMembers = [...prevDetails.members, newMember];
            } else {
                updatedMembers = prevDetails.members;
            }
        }

        console.log("Updated Members List:", updatedMembers);
        return {
            ...prevDetails,
            members: updatedMembers, 
        };
    });
};

console.log('projectDetails',projectDetails)

  return (
    <>
      <ToastContainer />
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
        <Container sx={{ marginTop: "20px" }}>
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
            </Tabs>

            <Box p={2}>
              {/* Workspace Selection */}
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
                          onChange={(e) => {
                            const selectedWorkspaceId = e.target.value;
                            handleWorkspaceChange(selectedWorkspaceId);
                            setProjectDetails({
                              ...projectDetails,
                              workspaceName: selectedWorkspaceId,
                            });
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select a Workspace
                          </MenuItem>
                          {!workspaces.length ? (
                            <MenuItem disabled>No workspace found</MenuItem>
                          ) : (
                            workspaces.map((workspace) => (
                              <MenuItem
                                key={workspace._id}
                                value={workspace._id}
                              >
                                {workspace.name}
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
              {toggleName === "project" && (
                <Box>
                  <Box component="form" noValidate autoComplete="off">
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Project Name"
                      variant="outlined"
                      value={projectDetails.projectName}
                      onChange={(e) =>
                        setProjectDetails({
                          ...projectDetails,
                          projectName: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Project Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={projectDetails.Description}
                      onChange={(e) =>
                        setProjectDetails({
                          ...projectDetails,
                          Description: e.target.value,
                        })
                      }
                      required
                    />

<Grid item xs={12} md={8}>
      <Typography sx={{ marginBottom: '8px', fontWeight: 'bold' }}>Members:</Typography>
      <Paper
        elevation={1}
        sx={{
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
        }}
      >
        <FormControl component="fieldset">
        <FormGroup row>
    {emails.length > 0 ? (
        emails.map((member) => (
            <FormControlLabel
                key={member._id} 
                control={
                    <Checkbox
                        checked={projectDetails.members.some(m => m.email === member.email)} 
                        onChange={() => handleToggle(member.email)} 
                        color="primary"
                    />
                }
                label={member.email} 
                sx={{ marginRight: '16px', marginBottom: '0' }}
            />
        ))
    ) : (
        <Typography>No members found</Typography>
    )}
</FormGroup>

          
        </FormControl>
      </Paper>
    </Grid>

                    <Typography variant="h6" marginTop="20px">
                      Add Due Date:
                    </Typography>
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
                        minDate={today}
                        renderInput={(startProps, endProps) => (
                          <React.Fragment>
                            <TextField
                              {...startProps}
                              fullWidth
                              margin="normal"
                            />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField
                              {...endProps}
                              fullWidth
                              margin="normal"
                            />
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
                            toast.error("Please fill out all fields");
                          } else {
                            createProject(projectDetails);
                          }
                        }}
                      >
                        Create Project
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default NewProject;

//   console.log('workspaceId',workspaceId)
//   const fetchMembersInWorkspace = async () => {
//     try {
//         const response = await userAxiosInstance.get(`/workspace/${workspaceId}/members`, { withCredentials: true });
//         setMembers(response.data); // Updated this to directly set `response.data`
//         console.log(response.data, 'response.data'); // Should log an array of emails if successful
//     } catch (error) {
//         console.error("Error fetching members:", error);
//         toast.error("Failed to load members.");
//     }
// };

//  useEffect(()=>{
//   fetchMembersInWorkspace()
//  },[])

// useEffect(() => {
//   console.log("Current toggleName:", toggleName);
//   console.log("Current workspaceId:", workspaceId);
//   if (toggleName === "Enlist" && workspaceId) {
//     console.log("Fetching members for workspace ID:", workspaceId);
//     fetchMembersInWorkspace();
//   }
// }, [toggleName, workspaceId]);

{
  /* ASSIGN CHNAGING TO ENLIST */
}
{
  /* <Box>
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
    </Box> */
}

// const handleInvitation = async () => {
//   const query = new URLSearchParams(location.search);
//   const token = query.get('token');
//   const workspaceId = query.get('workspaceId');
//   const encryptedEmail = query.get('email');

//   if (token && workspaceId && encryptedEmail) {
//     try {

//       await userAxiosInstance.post('/invite', { token, workspaceId, encryptedEmail }, { withCredentials: true });

//       navigate('/workspace');
//     } catch (error) {
//       console.error('Error processing invitation:', error);
//     }
//   }
// };

// useEffect(() => {

//   handleInvitation();
// }, [location.search]);

// const handleAddEmail = (e) => {
//   e.preventDefault();
//   if (email && !emails.includes(email)) {
//     setEmails([...emails, email]);
//     setEmail('');
//   }
// };

// const handleDeleteEmail = (emailToDelete) => {
//   setEmails(emails.filter(email => email !== emailToDelete));
// };

// const handleSubmit = async () => {
//   setLoading(true);
//   setError(null);
//   const formData = { email, workspaceId };

//   try {
//     const response = await userAxiosInstance.post('/invite', formData, { withCredentials: true });
//     console.log('Invitations sent:', response.data);
//     toast.success('Invitation sent');
//   //   setTimeout(() => {
//   //     navigate('/home');
//   //   }, 1000);
//   } catch (err) {
//     console.error('Error sending invitations:', err);
//     setError(err.response?.data?.message || 'Something went wrong');
//   } finally {
//     setLoading(false);
//   }
// };
