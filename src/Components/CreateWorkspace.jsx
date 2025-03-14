import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { useSelector } from "react-redux";
import { userAxiosInstance } from "../utils/api/axiosInstance";
import { ToastContainer,toast } from 'react-toastify';



const CreateWorkspaceForm = ({ open, onClose, setWorkSpace,nextStep ,fetchWorkspaces,existingWorkspaceNames,fromStepper=false}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

 
  const userInfo = useSelector((state) => state?.user?.userInfo?.user);
  const userId = userInfo?._id;
  console.log('hiii userId',userId)

  const handleSubmit = async (e) => {
  
    if (!fromStepper&&existingWorkspaceNames.includes(name.trim())) {
      toast.error("Workspace name already exists. Please choose a different name.");
      return;
    }
    if (name.trim() === "" || description.trim() === "") {
      toast.error("Name and description are required.");
      return;
    }
    
   

    try {
      const res = await userAxiosInstance.post("/create", {
        name: name.trim(),
        description,
        OwnerId: userId,
      });

      if (res.data) {
        setWorkSpace(res.data);
        fetchWorkspaces(); 
        toast.success('Workspace created');
        

        setTimeout(() => {
          onClose();
          nextStep(); 
        }, 1000);
      }
    } catch (error) {
      console.log("Error creating:", error);
      setError("Failed to create workspace");
    }
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{  backgroundColor: "#1e293b",color:'#007FFF'}}>Create Workspace</DialogTitle>
      <Box sx={{  backgroundColor: "#1e293b",}}>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 ,}}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit} 
          
        >
          <TextField
            label="Workspace Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{
              sx: {
                color: '#FAF9F6', 
              },
            }}
            InputProps={{
              sx: {
                color: "white"
              },
            }}
        
          
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{
              sx: {
                color: '#FAF9F6', 
              },
            }}
            InputProps={{
              sx: {
                color: "white"
              },
            }}
          />
        </Box>
      </DialogContent>
      </Box>
      <DialogActions sx={{  backgroundColor: "#1e293b",}}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" type="submit" onClick={()=>{
          handleSubmit()
          setTimeout(() => {
            nextStep()
          }, 1000);
        }}>
          Submit
          
        </Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
};


export default CreateWorkspaceForm;
