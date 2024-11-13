







import React from "react";
import { Box, Button, Modal, Typography, IconButton, Divider, Grid, Paper, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import StatusOnlineIcon from '@mui/icons-material/OnlinePrediction';

// const TaskDetails = ({ data, handleModalClose, handleChangeStatus, handleShowDetails, showDetails }) => {
//   return (
//     <Modal
//       open={data.showModal}
//       onClose={handleModalClose}
//       aria-labelledby="task-details-modal"
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         bgcolor: 'rgba(1, 1, 34, 0.6)',
//       }}
//     >
//       <Box sx={{ width: '80%', maxWidth: '900px', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, pb: 2 }}>
//           <Typography variant="h5">Task Details</Typography>
//           <IconButton onClick={handleModalClose}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
//           <Box display="flex" gap={2} alignItems="center">
//             <Typography variant="h6" sx={{ color: data.task.task.status === "completed" ? "green" : "inherit" }}>
//               {data.task.task.name}
//             </Typography>
//             {data.task.task.status === "completed" && <CheckCircleIcon color="success" />}
//           </Box>
//           <Typography
//             variant="h6"
//             sx={{
//               color:
//                 data.task.task.priority === "High" ? "error.main" :
//                 data.task.task.priority === "Medium" ? "warning.main" : "text.secondary",
//             }}
//           >
//             {data.task.task.priority} 🔴
//           </Typography>
//           <Button variant="contained" color="primary" onClick={() => handleChangeStatus("completed")}>
//             Mark Complete
//           </Button>
//         </Box>

//         <Grid container spacing={2}>
//           <Grid item xs={12} md={8}>
//             <Paper sx={{ p: 2, maxHeight: 300, overflowY: "auto" }}>
//               <Box mb={2} display="flex" justifyContent="space-between">
//                 <Box display="flex" alignItems="center" gap={1}>
//                   <NotesIcon />
//                   <Typography variant="h6">Description</Typography>
//                 </Box>
//                 <IconButton onClick={() => handleShowDetails("description")}>
//                   <ArrowDropDownCircleIcon className={showDetails.description ? "rotate-180" : ""} />
//                 </IconButton>
//               </Box>
//               {showDetails.description && (
//                 <Typography variant="body2" sx={{ overflowY: "auto", maxHeight: 100 }}>
//                   {data.task.task.description}
//                 </Typography>
//               )}
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Box display="flex" alignItems="center" gap={1} mb={1}>
//               <CalendarTodayIcon />
//               <Typography variant="h6">Date</Typography>
//             </Box>
//             <Typography variant="body1">{`${data.task.task.from} TO ${data.task.task.to}`}</Typography>

//             <Box display="flex" alignItems="center" gap={1} mt={2}>
//               <PersonIcon />
//               <Typography variant="h6">Assignee</Typography>
//             </Box>
//             <Box mt={1} maxHeight={100} overflow="auto">
//               {data.task.task.assigneeDetails && data.task.task.assigneeDetails.length > 0 ? (
//                 data.task.task.assigneeDetails.map((assignee) => (
//                   <Box key={assignee._id} display="flex" gap={1} alignItems="center" mb={1}>
//                     <Paper sx={{ p: 1, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       {assignee.name[0]}
//                     </Paper>
//                     <Box>
//                       <Typography variant="body2">{assignee.name}</Typography>
//                       <Typography variant="caption">{assignee.email}</Typography>
//                     </Box>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography variant="body2">Unassigned</Typography>
//               )}
//             </Box>

//             <Box display="flex" alignItems="center" gap={1} mt={2}>
//               <StatusOnlineIcon />
//               <Typography variant="h6">Status</Typography>
//             </Box>
//             <Select
//               value={data.task.task.status}
//               onChange={(e) => handleChangeStatus(e.target.value)}
//               sx={{ mt: 1, minWidth: 120 }}
//             >
//               {["pending", "completed", "ongoing"].map(
//                 (status) => data.task.task.status !== status && (
//                   <MenuItem key={status} value={status}>
//                     {status}
//                   </MenuItem>
//                 )
//               )}
//             </Select>
//           </Grid>
//         </Grid>
//       </Box>
//     </Modal>
//   );
// };

// export default TaskDetails;

