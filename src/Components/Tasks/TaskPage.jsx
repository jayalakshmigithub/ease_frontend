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
  Select,
  Tabs,
  Tab,
  Pagination
} from "@mui/material";
import SideBar from "../SideBar";
import { useNavigate, useParams } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { MdCheckCircle } from "react-icons/md";
import { userAxiosInstance } from '../../utils/api/axiosInstance';
import AddTask from './AddTask';
// import TaskDetails from './TaskDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// const TaskPage = () => {
//   // console.log('membrs',members)
//   const [isModalOpen, setModalOpen] = useState(false);

//   const navigate = useNavigate()
//   const [tasks,setTasks] = useState([])
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [showDetails, setShowDetails] = useState({ description: false }); 
//   const [status,setStatus] = useState(tasks.status)
//   const {projectId} = useParams()
//   console.log('projectIdddd',projectId)
  
// const fetchTasks = async()=>{
//   try {
//     if(!projectId)throw new Error('project not found')
//       const response = await userAxiosInstance.get(`/projects/${projectId}/tasks`)
//     console.log('response in task page ', response.data)
//     setTasks(response.data.tasks)
//   } catch (error) {
//     console.error('error fetching tasks',error);
    
//   }
// }
// useEffect(()=>{
//   fetchTasks()
// },[])




// const handleAddNewTask = () => {
//   setModalOpen(true); 
// };

// const handleCloseModal = () => {
//   setModalOpen(false); 
// };
// // const handleTaskClick = (task) => {
// //   // Set the selected task and open the task details modal
// //   setSelectedTask(task);
// //   setIsModalOpen(true);
// // };
// const handleOpenModal = (task) => {
//   setSelectedTask({ task, showModal: true }); 
// };

// // const handleChangeStatus = (status) => {
 
// //   setSelectedTask((prev) => ({
// //     ...prev,
// //     task: { ...prev.task, task: { ...prev.task.task, status } },
// //   }));
// // };

// // const handleStatusChange = async (newStatus) => {
// //   try {
    
// //     const response = await userAxiosInstance.put(
// //       `/tasks/status`, 
// //       { taskId: tasks._id, status: newStatus } ,  
// //       // {
// //       //   params: {
// //       //     taskId: tasks._id,  
// //       //     status: newStatus   
// //       //   }
// //       // }
// //     );

   
// //     setStatus(response.data.task.status);
// //     console.log('Task status updated:', response.data);
// //   } catch (error) {
// //     console.error('Error updating task status:', error);
// //   }
// // };

// const handleStatusChange = async (taskId, newStatus) => {
//   console.log('Updating task with taskId:', taskId, 'to status:', newStatus);
//   try {
//     const response = await userAxiosInstance.put('/tasks/status', {  
//       taskId: taskId,
//       status: newStatus
//     });
//     fetchTasks()
//     console.log('Response:', response.data);
//   } catch (error) {
//     console.error('Error updating task status:', error);
//   }
// };







// return (
//   <Container>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5 }}>
//         <Button onClick={handleAddNewTask}>New Task</Button>
//       </Box>
  
//       <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt: 3 }}>
  
//         {/* Ongoing Tasks */}
//         <Card sx={{ width: "30%", cursor: "pointer", maxHeight: "500px" }}>
//           <CardContent>
//             <Typography variant="h5">Tasks</Typography>
//             <Box sx={{
//               backgroundColor: "white", 
//               mt: 2, 
//               maxHeight: "150px",  
//               overflowY: "auto",    
//               padding: 1,
//               display: "flex",
//               flexDirection: "column",
//               gap: 1                
//             }}>
//               {tasks.filter(task => task.status === "ongoing").length > 0 ? (
//                 tasks.filter(task => task.status === "ongoing").map((task, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       backgroundColor: "white",
//                       borderRadius: 1,
//                       boxShadow: 1,
//                       padding: 2,
//                       textAlign: "left",
//                       marginLeft: '10px',
//                       display: "flex",
//                       justifyContent: "space-between"
//                     }}
//                     onClick={() => handleOpenModal(task)}
//                   >
//                     <Typography>{task.name}</Typography>
//                     <Typography
//                       sx={{
//                         color: 
//                           task.priority === 'High' ? 'red' : 
//                           task.priority === 'Medium' ? 'orange' : 
//                           task.priority === 'Low' ? 'blue' : 'black'
//                       }}
//                     >
//                       {task.priority}
//                     </Typography>
//                     <FormControl>
//                       <InputLabel>Status</InputLabel>
//                       <Select
//                         value={task.status}  
//                         label="Task Status"
//                         IconComponent={ArrowDropDownIcon}
//                         onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                       >
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Completed">Completed</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography>No ongoing tasks</Typography>
//               )}
//             </Box>
//           </CardContent>
//         </Card>
  
