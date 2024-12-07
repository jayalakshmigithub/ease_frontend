
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
import { MdPendingActions } from "react-icons/md";





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
  }, [projectId,tasks]);

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
            {/* <Select
              value={task.status || ""}
              onChange={(e) => {
                e.stopPropagation(); 
                handleStatusChange(task._id, e.target.value);
              }}
            >
              {task.status !== "Completed" && (
                <>
                  <MenuItem value="ongoing">Ongoing</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </>
              )}
              <MenuItem value="Completed">Completed</MenuItem>
            </Select> */}
            <Select
  value={task.status || ""}
  onChange={(e) => {
    e.stopPropagation();
    handleStatusChange(task._id, e.target.value);
  }}
>
  <MenuItem value="ongoing">Ongoing</MenuItem>
  <MenuItem value="pending">Pending</MenuItem>
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
    label="Pending"
    icon={<MdPendingActions style={{ marginRight: "8px" }} />}
    iconPosition="start"
    value="pending"
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
       {activeTab === "pending" && (
        <Card sx={{ p: 1 }}>
          <CardContent>
            <Typography variant="h5">Pending Tasks</Typography>
            {renderTasks("pending")}
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














