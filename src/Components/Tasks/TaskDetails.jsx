// import React from "react";
// import { Box, Button, Modal, Typography, IconButton, Divider, Grid, Paper, Select, MenuItem } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
// import NotesIcon from '@mui/icons-material/Notes';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import PersonIcon from '@mui/icons-material/Person';
// import StatusOnlineIcon from '@mui/icons-material/OnlinePrediction';

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

import React ,{useState}from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton
} from "@mui/material";
import { Timeline } from "@mui/lab";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Add as AddIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RefreshCw } from 'lucide-react';

// const TaskDetails = ({ open, task, onClose, onDelete, onEdit, currentUser }) => {
//   if (!task) return null;

//   const isOwner = currentUser === task.owner;
//   console.log('isowner',isOwner)

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>{task.name}</DialogTitle>
//       <DialogContent>
//         <Typography variant="body1" gutterBottom>
//           <strong>Description:</strong> {task.Description}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           <strong>Priority:</strong> {task.priority}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           <strong>Status:</strong> {task.status}
//         </Typography>
//       </DialogContent>
//       <DialogActions>
//         {isOwner && (
//           <>
//             <Button
//               color="primary"
//               variant="outlined"
//               onClick={() => onEdit(task)}
//             >
//               Edit
//             </Button>
//             <Button
//               color="secondary"
//               variant="contained"
//               onClick={() => onDelete(task._id)}
//             >
//               Delete
//             </Button>
//           </>
//         )}
//         <Button onClick={onClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
const TaskDetails = ({ open, task, onClose, onDelete, onEdit }) => {
  if (!task) return null;

  const { userInfo } = useSelector((state) => state.user?.userInfo?.user._id);
  const currentUserId = userInfo?.userId;
   const [isRefreshing, setIsRefreshing] = useState(false);
   const statusHistory = task?.statusHistory || [];

  const handleRefreshTracking = () => {
    setIsRefreshing(true);
    // Simulate refresh with a timeout
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // const handleRefreshTracking = () => {
  //   setIsRefreshing(true);
    
  //   if (task) {
  //     onEdit({...task}); 
  //   }
  //   setTimeout(() => {
  //     setIsRefreshing(false);
  //   }, 1000);
  // };

 
 
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#1e293b",
          borderRadius: "12px",
          padding: "20px",
          maxHeight: "60vh",
          width: "900px",
        },
      }}
    >
      {task && (
        <DialogContent sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Box sx={{ flex: 1.2 }}>
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold", mb: 1 }}
            >
              {task.name}
            </Typography>

            <Typography variant="body1" sx={{ color: "#cbd5e1", mb: 1 }}>
              {task.Description}
            </Typography>
            <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
              <strong>Priority:</strong> {task.priority}
            </Typography>
            <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 2 }}>
              <strong>Status:</strong> {task.status}
            </Typography>

            {task.images?.length > 0 && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                {task.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Task Image ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: "250px",
              maxWidth: "300px",
              overflowY: "auto",
              pr: 2,
            }}
          >
            
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}
            >
              
              Status History
              <IconButton
                    
                    sx={{
                      onClick:{handleRefreshTracking},
                      color: 'white',
                      animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }}
                  >
                    <RefreshCw size={20} />
                  </IconButton>
            </Typography>
           
             <Timeline sx={{ textAlign: "start", marginRight: "200px" }}>
              {statusHistory.map((entry, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    {index < statusHistory.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography
                      variant="body1"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {entry.status.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                      Updated by {entry.changedBy?.name || "Unknown"} on{" "}
                      {new Date(entry.changedAt).toLocaleDateString()}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline> 
            {/* {statusHistory && Array.isArray(statusHistory) && statusHistory.map((entry, index) => (
  <TimelineItem key={index}>
    <TimelineSeparator>
      <TimelineDot color="primary" />
      {index < statusHistory.length - 1 && <TimelineConnector />}
    </TimelineSeparator>
    <TimelineContent>
      <Typography
        variant="body1"
        sx={{ color: "white", fontWeight: "bold" }}
      >
        {entry?.status ? entry.status.toUpperCase() : "Unknown Status"}
      </Typography>
      <Typography variant="body2" sx={{ color: "#94a3b8" }}>
        Updated by {entry?.changedBy?.name || "Unknown"} on{" "}
        {entry?.changedAt ? new Date(entry.changedAt).toLocaleDateString() : "Unknown Date"}
      </Typography>
    </TimelineContent>
  </TimelineItem>
))} */}
          </Box>
        </DialogContent>
      )}

      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "#64748b",
            "&:hover": { backgroundColor: "#334155" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default TaskDetails;
 //     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    //       <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
    //         {task.name}
    //       </DialogTitle>
    //       <DialogContent sx={{ padding: "20px" }}>
    //         {console.log("Task Object:", task)

    //         }
    //       {task.images?.length > 0 && (
    //   <Box display="flex" justifyContent="center" mb={2}>
    //     <img
    //       src={task.images[0]}
    //       alt={task.name}
    //       style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px" }}
    //     />
    //   </Box>
    // )}

    //         <Typography variant="body1" gutterBottom>
    //           <strong>Description:</strong> {task.Description}
    //         </Typography>
    //         <Typography variant="body1" gutterBottom>
    //           <strong>Priority:</strong> {task.priority}
    //         </Typography>
    //         <Typography variant="body1" gutterBottom>
    //           <strong>Status:</strong> {task.status}
    //         </Typography>
    //       </DialogContent>
    //       <DialogActions sx={{ justifyContent: "space-between", padding: "20px" }}>
    //         {currentUserId && (
    //           <Box>
    //             <Button color="primary" variant="outlined" onClick={() => onEdit(task)} sx={{ mr: 1 }}>
    //               Edit
    //             </Button>
    //             <Button color="secondary" variant="contained" onClick={() => onDelete(task._id)}>
    //               Delete
    //             </Button>
    //           </Box>
    //         )}
    //         <Button onClick={onClose} variant="outlined">Close</Button>
    //       </DialogActions>
    //     </Dialog>