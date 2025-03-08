import { useState } from "react";
import { Modal, TextField, Button ,Box, Typography} from "@mui/material";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const EditProjectModal = ({ project, onClose, onUpdate }) => {
    const [projectName, setProjectName] = useState(project?.projectName || "");
    const [description, setDescription] = useState(project?.Description || "");
    const [toDate, setToDate] = useState(dayjs(project?.toDate));
    const [loading, setLoading] = useState(false);
  
    const handleSave = async () => {
      try {
        setLoading(true);
        await userAxiosInstance.put('/projects/edit-project', {
          _id:project._id,
          projectName,
          description,
          toDate: toDate.toISOString(),
        });
        console.log('project in project',project)
  toast.success('project updated successfully',{ autoClose: 1000 })
        onUpdate(); 
        onClose(); 
      } catch (error) {
        console.error("Error updating project:", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Modal open onClose={onClose}>
        <div style={{ padding: "20px", background: "white", margin: "10% auto", width: "400px" }}>
          <h3>Edit Project</h3>
          
          <TextField
            label="Project Name"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            margin="normal"
          />
          
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
  
         
  
          <DateTimePicker
            label="End Date"
            value={toDate}
            onChange={(newValue) => setToDate(newValue)}
            sx={{ marginTop: 2, width: "100%" }}
          />
  
          <Button onClick={handleSave} disabled={loading} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            {loading ? "Saving..." : "Save Changes"}
          
          </Button>
          
        </div>
      </Modal>
    );
  };

// const EditProjectModal = ({ project, onClose, onUpdate }) => {
//   const [projectName, setProjectName] = useState(project?.projectName || "");
//   const [description, setDescription] = useState(project?.Description || "");
//   const [toDate, setToDate] = useState(dayjs(project?.toDate));
//   const [loading, setLoading] = useState(false);
//   const [members, setMembers] = useState(project?.members || []);

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await userAxiosInstance.put("/projects/edit-project", {
//         _id: project._id,
//         projectName,
//         description,
//         toDate: toDate.toISOString(),
//       });
//       console.log('project in project',project)
//       toast.success("Project updated successfully", { autoClose: 1000 });
//       onUpdate();
//       onClose();
//     } catch (error) {
//       console.error("Error updating project:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveMember = async (members) => { 
//     console.log('Removing member:', members.email);  
  
//     try {
//       const response = await userAxiosInstance.post("/projects/removemembers", {
//         projectId: project._id,
//         memberEmails: project.members.email, 
//       });
  
//       if (response.status === 200) {
//         toast.success("Member removed successfully", { autoClose: 1000 });
  
//         setMembers(members.filter(m => m.email !== members.email)); 
//         onUpdate(); 
//       }
//     } catch (error) {
//       console.error("Error removing member:", error);
//       toast.error("Failed to remove member", { autoClose: 1000 });
//     }
//   };
  
  

//   return (
//     <Modal open onClose={onClose}>
//       <div style={{ padding: "20px", background: "white", margin: "10% auto", width: "400px" }}>
//         <h3>Edit Project</h3>

//         <TextField
//           label="Project Name"
//           fullWidth
//           value={projectName}
//           onChange={(e) => setProjectName(e.target.value)}
//           margin="normal"
//         />

//         <TextField
//           label="Description"
//           fullWidth
//           multiline
//           rows={3}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           margin="normal"
//         />

//         <DateTimePicker
//           label="End Date"
//           value={toDate}
//           onChange={(newValue) => setToDate(newValue)}
//           sx={{ marginTop: 2, width: "100%" }}
//         />

       
//         <Box sx={{ marginTop: 2 }}>
//           <Typography variant="subtitle1">Project Members:</Typography>
//           {members.length > 0 ? (
//             members.map((member) => (
//               <Box key={member._id} sx={{ display: "flex", alignItems: "center", gap: "10px", marginTop: 1 }}>
//                 <Typography sx={{color:'black'}}>{member.email}</Typography>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   size="small"
//                   onClick={() => handleRemoveMember(member._id)}
//                 >
//                   Remove
//                 </Button>
//               </Box>
//             ))
//           ) : (
//             <Typography variant="body2">No members in this project</Typography>
//           )}
//         </Box>

//         <Button
//           onClick={handleSave}
//           disabled={loading}
//           variant="contained"
//           color="primary"
//           sx={{ marginTop: 2 }}
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </Button>
//       </div>
//     </Modal>
//   );
// };

export default EditProjectModal;
