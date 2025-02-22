

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
import { userAxiosInstance } from "../../utils/api/axiosInstance";

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
   
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task?.name || "",
    description: task?.Description || "",
    priority: task?.priority || "",
    status: task?.status || "",
  });
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSave = async () => {
    try {
      const response = await userAxiosInstance.put(`/tasks/edit-task`, {
        _id: task._id,
        ...editedTask,
      });
      if (response.status === 200) {
        alert("Task updated successfully!");
        setIsEditing(false);
        onClose(); 
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
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
 