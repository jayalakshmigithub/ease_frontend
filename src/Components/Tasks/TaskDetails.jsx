

import React ,{useState}from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
  TextField
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
import { Edit } from "lucide-react";
import { toast } from "react-toastify";


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
const TaskDetails = ({ open, task, onClose, onDelete, onEdit , currentUser,OwnerId}) => {
  if (!task) return null;

  const  userInfo  = useSelector((state) => state.user?.userInfo?.user._id);
   const [isRefreshing, setIsRefreshing] = useState(false);
   const statusHistory = task?.statusHistory || [];
   const isOwner = currentUser === OwnerId

  const handleRefreshTracking = () => {
    setIsRefreshing(true);
   
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({
    name: task?.name || "",
    Description: task?.Description || "",
    priority: task?.priority || "",
    status: task?.status || "",
  });
  const [editedStatus, setEditedStatus] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleEditClick = (index, status) => {
    setEditingIndex(index);
    setEditedStatus(status);
  };
  
  const handleSaveClick = async (index, entry) => {
    try {
      const updatedHistory = [...statusHistory];
      updatedHistory[index] = { ...entry, status: editedStatus };
  
      const response = await userAxiosInstance.put(`/tasks/edit-status`, {
        _id: task._id,
        statusHistory: updatedHistory,
      });
  
      if (response.status === 200) {
        alert("Status updated successfully!");
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  const handleSaveTask = async () => {
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

  const handleDelete = async()=>{
    try {
      setLoading(true)
       await userAxiosInstance.post('/tasks/delete-task',{taskId: task._id})
       toast.success("Task Deleted Successfully",{autoClose:1000})
       onClose()
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task", { autoClose: 1000 });
    }
    finally{
      setLoading(false)
    }
  }
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedTask, setEditedTask] = useState({
  //   name: task?.name || "",
  //   description: task?.Description || "",
  //   priority: task?.priority || "",
  //   status: task?.status || "",
  // });
  
  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };
  
  // const handleSave = async () => {
  //   try {
  //     const response = await userAxiosInstance.put(`/tasks/edit-task`, {
  //       _id: task._id,
  //       ...editedTask,
  //     });
  //     if (response.status === 200) {
  //       alert("Task updated successfully!");
  //       setIsEditing(false);
  //       onClose(); 
  //     }
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };
  // const handleRefreshTracking = () => {
  //   setIsRefreshing(true);
    
  //   if (task) {
  //     onEdit({...task}); 
  //   }
  //   setTimeout(() => {
  //     setIsRefreshing(false);
  //   }, 1000);
  // };

 
 
  
//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: {
//           backgroundColor: "#1e293b",
//           borderRadius: "12px",
//           padding: "20px",
//           maxHeight: "60vh",
//           width: "900px",
//         },
//       }}
//     >
//       {task && (
//         <DialogContent sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
//           <Box sx={{ flex: 1.2 }}>
//             <Typography
//               variant="h6"
//               sx={{ color: "white", fontWeight: "bold", mb: 1 }}
//             >
//               {task.name}
//             </Typography>

//             <Typography variant="body1" sx={{ color: "#cbd5e1", mb: 1 }}>
//               {task.Description}
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
//               <strong>Priority:</strong> {task.priority}
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 2 }}>
//               <strong>Status:</strong> {task.status}
//             </Typography>

//             {task.images?.length > 0 && (
//               <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
//                 {task.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Task Image ${index + 1}`}
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       objectFit: "cover",
//                       borderRadius: "10px",
//                       boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
//                     }}
//                   />
//                 ))}
//               </Box>
//             )}
//           </Box>

//           <Box
//             sx={{
//               flex: 1,
//               minWidth: "250px",
//               maxWidth: "300px",
//               overflowY: "auto",
//               pr: 2,
//             }}
//           >
            
//             <Typography
//               variant="h6"
//               sx={{ color: "white", fontWeight: "bold", mb: 2 }}
//             >
              
//               Status History
//               <IconButton
                    
//                     sx={{
//                       onClick:{handleRefreshTracking},
//                       color: 'white',
//                       animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
//                       '@keyframes spin': {
//                         '0%': { transform: 'rotate(0deg)' },
//                         '100%': { transform: 'rotate(360deg)' }
//                       }
//                     }}
//                   >
//                     <RefreshCw size={20} />
//                   </IconButton>
//             </Typography>
           
//              <Timeline sx={{ textAlign: "start", marginRight: "200px" }}>
//               {statusHistory.map((entry, index) => (
//                 <TimelineItem key={index}>
//                   <TimelineSeparator>
//                     <TimelineDot color="primary" />
//                     {index < statusHistory.length - 1 && <TimelineConnector />}
//                   </TimelineSeparator>
//                   <TimelineContent>
//                     <Typography
//                       variant="body1"
//                       sx={{ color: "white", fontWeight: "bold" }}
//                     >
//                       {entry.status.toUpperCase()}
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: "#94a3b8" }}>
//                       Updated by {entry.changedBy?.name || "Unknown"} on{" "}
//                       {new Date(entry.changedAt).toLocaleDateString()}
//                     </Typography>
//                   </TimelineContent>
//                 </TimelineItem>
//               ))}
//             </Timeline> 
//             {/* {statusHistory && Array.isArray(statusHistory) && statusHistory.map((entry, index) => (
//   <TimelineItem key={index}>
//     <TimelineSeparator>
//       <TimelineDot color="primary" />
//       {index < statusHistory.length - 1 && <TimelineConnector />}
//     </TimelineSeparator>
//     <TimelineContent>
//       <Typography
//         variant="body1"
//         sx={{ color: "white", fontWeight: "bold" }}
//       >
//         {entry?.status ? entry.status.toUpperCase() : "Unknown Status"}
//       </Typography>
//       <Typography variant="body2" sx={{ color: "#94a3b8" }}>
//         Updated by {entry?.changedBy?.name || "Unknown"} on{" "}
//         {entry?.changedAt ? new Date(entry.changedAt).toLocaleDateString() : "Unknown Date"}
//       </Typography>
//     </TimelineContent>
//   </TimelineItem>
// ))} */}
//           </Box>
//         </DialogContent>
//       )}

//       <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
//         <Button
//           onClick={onClose}
//           variant="outlined"
//           sx={{
//             color: "white",
//             borderColor: "#64748b",
//             "&:hover": { backgroundColor: "#334155" },
//           }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

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
        maxHeight: "70vh",
        width: "900px",
      },
    }}
  >
    {task && (
      <DialogContent sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Box sx={{ flex: 1.2 }}>
          {isEditing ? (
            <>
              <TextField
                label="Task Name"
                value={editedTask.name}
                onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "white", borderRadius: "5px", mb: 1 }}
              />
           
              <TextField
                label="Description"
                value={editedTask.Description}
                onChange={(e) => setEditedTask({ ...editedTask, Description: e.target.value })}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                sx={{ backgroundColor: "white", borderRadius: "5px", mb: 1 }}
              />
              <Button onClick={handleSaveTask} variant="contained" sx={{ mr: 2 }}>
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outlined">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
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
              {
                isOwner&&
                <Button onClick={() => setIsEditing(true)} variant="contained" sx={{ mt: 2 }}>
                Edit Task
              </Button>
              }
              
            </>
          )}

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

        <Box sx={{ flex: 1, minWidth: "250px", maxWidth: "300px", overflowY: "auto", pr: 2 }}>
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
            Status History
          </Typography>

          <Timeline sx={{ textAlign: "start", marginRight: "200px" }}>
            {statusHistory.map((entry, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < statusHistory.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  {editingIndex === index ? (
                    <>
                      <TextField
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: "5px", mb: 1 }}
                      />
                      <IconButton onClick={() => handleSaveClick(index, entry)} sx={{ color: "green" }}>
                        <Save size={20} />
                      </IconButton>
                      <IconButton onClick={() => setEditingIndex(null)} sx={{ color: "red" }}>
                        <Close size={20} />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                        {entry.status.toUpperCase()}
                        <IconButton onClick={() => handleEditClick(index, entry.status)} sx={{ color: "#94a3b8", ml: 1 }}>
                          <Edit size={18} />
                        </IconButton>
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                        Updated by {entry.changedBy?.name || "Unknown"} on{" "}
                        {new Date(entry.changedAt).toLocaleDateString()}
                      </Typography>
                    </>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
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
      {
        isOwner&&
 <Button  
 onClick={handleDelete}
 variant="outlined"
 disabled={loading}
   sx={{
     color: "red",
     borderColor: "#64748b",
     "&:hover": { backgroundColor: "#334155" }, 
   }}>
     {loading ? "Deleting":"Delete Task"}

 </Button>
      }
     
    </DialogActions>
  </Dialog>
);
};
export default TaskDetails;
 



