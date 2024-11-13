// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem
// } from "@mui/material";
// import SideBar from "../SideBar";
// import { FaRegEdit } from "react-icons/fa";
// import { CgMoreVertical } from "react-icons/cg";
// import { TfiMoreAlt } from "react-icons/tfi";
// import { color } from "framer-motion";
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const TaskPage = () => {
//   const [tasks, setTasks] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);

 
//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget); 
//   };

  
//   const handleMenuItemClick = (option) => {
//     if (option === 'Open Task') {
//       console.log('Opening task...'); 
//     } else if (option === 'Delete Task') {
//       console.log('Deleting task...'); 
//     }
//     setAnchorEl(null); 
//   };

  
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <Box
//       sx={{
//         backgroundImage: `
//         radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
//         radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%)
//       `,
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         boxSizing: "border-box",
//         overflowX: "hidden",
//       }}
//     >
//       <SideBar
//         sx={{
//           backgroundColor: "white",
//           width: { xs: "100%", md: "250px" },
//           flexShrink: 0,
//         }}
//       />

//       <Box
//         sx={{
//           flexGrow: 1,
//           padding: "20px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "flex-start",
//         }}
//       >
//         <Container
//           sx={{
//             flexGrow: 1,
//             padding: "15px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "left",
//             alignItems: "flex-start",
//             backgroundColor: "transparent",
//             backdropFilter: "blur(20px)",
//             boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
//             borderRadius: "15px",
//             height: "90vh",
//             marginTop: "30px",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-start",
//               fontFamily: "Poppins",
//               marginLeft: "20px",
//             }}
//           >
//             <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
//               Tasks Overview
//             </Typography>
//           </Box>

//           <Box sx={{ flexGrow: 1, padding: "20px" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "20px",
//                 justifyContent: "flex-start",
//               }}
//             >
//               <Card
//                 sx={{
//                   minHeight: 265,
//                   minWidth: 335,
//                   maxWidth: "30%",
//                   cursor: "pointer",
//                   marginLeft: "30px",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: "15px",
//                   }}
//                 >
//                   <Typography sx={{marginLeft:'18px',marginTop:'6px'}}>Priority</Typography>
//                   <IconButton aria-label="more options" onClick={handleMenuClick}>
//           <MoreVertIcon />
//         </IconButton>
//                 </Box>

//                 <CardContent
//                   sx={{
//                     marginLeft: "8px",
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                      {/* <Box
//         sx={{
//           borderTop: '2px dotted #ccc', 
//           width: '100%', 
//           margin: '15px 0', 
//         }}
//       ></Box> */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       width: "100%",
//                     }}
//                   >
                    
//                     <Typography variant="h6" component="div">
//                       Task Name
//                     </Typography>
//                     <Typography variant="h6" component="div">
//                       Status
//                     </Typography>
                  
//                   </Box>
//                   <Box
//         sx={{
//           borderTop: '2px dotted #ccc', 
//           width: '100%', 
//           margin: '15px 0', 
//         }}
//       ></Box>
//                   <Typography color="text.secondary" component="div">
//                     Task description
//                   </Typography>
//                 </CardContent>
             
              
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: "15px",
//                     marginTop: "auto",
//                   }}
//                 >
//                   <Button
//                     sx={{ color: "#333", fontSize: "12px" ,fontFamily:'poppins'}}
//                     startIcon={<FaRegEdit  sx={{color:'#333'}}/>}
//                   >
//                     Edit
//                   </Button>
//                 </Box>

//                 <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={() => handleMenuItemClick('Open Task')}>Open Task</MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick('Delete Task')}>Delete Task</MenuItem>
//       </Menu>
//               </Card>

//               {/* Card 2 */}
//               <Card
//                 sx={{
//                   minHeight: 265,
//                   minWidth: 335,
//                   maxWidth: "30%",
//                   cursor: "pointer",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     Task Name
//                   </Typography>
//                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     Task description
//                   </Typography>
//                 </CardContent>
//               </Card>

//               {/* Card 3 */}
//               <Card
//                 sx={{
//                   minHeight: 265,
//                   minWidth: 335,
//                   maxWidth: "30%",
//                   cursor: "pointer",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     Task Name
//                   </Typography>
//                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     Task description
//                   </Typography>
//                 </CardContent>
//               </Card>

            
//             </Box>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default TaskPage;


import React,{useState,useEffect} from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import SideBar from "../SideBar";
import { useNavigate, useParams } from 'react-router-dom';
import { userAxiosInstance } from '../../utils/api/axiosInstance';
import AddTask from './AddTask';
// import TaskDetails from './TaskDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const TaskPage = () => {
  // console.log('membrs',members)
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate()
  const [tasks,setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetails, setShowDetails] = useState({ description: false }); 
  const [status,setStatus] = useState(tasks.status)
  const {projectId} = useParams()
  console.log('projectIdddd',projectId)
  
const fetchTasks = async()=>{
  try {
    if(!projectId)throw new Error('project not found')
      const response = await userAxiosInstance.get(`/projects/${projectId}/tasks`)
    console.log('response in task page ', response.data)
    setTasks(response.data.tasks)
  } catch (error) {
    console.error('error fetching tasks',error);
    
  }
}
useEffect(()=>{
  fetchTasks()
},[])




const handleAddNewTask = () => {
  setModalOpen(true); 
};

const handleCloseModal = () => {
  setModalOpen(false); 
};
// const handleTaskClick = (task) => {
//   // Set the selected task and open the task details modal
//   setSelectedTask(task);
//   setIsModalOpen(true);
// };
const handleOpenModal = (task) => {
  setSelectedTask({ task, showModal: true }); 
};

// const handleChangeStatus = (status) => {
 
//   setSelectedTask((prev) => ({
//     ...prev,
//     task: { ...prev.task, task: { ...prev.task.task, status } },
//   }));
// };

// const handleStatusChange = async (newStatus) => {
//   try {
    
//     const response = await userAxiosInstance.put(
//       `/tasks/status`, 
//       { taskId: tasks._id, status: newStatus } ,  
//       // {
//       //   params: {
//       //     taskId: tasks._id,  
//       //     status: newStatus   
//       //   }
//       // }
//     );

   
//     setStatus(response.data.task.status);
//     console.log('Task status updated:', response.data);
//   } catch (error) {
//     console.error('Error updating task status:', error);
//   }
// };

const handleStatusChange = async (taskId, newStatus) => {
  console.log('Updating task with taskId:', taskId, 'to status:', newStatus);
  try {
    const response = await userAxiosInstance.put('/tasks/status', {  
      taskId: taskId,
      status: newStatus
    });
    fetchTasks()
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};



// const handleShowDetails = (detailType) => {
//   setShowDetails((prev) => ({
//     ...prev,
//     [detailType]: !prev[detailType], 
//   }));
// };

// const handleModalClose = () => {
 
//   setModalOpen(false);
//   setSelectedTask(null); 
// };
// const handleStatusChange = (e, task) => {
//   const newStatus = e.target.value;
//   console.log(`Status for task ${task.name} updated to: ${newStatus}`);

// };

return (
<Container>
    <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5 }}>
      <Button onClick={handleAddNewTask}>New Task</Button>
    </Box>

    <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt: 3 }}>

      {/* Ongoing Tasks */}
      <Card sx={{ width: "30%", cursor: "pointer", maxHeight: "500px" }}>
        <CardContent>
          <Typography variant="h5">Tasks</Typography>
          <Box sx={{
            backgroundColor: "white", 
            mt: 2, 
            maxHeight: "150px",  
            overflowY: "auto",    
            padding: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1                
          }}>
            {tasks.filter(task => task.status === "ongoing").length > 0 ? (
              tasks.filter(task => task.status === "ongoing").map((task, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    boxShadow: 1,
                    padding: 2,
                    textAlign: "left",
                    marginLeft: '10px',
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  onClick={() => handleOpenModal(task)}
                >
                  <Typography>{task.name}</Typography>
                  <Typography
                    sx={{
                      color: 
                        task.priority === 'High' ? 'red' : 
                        task.priority === 'Medium' ? 'orange' : 
                        task.priority === 'Low' ? 'blue' : 'black'
                    }}
                  >
                    {task.priority}
                  </Typography>
                  <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={task.status}  
                      label="Task Status"
                      IconComponent={ArrowDropDownIcon}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ))
            ) : (
              <Typography>No ongoing tasks</Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      <Card sx={{ width: "30%", cursor: "pointer", height: "300px" }}>
        <CardContent>
          <Typography variant="h5">Completed</Typography>
          <Box  sx={{
            backgroundColor: "white", 
            mt: 2, 
            maxHeight: "150px",  
            overflowY: "auto",    
            padding: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1                
          }}>
            {tasks.filter(task => task.status === "Completed").length > 0 ? (
              tasks.filter(task => task.status === "Completed").map((task, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    boxShadow: 1,
                    padding: 2,
                    textAlign: "left",
                    marginLeft: '10px',
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  onClick={() => handleOpenModal(task)}
                >
                  <Typography>{task.name}</Typography>
                  <Typography
                    sx={{
                      color: 
                        task.priority === 'High' ? 'red' : 
                        task.priority === 'Medium' ? 'orange' : 
                        task.priority === 'Low' ? 'blue' : 'black'
                    }}
                  >
                    {task.priority}
                  </Typography>
                  {/* <FormControl>
                    <InputLabel>Task Status</InputLabel>
                    <Select
                      value={task.status}  
                      label="Task Status"
                      IconComponent={ArrowDropDownIcon}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <MenuItem value="ongoing">ongoing</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl> */}
                </Box>
              ))
            ) : (
              <Typography>No completed tasks</Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card sx={{ width: "30%", cursor: "pointer", height: "300px" }}>
        <CardContent>
          <Typography variant="h5">Pending</Typography>
          <Box sx={{
            backgroundColor: "white", 
            mt: 2, 
            maxHeight: "150px",  
            overflowY: "auto",    
            padding: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1                
          }}>

            {tasks.filter(task => task.status === "Pending").length > 0 ? (
              tasks.filter(task => task.status === "Pending").map((task, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    boxShadow: 1,
                    padding: 2,
                    textAlign: "left",
                    marginLeft: '10px',
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  onClick={() => handleOpenModal(task)}
                >
                  <Typography>{task.name}</Typography>
                  <Typography
                    sx={{
                      color: 
                        task.priority === 'High' ? 'red' : 
                        task.priority === 'Medium' ? 'orange' : 
                        task.priority === 'Low' ? 'blue' : 'black'
                    }}
                  >
                    {task.priority}
                  </Typography>
                  <FormControl>
                    <InputLabel>Task Status</InputLabel>
                    <Select
                      value={task.status}  
                      label="Task Status"
                      IconComponent={ArrowDropDownIcon}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ))
            ) : (
              <Typography>No tasks are pending</Typography>
            )}
          </Box>
        </CardContent>
      </Card>

    </Box>

    {isModalOpen && <AddTask open={isModalOpen} onClose={handleCloseModal}  fetchTasks={fetchTasks}/>}
  </Container>



);
}

export default TaskPage
