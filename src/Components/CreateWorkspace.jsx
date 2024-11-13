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

// const CreateWorkspaceForm = ({ open, onClose ,setWorkSpace,nextStep,fetchWorkspaces}) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");

//   const userInfo = useSelector((state) => state?.user?.userInfo?.user);

//   const userId = userInfo?._id;
//   const handleSubmit = async (e) => {
//     // e.preventDefault();
//     try {
 
//       const res  = await userAxiosInstance.post("/create", {
//         name: name,
//         description: description,
//         OwnerId: userId,
//       });
//       if(res.data){
//         setWorkSpace(res.data)
//         fetchWorkspaces()
//       toast.success('workspace created')
//       setTimeout(() => {
//         onClose();
//       }, 1000);
      
//       }
      
//     } catch (error) {
//       console.log("error creatign ", error);
//       setError("failed to create ");
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Create Workspace</DialogTitle>
//       <DialogContent>
//         <Box
//           component="form"
//           sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//           noValidate
//           autoComplete="off"
//           onSubmit={handleSubmit}
//         >
//           <TextField
//             label="Workspace Name"
//             variant="outlined"
//             fullWidth
//             onChange={(e) => setName(e.target.value)}
//           />
//           <TextField
//             label="description"
//             variant="outlined"
//             fullWidth
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button color="primary" type="submit" onClick={()=>{
//           handleSubmit()
//           setTimeout(() => {
//             nextStep()
//           }, 1000);
//         }}>
//           Submit
          
//         </Button>
//       </DialogActions>
//       <ToastContainer />
//     </Dialog>
//   );
// };


const CreateWorkspaceForm = ({ open, onClose, setWorkSpace,nextStep ,fetchWorkspaces,existingWorkspaceNames}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // const userInfo = useSelector((state) => state?.user?.userInfo?.user);
  // const userId = userInfo?._id;

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); 

  //   try {
  //     const res = await userAxiosInstance.post("/create", {
  //       name,
  //       description,
  //       OwnerId: userId,
  //     });

  //     if (res.data) {
  //       setWorkSpace(res.data);
  //       fetchWorkspaces(); 
  //       toast.success('Workspace created');
  //       setTimeout(() => {
  //         onClose();
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     console.log("Error creating:", error);
  //     setError("Failed to create workspace");
  //   }
  // };
  const userInfo = useSelector((state) => state?.user?.userInfo?.user);
  const userId = userInfo?._id;

  const handleSubmit = async (e) => {
  
    if (existingWorkspaceNames.includes(name.trim())) {
      toast.error("Workspace name already exists. Please choose a different name.");
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
        // if (refreshWorkspaces) {
        //   refreshWorkspaces();
        // }

        setTimeout(() => {
          onClose();
          nextStep(); // Call nextStep after onClose
        }, 1000);
      }
    } catch (error) {
      console.log("Error creating:", error);
      setError("Failed to create workspace");
    }
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Workspace</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit} 
        >
          <TextField
            label="Workspace Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
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
