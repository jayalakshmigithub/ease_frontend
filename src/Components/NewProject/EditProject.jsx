import { useState } from "react";
import { Modal, TextField, Button ,Box, Typography,Dialog,DialogTitle,DialogContent,DialogActions} from "@mui/material";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { IoIosRemoveCircle } from "react-icons/io";
import Swal from "sweetalert2";

// const EditProjectModal = ({ project, onClose, onUpdate }) => {
//     const [projectName, setProjectName] = useState(project?.projectName || "");
//     const [description, setDescription] = useState(project?.Description || "");
//     const [toDate, setToDate] = useState(dayjs(project?.toDate));
//     const [loading, setLoading] = useState(false);
  
//     const handleSave = async () => {
//       try {
//         setLoading(true);
//         await userAxiosInstance.put('/projects/edit-project', {
//           _id:project._id,
//           projectName,
//           description,
//           toDate: toDate.toISOString(),
//         });
//         console.log('project in project',project)
//   toast.success('project updated successfully',{ autoClose: 1000 })
//         onUpdate(); 
//         onClose(); 
//       } catch (error) {
//         console.error("Error updating project:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     return (
//       <Modal open onClose={onClose}>
//         <div style={{ padding: "20px", background: "white", margin: "10% auto", width: "400px" }}>
//           <h3>Edit Project</h3>
          
//           <TextField
//             label="Project Name"
//             fullWidth
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             margin="normal"
//           />
          
//           <TextField
//             label="Description"
//             fullWidth
//             multiline
//             rows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             margin="normal"
//           />
  
         
  
//           <DateTimePicker
//             label="End Date"
//             value={toDate}
//             onChange={(newValue) => setToDate(newValue)}
//             sx={{ marginTop: 2, width: "100%" }}
//           />
  
//           <Button onClick={handleSave} disabled={loading} variant="contained" color="primary" sx={{ marginTop: 2 }}>
//             {loading ? "Saving..." : "Save Changes"}
          
//           </Button>
          
//         </div>
//       </Modal>
//     );
//   };



const EditProjectModal = ({ project, onClose, onUpdate }) => {
  const [projectName, setProjectName] = useState(project?.projectName || "");
  const [description, setDescription] = useState(project?.Description || "");
  const [toDate, setToDate] = useState(dayjs(project?.toDate));
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState(project?.members || []);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  console.log(members ,'members in edit ptorjct mdoal')

  const handleSave = async () => {
    try {
      setLoading(true);
      await userAxiosInstance.put("/projects/edit-project", {
        _id: project._id,
        projectName,
        description,
        toDate: toDate.toISOString(),
      });
      console.log('project in project',project)
      toast.success("Project updated successfully", { autoClose: 1000 });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setLoading(false);
    }
  };

 
  
  const handleRemoveMember = async (member) => { 
    
    console.log("Selected member:", member);
    if (!member || !member.email) {
        console.error("Invalid member object:", member);
        toast.error("Invalid member selection", { autoClose: 1000 });
        return;
    }

    try {
        const response = await userAxiosInstance.post("/projects/remove-member", {
            projectId: project._id,
            memberEmails: [member.email], 
        });

        if (response.status === 200) {
            toast.success("Member removed successfully", { autoClose: 1000 });

         
            setMembers(prevMembers => prevMembers.filter(m => m.email !== member.email));

            onUpdate(); 
        }
    } catch (error) {
        console.error("Error removing member:", error.response?.data || error);
        toast.error("Failed to remove member", { autoClose: 1000 });
    }
};


const handleDeleteProject = async () => {
  try {
    setLoading(true);
    await userAxiosInstance.post("/projects/delete-project", { projectId: project._id });
    toast.success("Project deleted successfully", { autoClose: 1000 });
    onUpdate();
    onClose();
  } catch (error) {
    console.error("Error deleting project:", error.response?.data || error);
    toast.error("Failed to delete project", { autoClose: 1000 });
  } finally {
    setLoading(false);
    setConfirmDeleteOpen(false);
  }
};

  

  return (
    <> 
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

       
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1">Project Members:</Typography>
          {members.length > 0 ? (
            members.map((member) => (
              <Box key={member._id} sx={{ display: "flex", alignItems: "center", gap: "10px", marginTop: 1 }}>
                <Typography sx={{color:'black'}}>{member.email}</Typography>
                <Button
                  color="error"
                  size="large"
                  
                  onClick={() => handleRemoveMember(member)}
                  >
                  <IoIosRemoveCircle size={20}/>
                </Button>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No members in this project</Typography>
          )}
        </Box>

        {/* <Button
          onClick={handleSave}
          disabled={loading}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          >
          {loading ? "Saving..." : "Save Changes"}
          </Button> */}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
        <Button
              onClick={() => setConfirmDeleteOpen(true)} 
              disabled={loading}
              variant="contained"
              color="error"
              >
              {loading ? "Deleting..." : "Delete Project"}
            </Button>

  <Button
    onClick={handleSave}
    disabled={loading}
    variant="contained"
    color="primary"
    >
    {loading ? "Saving..." : "Save Changes"}
  </Button>
</Box>

      </div>
    </Modal>
    <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this project? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProject} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProjectModal;