//         {/* Completed Tasks */}
//         <Card sx={{ width: "30%", cursor: "pointer", height: "300px" }}>
//           <CardContent>
//             <Typography variant="h5">Completed</Typography>
//             <Box  sx={{
//               backgroundColor: "white", 
//               mt: 2, 
//               maxHeight: "150px",  
//               overflowY: "auto",    
//               padding: 1,
//               display: "flex",
//               flexDirection: "column",
//               gap: 1                
//             }}>
//               {tasks.filter(task => task.status === "Completed").length > 0 ? (
//                 tasks.filter(task => task.status === "Completed").map((task, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       backgroundColor: "white",
//                       borderRadius: 1,
//                       boxShadow: 1,
//                       padding: 2,
//                       textAlign: "left",
//                       marginLeft: '10px',
//                       display: "flex",
//                       justifyContent: "space-between"
//                     }}
//                     onClick={() => handleOpenModal(task)}
//                   >
//                     <Typography>{task.name}</Typography>
//                     <Typography
//                       sx={{
//                         color: 
//                           task.priority === 'High' ? 'red' : 
//                           task.priority === 'Medium' ? 'orange' : 
//                           task.priority === 'Low' ? 'blue' : 'black'
//                       }}
//                     >
//                       {task.priority}
//                     </Typography>
//                     {/* <FormControl>
//                       <InputLabel>Task Status</InputLabel>
//                       <Select
//                         value={task.status}  
//                         label="Task Status"
//                         IconComponent={ArrowDropDownIcon}
//                         onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                       >
//                         <MenuItem value="ongoing">ongoing</MenuItem>
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Completed">Completed</MenuItem>
//                       </Select>
//                     </FormControl> */}
//                   </Box>
//                 ))
//               ) : (
//                 <Typography>No completed tasks</Typography>
//               )}
//             </Box>
//           </CardContent>
//         </Card>
  
//         {/* Pending Tasks */}
//         <Card sx={{ width: "30%", cursor: "pointer", height: "300px" }}>
//           <CardContent>
//             <Typography variant="h5">Pending</Typography>
//             <Box sx={{
//               backgroundColor: "white", 
//               mt: 2, 
//               maxHeight: "150px",  
//               overflowY: "auto",    
//               padding: 1,
//               display: "flex",
//               flexDirection: "column",
//               gap: 1                
//             }}>
  
//               {tasks.filter(task => task.status === "Pending").length > 0 ? (
//                 tasks.filter(task => task.status === "Pending").map((task, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       backgroundColor: "white",
//                       borderRadius: 1,
//                       boxShadow: 1,
//                       padding: 2,
//                       textAlign: "left",
//                       marginLeft: '10px',
//                       display: "flex",
//                       justifyContent: "space-between"
//                     }}
//                     onClick={() => handleOpenModal(task)}
//                   >
//                     <Typography>{task.name}</Typography>
//                     <Typography
//                       sx={{
//                         color: 
//                           task.priority === 'High' ? 'red' : 
//                           task.priority === 'Medium' ? 'orange' : 
//                           task.priority === 'Low' ? 'blue' : 'black'
//                       }}
//                     >
//                       {task.priority}
//                     </Typography>
//                     <FormControl>
//                       <InputLabel>Task Status</InputLabel>
//                       <Select
//                         value={task.status}  
//                         label="Task Status"
//                         IconComponent={ArrowDropDownIcon}
//                         onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                       >
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Completed">Completed</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography>No tasks are pending</Typography>
//               )}
//             </Box>
//           </CardContent>
//         </Card>
  
