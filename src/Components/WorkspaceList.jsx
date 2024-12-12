// import React, { useState, useEffect } from 'react';
// import { Button, Card, Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, CardContent, TextField } from '@mui/material';
// import Swal from 'sweetalert2';
// import { userAxiosInstance } from '../utils/api/axiosInstance';

// const WorkspaceList = () => {
//   const [workspaces, setWorkspaces] = useState([]);
//   const [filteredWorkspaces, setFilteredWorkspaces] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchWorkspaces = async () => {
//     try {
//       const response = await userAxiosInstance.get('/workspaces', { withCredentials: true });
//       const userWorkspaces = response.data.workspace || [];
//       setWorkspaces(userWorkspaces);
//       setFilteredWorkspaces(userWorkspaces);
//     } catch (error) {
//       console.error('Error fetching workspaces:', error);
//     }
//   };

//   useEffect(() => {
//     fetchWorkspaces();
//   }, []);

//   const handleSort = (field) => {
//     const sortedWorkspaces = [...filteredWorkspaces].sort((a, b) => {
//       if (field === 'date') {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       } else {
//         return a[field].localeCompare(b[field]);
//       }
//     });
//     setFilteredWorkspaces(sortedWorkspaces);
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     const filtered = workspaces.filter((workspace) =>
//       workspace.name.toLowerCase().includes(term.toLowerCase())
//     );
//     setFilteredWorkspaces(filtered);
//   };

//   const handleDelete = (workspaceId) => {
//     userAxiosInstance.delete(`/workspaces/${workspaceId}`, { withCredentials: true })
//       .then(() => {
//         setWorkspaces((prev) => prev.filter(workspace => workspace._id !== workspaceId));
//         setFilteredWorkspaces((prev) => prev.filter(workspace => workspace._id !== workspaceId));
//       })
//       .catch(error => {
//         console.error('Error deleting workspace:', error);
//       });
//   };

//   return (
//     <Box sx={{ padding: '20px' }}>
//       <Card>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             padding: "8px",
//             borderRadius: '12px'
//           }}
//         >
//           <Typography
//             sx={{
//               display: "flex",
//               padding: "8px",
//               marginLeft: "10px",
//               marginTop: "5px",
//               fontFamily: "poppins",
//             }}
//             variant="h6"
//             gutterBottom
//           >
//             Workspace List
//           </Typography>
//         </Box>

//         <CardContent>

//           <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//             <TextField
//             fullWidth
//               label="Search by Name"
//               variant="outlined"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <Button onClick={() => handleSort('name')}>Sort by Name</Button>
//             <Button onClick={() => handleSort('date')}>Sort by Date</Button>
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#E5E4E2" }}>
//                   <TableCell>Workspace Name</TableCell>
//                   <TableCell>Workspace Description</TableCell>
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredWorkspaces.length > 0 ? (
//                   filteredWorkspaces.map((workspace, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{workspace.name}</TableCell>
//                       <TableCell>{workspace.description}</TableCell>
//                       <TableCell>
//                         <Button
//                           color="error"
//                           onClick={() => handleDelete(workspace._id)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No workspace found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default WorkspaceList;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardContent,
  TextField,
} from "@mui/material";
import { userAxiosInstance } from "../utils/api/axiosInstance";

// const WorkspaceList = () => {
//   const [workspaces, setWorkspaces] = useState([]);
//   const [filteredWorkspaces, setFilteredWorkspaces] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchWorkspaces = async () => {
//     try {
//       const response = await userAxiosInstance.get('/workspaces', { withCredentials: true });
//       const userWorkspaces = response.data.workspace || [];
//       setWorkspaces(userWorkspaces);
//       setFilteredWorkspaces(userWorkspaces);
//     } catch (error) {
//       console.error('Error fetching workspaces:', error);
//     }
//   };

//   useEffect(() => {
//     fetchWorkspaces();
//   }, []);

//   const handleSort = (field) => {
//     const sortedWorkspaces = [...filteredWorkspaces].sort((a, b) => {
//       if (field === 'date') {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       } else {
//         return a[field].localeCompare(b[field]);
//       }
//     });
//     setFilteredWorkspaces(sortedWorkspaces);
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     const filtered = workspaces.filter((workspace) =>
//       workspace.name.toLowerCase().includes(term.toLowerCase())
//     );
//     setFilteredWorkspaces(filtered);
//   };

//   const handleDelete = (workspaceId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to delete this workspace?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         userAxiosInstance.delete(`/workspaces/${workspaceId}`, { withCredentials: true })
//           .then(() => {
//             setWorkspaces((prev) => prev.filter(workspace => workspace._id !== workspaceId));
//             setFilteredWorkspaces((prev) => prev.filter(workspace => workspace._id !== workspaceId));
//             Swal.fire('Deleted!', 'The workspace has been deleted.', 'success');
//           })
//           .catch(error => {
//             console.error('Error deleting workspace:', error);
//             Swal.fire('Error!', 'Failed to delete the workspace.', 'error');
//           });
//       }
//     });
//   };

//   return (
//     <Box sx={{ padding: '20px' }}>
//       <Card>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             padding: "8px",
//             borderRadius: '12px'
//           }}
//         >
//           <Typography
//             sx={{
//               display: "flex",
//               padding: "8px",
//               marginLeft: "10px",
//               marginTop: "5px",
//               fontFamily: "poppins",
//             }}
//             variant="h6"
//             gutterBottom
//           >
//             Workspace List
//           </Typography>
//         </Box>

//         <CardContent>

//           <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//             <TextField
//             fullWidth
//               label="Search by Name"
//               variant="outlined"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <Button onClick={() => handleSort('name')}>Sort by Name</Button>
//             <Button onClick={() => handleSort('date')}>Sort by Date</Button>
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#E5E4E2" }}>
//                   <TableCell>Workspace Name</TableCell>
//                   <TableCell>Workspace Description</TableCell>
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredWorkspaces.length > 0 ? (
//                   filteredWorkspaces.map((workspace, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{workspace.name}</TableCell>
//                       <TableCell>{workspace.description}</TableCell>
//                       <TableCell>
//                         <Button
//                           color="error"
//                           onClick={() => handleDelete(workspace._id)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No your own workspace is found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

const WorkspaceList = ({
  searchTerm,
  onSearch,
  onDelete,
  handleSort,
  workspaces,
}) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #E5E4E2",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 500,
            }}
            variant="h6"
            gutterBottom
          >
            Workspace List
          </Typography>
          <TextField
            fullWidth
            sx={{ maxWidth: 400 }}
            label="Search by Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Box>

        <CardContent>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button variant="contained" onClick={() => handleSort("name")}>
              Sort by Name
            </Button>
            <Button variant="contained" onClick={() => handleSort("date")}>
              Sort by Date
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E5E4E2" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Workspace Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Workspace Description
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workspaces.length > 0 ? (
                  workspaces.map((workspace) => (
                    <TableRow key={workspace._id}>
                      <TableCell>{workspace.name}</TableCell>
                      <TableCell>{workspace.description}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => onDelete(workspace._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No workspaces found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkspaceList;
