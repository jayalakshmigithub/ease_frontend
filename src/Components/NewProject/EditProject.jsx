import { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
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

export default EditProjectModal;