//       </Box>
  
//       {isModalOpen && <AddTask open={isModalOpen} onClose={handleCloseModal}  fetchTasks={fetchTasks}/>}
//     </Container>
  
  
  
//   );
// }



// const TaskPage = () => {
//   const [tasks, setTasks] = useState([]);
//   const [activeTab, setActiveTab] = useState("ALL TASKS");
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const fetchTasks = async () => {
//     try {
//       if (!projectId) throw new Error("Project not found");
//       const response = await userAxiosInstance.get(`/projects/${projectId}/tasks`);
//       setTasks(response.data.tasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const handleAddNewTask = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     fetchTasks(); // Refresh tasks after closing the modal
//   };

//   const handleOpenModal = (task) => {
//     setSelectedTask(task);
//     setModalOpen(true);
//   };

//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       await userAxiosInstance.put("/tasks/status", { taskId, status: newStatus });
//       fetchTasks(); // Refresh tasks after status update
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

// //   const renderTasks = (filterStatus) => {
// //     const filteredTasks = filterStatus ? tasks.filter((task) => task.status === filterStatus) : tasks;
  
// //     return filteredTasks.length > 0 ? (
// //       filteredTasks.map((task) => (
// //         <Box
// //           key={task._id}
// //           sx={{
// //             backgroundColor: "white",
// //             borderRadius: 1,
// //             boxShadow: 1,
// //             padding: 2,
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             mb: 1,
// //             cursor: "pointer",
// //           }}
// //           onClick={() => handleOpenModal(task)}
// //         >
// //           <Typography>{task.name}</Typography>
// //           <Typography
// //             sx={{
// //               color:
// //                 task.priority === "High"
// //                   ? "red"
// //                   : task.priority === "Medium"
// //                   ? "orange"
// //                   : task.priority === "Low"
// //                   ? "blue"
// //                   : "black",
// //             }}
// //           >
// //             {task.priority}
// //           </Typography>
// //           <FormControl size="small" disabled={task.status === "Completed"}>
// //   <InputLabel>Status</InputLabel>
// //   <Select
// //     value={task.status || "Pending"} 
// //     onChange={(e) => {
// //       e.stopPropagation(); 
// //       handleStatusChange(task._id, e.target.value);
// //     }}
// //   >
// //     {task.status !== "Completed" && ( 
// //       <>
// //         <MenuItem value="Pending">Pending</MenuItem>
// //         <MenuItem value="ongoing">In Progress</MenuItem>
// //       </>
// //     )}
// //     <MenuItem value="Completed">Completed</MenuItem>
// //   </Select>
// // </FormControl>

// //         </Box>
// //       ))
// //     ) : (
// //       <Typography>No tasks available</Typography>
// //     );
// //   };
  
// // const renderTasks = (filterStatus) => {
// //   const filteredTasks = filterStatus ? tasks.filter((task) => task.status === filterStatus) : tasks;

// //   return filteredTasks.length > 0 ? (
// //     filteredTasks.map((task) => (
// //       <Box
// //         key={task._id}
// //         sx={{
// //           backgroundColor: "white",
// //           borderRadius: 1,
// //           boxShadow: 1,
// //           padding: 2,
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           mb: 1,
// //           cursor: "pointer",
// //         }}
// //         onClick={(e) => {
// //           if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") {
// //             handleOpenModal(task);
// //           }
// //         }}
// //       >
// //         <Typography>{task.name}</Typography>
// //         <Typography
// //           sx={{
// //             color:
// //               task.priority === "High"
// //                 ? "red"
// //                 : task.priority === "Medium"
// //                 ? "orange"
// //                 : task.priority === "Low"
// //                 ? "blue"
// //                 : "black",
// //           }}
// //         >
// //           {task.priority}
// //         </Typography>
// //         <FormControl size="small" disabled={task.status === "Completed"}>
// //           <InputLabel>Status</InputLabel>
// //           <Select
// //             value={task.status || "Pending"}
// //             onChange={(e) => {
// //               e.stopPropagation();
// //               handleStatusChange(task._id, e.target.value);
// //             }}
// //           >
// //             {task.status !== "Completed" && (
// //               <>
// //                 <MenuItem value="Pending">Pending</MenuItem>
// //                 <MenuItem value="ongoing">In Progress</MenuItem>
// //               </>
// //             )}
// //             <MenuItem value="Completed">Completed</MenuItem>
// //           </Select>
// //         </FormControl>
// //       </Box>
// //     ))
// //   ) : (
// //     <Typography>No tasks available</Typography>
// //   );
// // };




// const renderTasks = (filterStatus) => {
//   const filteredTasks = filterStatus
//     ? tasks.filter((task) => task.status === filterStatus)
//     : tasks;

//   return filteredTasks.length > 0 ? (
//     filteredTasks.map((task) => (
//       <Box
//         key={task._id}
//         sx={{
//           backgroundColor: "white",
//           borderRadius: 1,
//           boxShadow: 1,
//           padding: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 1,
//           cursor: "pointer",
//         }}
//         onClick={() => handleOpenModal(task)} // Open modal only on parent click
//       >
//         {/* Task Name */}
//         <Typography>{task.name}</Typography>

//         {/* Task Priority */}
//         <Typography
//           sx={{
//             color:
//               task.priority === "High"
//                 ? "red"
//                 : task.priority === "Medium"
//                 ? "orange"
//                 : task.priority === "Low"
//                 ? "blue"
//                 : "black",
//           }}
//         >
//           {task.priority}
//         </Typography>

//         {/* Task Status Dropdown */}
//         <FormControl
//           size="small"
//           disabled={task.status === "Completed"}
//           onClick={(e) => e.stopPropagation()} // Prevent click from propagating
//         >
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={task.status || "Pending"}
//             onChange={(e) => {
//               e.stopPropagation(); // Prevent parent card click
//               handleStatusChange(task._id, e.target.value);
//             }}
//           >
//             {task.status !== "Completed" && (
//               <>
//                 <MenuItem value="Pending">Pending</MenuItem>
//                 <MenuItem value="ongoing">In Progress</MenuItem>
//               </>
//             )}
//             <MenuItem value="Completed">Completed</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Any Button */}
//         <Button
//           variant="text"
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent parent card click
//             console.log("Button clicked!");
//           }}
//         >
//           Action
//         </Button>
//       </Box>
//     ))
//   ) : (
//     <Typography>No tasks available</Typography>
//   );
// };


//   return (
//     <Container>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
//         <Button variant="contained" onClick={handleAddNewTask}>New Task</Button>
//       </Box>
//       <Tabs
//         value={activeTab}
//         onChange={(e, newValue) => setActiveTab(newValue)}
//         centered
//         variant="fullWidth"
//         sx={{
//           "& .MuiTab-root": { textTransform: "none" },
//           "& .Mui-selected": { color: "#1976d2" },
//         }}
//       >
//         <Tab label="All Tasks" icon={<FaTasks />} value="ALL TASKS" />
//         <Tab label="In Progress" icon={<GiProgression />} value="IN-PROGRESS" />
//         <Tab label="Completed" icon={<MdCheckCircle />} value="COMPLETED" />
//       </Tabs>
//       <Box sx={{ mt: 3 }}>
//         {activeTab === "ALL TASKS" && (
//           <Card sx={{ p: 3 }}>
//             <CardContent>
//               <Typography variant="h5">All Tasks</Typography>
//               {renderTasks()}
//             </CardContent>
//           </Card>
//         )}
//         {activeTab === "IN-PROGRESS" && (
//           <Card sx={{ p: 3 }}>
//             <CardContent>
//               <Typography variant="h5">In Progress</Typography>
//               {renderTasks("ongoing")}
//             </CardContent>
//           </Card>
//         )}
//         {activeTab === "COMPLETED" && (
//           <Card sx={{ p: 3 }}>
//             <CardContent>
//               <Typography variant="h5">Completed Tasks</Typography>
//               {renderTasks("Completed")}
//             </CardContent>
//           </Card>
//         )}
//       </Box>
//       {isModalOpen && <AddTask open={isModalOpen} onClose={handleCloseModal} fetchTasks={fetchTasks} />}
//     </Container>
//   );
// };






//latest



const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL TASKS");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage,setCurrentPage] = useState(1)
  const { projectId } = useParams();

  const ITEMS_PER_PAGE = 2;

 

  const fetchTasks = async () => {
    try {
      if (!projectId) throw new Error("Project not found");
      const response = await userAxiosInstance.get(`/projects/${projectId}/tasks`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddNewTask = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchTasks(); 
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    console.log("Updating task:", taskId, "to status:", newStatus);
    try {
      await userAxiosInstance.put("/tasks/status", {
        taskId,
        status: newStatus,
      });
      fetchTasks(); 
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // const renderTasks = (filterStatus) => {
  //   const filteredTasks = filterStatus
  //     ? tasks.filter((task) => task.status === filterStatus)
  //     : tasks; 

  //   return filteredTasks.length > 0 ? (
  //     filteredTasks.map((task) => (
  //       <Box
  //         key={task._id}
  //         sx={{
  //           backgroundColor: "white",
  //           borderRadius: 1,
  //           boxShadow: 1,
  //           padding: 2,
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           mb: 1,
  //           cursor: "pointer",
  //         }}
  //         onClick={() => handleOpenModal(task)}
  //       >
        
  //         <Typography>{task.name}</Typography>

        
  //         <Typography
  //           sx={{
  //             color:
  //               task.priority === "High"
  //                 ? "red"
  //                 : task.priority === "Medium"
  //                 ? "orange"
  //                 : task.priority === "Low"
  //                 ? "blue"
  //                 : "black",
  //           }}
  //         >
  //           {task.priority}
  //         </Typography>

  //         {/* Task Status */}
  //         <FormControl
  //           size="small"
  //           disabled={task.status === "Completed"}
  //           onClick={(e) => e.stopPropagation()} 
  //         >
  //           <InputLabel>Status</InputLabel>
  //           <Select
  //             value={task.status || "ongoing"}
  //             onChange={(e) => {
  //               e.stopPropagation();
  //               handleStatusChange(task._id, e.target.value);
  //             }}
  //           >
  //             {task.status !== "Completed" && (
  //               <>
  //                 <MenuItem value="ongoing">Ongoing</MenuItem>
  //               </>
  //             )}
  //             <MenuItem value="Completed">Completed</MenuItem>
  //           </Select>
  //         </FormControl>
  //       </Box>
  //     ))
  //   ) : (
  //     <Typography>No tasks available</Typography>
  //   );
  // };

    
  const paginateTasks = (allTasks) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };
  const renderTasks = (filterStatus) => {
    const filteredTasks = filterStatus
      ? tasks.filter((task) => task.status === filterStatus)
      : tasks; 

    const paginatedTasks = paginateTasks(filteredTasks);

    return paginatedTasks.length > 0 ? (
      paginatedTasks.map((task) => (
        <Box
          key={task._id}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: 1,
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            cursor: "pointer",
          }}
          onClick={() => handleOpenModal(task)}
        >
       
          <Typography>{task.name}</Typography>

      
          <Typography
            sx={{
              color:
                task.priority === "High"
                  ? "red"
                  : task.priority === "Medium"
                  ? "orange"
                  : task.priority === "Low"
                  ? "blue"
                  : "black",
            }}
          >
            {task.priority}
          </Typography>

    
          <FormControl
            size="small"
            disabled={task.status === "Completed"}
            onClick={(e) => e.stopPropagation()} 
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={task.status || "ongoing"}
              onChange={(e) => {
                e.stopPropagation(); 
                handleStatusChange(task._id, e.target.value);
              }}
            >
              {task.status !== "Completed" && (
                <>
                  <MenuItem value="ongoing">Ongoing</MenuItem>
                </>
              )}
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ))
    ) : (
      <Typography>No tasks available</Typography>
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };



  return (

<>

<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0 }}>
      <Button variant="contained" onClick={handleAddNewTask} sx={{marginRight:'65px',marginBottom:'20px'}}>
        New Task
      </Button>
    </Box>
    <Container>
    
    <Tabs
  value={activeTab}
  onChange={(e, newValue) => {
    setActiveTab(newValue);
    setCurrentPage(1);
  }}
  centered
  variant="fullWidth"
  sx={{
    mb: 3,
    "& .MuiTab-root": {
      textTransform: "capitalize",
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: '#357793',
      transition: "all 0.3s ease",
      minWidth: "80px", 
      padding: "8px 16px", 
    },
    "& .Mui-selected": {
      color: '#357793',
      fontWeight: "bold",
      backgroundColor: "#f0f4ff",
      borderRadius: "8px",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#1976d2",
      height: "1px",
      borderRadius: "2px",
    },
    "& .MuiTab-root:hover": {
      color: '#357793',
    },
  }}
>
  <Tab
    label="All Tasks"
    icon={<FaTasks style={{ marginRight: "8px" }} />}
    iconPosition="start"
    value="ALL TASKS"
  />
  <Tab
    label="Ongoing"
    icon={<GiProgression style={{ marginRight: "8px" }} />}
    iconPosition="start"
    value="ongoing"
  />
  <Tab
    label="Completed"
    icon={<MdCheckCircle style={{ marginRight: "8px" }} />}
    iconPosition="start"
    value="Completed"
  />
</Tabs>


    <Box sx={{ mt: 3 }}>
      {activeTab === "ALL TASKS" && (
        <Card sx={{ p: 1 }}>
          <CardContent>
            <Typography variant="h5">All Tasks</Typography>
            {renderTasks()} 
          </CardContent>
        </Card>
      )}
      {activeTab === "ongoing" && (
        <Card sx={{ p: 1 }}>
          <CardContent>
            <Typography variant="h5">Ongoing Tasks</Typography>
            {renderTasks("ongoing")}
          </CardContent>
        </Card>
      )}
      {activeTab === "Completed" && (
        <Card sx={{ p: 1 }}>
          <CardContent>
            <Typography variant="h5">Completed Tasks</Typography>
            {renderTasks("Completed")}
          </CardContent>
        </Card>
      )}
    </Box>

  
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <Pagination
        count={Math.ceil(
          tasks.filter(
            (task) =>
              activeTab === "ALL TASKS" ||
              task.status === activeTab
          ).length / ITEMS_PER_PAGE
        )}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>

    {isModalOpen && <AddTask open={isModalOpen} onClose={handleCloseModal} fetchTasks={fetchTasks} />}
  </Container>
  </>
  );
};



export default TaskPage






    // <Container>
    //   <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
    //     <Button variant="contained" onClick={handleAddNewTask}>
    //       New Task
    //     </Button>
    //   </Box>
    //   <Tabs
    //     value={activeTab}
    //     onChange={(e, newValue) => setActiveTab(newValue)}
    //     centered
    //     variant="fullWidth"
    //     sx={{
    //       "& .MuiTab-root": { textTransform: "none" },
    //       "& .Mui-selected": { color: "#1976d2" },
    //     }}
    //   >
    //     <Tab label="All Tasks" icon={<FaTasks />} value="ALL TASKS" />
    //     <Tab label="Ongoing" icon={<GiProgression />} value="ongoing" />
    //     <Tab label="Completed" icon={<MdCheckCircle />} value="Completed" />
    //   </Tabs>
    //   <Box sx={{ mt: 3 }}>
    //     {activeTab === "ALL TASKS" && (
    //       <Card sx={{ p: 3 }}>
    //         <CardContent>
    //           <Typography variant="h5">All Tasks</Typography>
    //           {renderTasks()} 
    //         </CardContent>
    //       </Card>
    //     )}
    //     {activeTab === "ongoing" && (
    //       <Card sx={{ p: 3 }}>
    //         <CardContent>
    //           <Typography variant="h5">Ongoing Tasks</Typography>
    //           {renderTasks("ongoing")}
    //         </CardContent>
    //       </Card>
    //     )}
    //     {activeTab === "Completed" && (
    //       <Card sx={{ p: 3 }}>
    //         <CardContent>
    //           <Typography variant="h5">Completed Tasks</Typography>
    //           {renderTasks("Completed")}
    //         </CardContent>
    //       </Card>
    //     )}
    //   </Box>
    //   {isModalOpen && <AddTask open={isModalOpen} onClose={handleCloseModal} fetchTasks={fetchTasks} />}
    // </Container>














