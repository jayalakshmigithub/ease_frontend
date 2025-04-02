
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
  Pagination,
  Tooltip
} from "@mui/material";
import SideBar from "../SideBar";
import { useNavigate, useParams } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { MdCheckCircle } from "react-icons/md";
import { userAxiosInstance } from '../../utils/api/axiosInstance';
import AddTask from './AddTask';
import { MdPendingActions } from "react-icons/md";
import TaskDetails from './TaskDetails';
import { useSelector } from 'react-redux';





const TaskPage = ({OwnerId}) => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL TASKS");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTaskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage,setCurrentPage] = useState(1)
  const { projectId } = useParams();

  const ITEMS_PER_PAGE = 2;
  const navigate = useNavigate()


 
  const userInfo  = useSelector((state) => state.user?.userInfo?.user);
const currentUser = userInfo._id;
const isOwner = currentUser === OwnerId
  const fetchTasks = async () => {
    try {
      if (!projectId) throw new Error("Project not found");
      const response = await userAxiosInstance.get(`/projects/${projectId}/tasks`);
      console.log(response.data.tasks)
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      // await userAxiosInstance.delete(`/tasks/${taskId}`);
      // fetchTasks();
      // setModalOpen(false);
      console.log('clciked deleet')
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {

    console.log("Editing task:", task);
  
    setModalOpen(false);
    setTaskDetailsModalOpen(true);
  };


  const handleAddNewTask = () => {
    setModalOpen(true);
    setTaskDetailsModalOpen(false); 
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTaskDetailsModalOpen(false);
    fetchTasks(); 
  };

  const handleOpenModal = (taskData) => {
    setSelectedTask(taskData);
    setModalOpen(false);
    setTaskDetailsModalOpen(true);
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
  }, [projectId,currentPage]);

    
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
            label="status"
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
  
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 0,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        
      </Typography>
      {/* <Button
        variant="contained"
        onClick={handleAddNewTask}
        sx={{
          backgroundColor: "#1976d2",
          fontWeight: "bold",
          padding: "10px 20px",
          marginRight:'30px',
          ":hover": { backgroundColor: "#115293" },
        }}
      >
        + New Task
      </Button> */}
      
{
  isOwner &&  <Button
  variant="contained"
  onClick={handleAddNewTask}
  disabled={!isOwner}
  sx={{
    backgroundColor: isOwner ? "#1976d2" : "#b0bec5",
    fontWeight: "bold",
    padding: "10px 20px",
    marginRight: "30px",
    ":hover": { backgroundColor: isOwner ? "#115293" : "#b0bec5" },
  }}
>
  + New Task
</Button>
}
    </Box>

    <Container>
     
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => {
          setActiveTab(newValue);
          setCurrentPage(1);
        }}
        // centered
        variant="scrollable"
        allowScrollButtonsMobile
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "capitalize",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          },
          "& .Mui-selected": {
            color: "#1976d2",
            backgroundColor: "#f0f4ff",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
          },
          "& .MuiTab-root:hover": {
            color: "#115293",
          },
          "& .MuiTabs-indicator": {
            display: "none", 
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

      {/* Task Content */}
      <Box sx={{ mt: 3 }}>
        {activeTab === "ALL TASKS" && (
          <Card
            sx={{
              mb: 3,
              p: 3,
              // boxShadow: "0px 3px 6px rgba(244, 230, 230, 0.95)",
              borderRadius: "10px",
              backgroundColor: "#1e293b",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "#fff",
                  borderBottom: "2px solid #1976d2",
                  display: "inline-block",
                  paddingBottom: "4px",
                }}
              >
                All Tasks
              </Typography>
              {renderTasks()}
            </CardContent>
          </Card>
        )}
        {activeTab === "ongoing" && (
          <Card
            sx={{
              mb: 3,
              p: 3,
              // boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              backgroundColor: "#1e293b",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "#fff",
                  borderBottom: "2px solid #1976d2",
                  display: "inline-block",
                  paddingBottom: "4px",
                }}
              >
                Ongoing Tasks
              </Typography>
              {renderTasks("ongoing")}
            </CardContent>
          </Card>
        )}
        {activeTab === "pending" && (
          <Card
            sx={{
              mb: 3,
              p: 3,
              // boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              backgroundColor:"#1e293b",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "#fff",
                  borderBottom: "2px solid #1976d2",
                  display: "inline-block",
                  paddingBottom: "4px",
                }}
              >
                Pending Tasks
              </Typography>
              {renderTasks("pending")}
            </CardContent>
          </Card>
        )}
        {activeTab === "Completed" && (
          <Card
            sx={{
              mb: 3,
              p: 3,
              // boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              backgroundColor: "#1e293b",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "#fff",
                  borderBottom: "2px solid #1976d2",
                  display: "inline-block",
                  paddingBottom: "4px",
                }}
              >
                Completed Tasks
              </Typography>
              {renderTasks("Completed")}
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Pagination */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(
            tasks.filter(
              (task) =>
                activeTab === "ALL TASKS" || task.status === activeTab
            ).length / ITEMS_PER_PAGE
          )}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: "bold",
            },
          }}
        />
      </Box>

      {/* Modals */}
      {isModalOpen && (
        <AddTask open={isModalOpen} onClose={handleCloseModal} fetchTasks={fetchTasks} />
      )}
      {isTaskDetailsModalOpen && (
        <TaskDetails
          open={isTaskDetailsModalOpen}
          task={selectedTask}
          onClose={handleCloseModal}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          currentUser={currentUser}
          OwnerId={OwnerId}
        />
      )}
    </Container>
  </>
);

};



export default TaskPage






//   return (

// <>

// <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0 }}>
//       <Button variant="contained" onClick={handleAddNewTask} sx={{marginRight:'65px',marginBottom:'20px'}}>
//         New Task
//       </Button>
//     </Box>
//     <Container>
    
//     <Tabs
//   value={activeTab}
//   onChange={(e, newValue) => {
//     setActiveTab(newValue);
//     setCurrentPage(1);
//   }}
//   centered
//   variant="fullWidth"
//   sx={{
//     mb: 3,
//     "& .MuiTab-root": {
//       textTransform: "capitalize",
//       fontSize: "1.1rem",
//       fontWeight: "bold",
//       color: '#357793',
//       transition: "all 0.3s ease",
//       minWidth: "80px", 
//       padding: "8px 16px", 
//     },
//     "& .Mui-selected": {
//       color: '#357793',
//       fontWeight: "bold",
//       backgroundColor: "#f0f4ff",
//       borderRadius: "8px",
//     },
//     "& .MuiTabs-indicator": {
//       backgroundColor: "#1976d2",
//       height: "1px",
//       borderRadius: "2px",
//     },
//     "& .MuiTab-root:hover": {
//       color: '#357793',
//     },
//   }}
// >
//   <Tab
//     label="All Tasks"
//     icon={<FaTasks style={{ marginRight: "8px" }} />}
//     iconPosition="start"
//     value="ALL TASKS"
   
//   />
//   <Tab
//     label="Ongoing"
//     icon={<GiProgression style={{ marginRight: "8px" }} />}
//     iconPosition="start"
//     value="ongoing"
//   />
//    <Tab
//     label="Pending"
//     icon={<MdPendingActions style={{ marginRight: "8px" }} />}
//     iconPosition="start"
//     value="pending"
//   />
//   <Tab
//     label="Completed"
//     icon={<MdCheckCircle style={{ marginRight: "8px" }} />}
//     iconPosition="start"
//     value="Completed"
//   />
// </Tabs>


//     <Box sx={{ mt: 3 }}>
//       {activeTab === "ALL TASKS" && (
//         <Card sx={{ p: 1 }}>
//           <CardContent>
//             <Typography variant="h5">All Tasks</Typography>
//             {renderTasks()} 
//           </CardContent>
//         </Card>
//       )}
//       {activeTab === "ongoing" && (
//         <Card sx={{ p: 1 }}>
//           <CardContent>
//             <Typography variant="h5">Ongoing Tasks</Typography>
//             {renderTasks("ongoing")}
//           </CardContent>
//         </Card>
//       )}
//        {activeTab === "pending" && (
//         <Card sx={{ p: 1 }}>
//           <CardContent>
//             <Typography variant="h5">Pending Tasks</Typography>
//             {renderTasks("pending")}
//           </CardContent>
//         </Card>
//       )}
//       {activeTab === "Completed" && (
//         <Card sx={{ p: 1 }}>
//           <CardContent>
//             <Typography variant="h5">Completed Tasks</Typography>
//             {renderTasks("Completed")}
//           </CardContent>
//         </Card>
//       )}
//     </Box>

  
//     <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
//       <Pagination
//         count={Math.ceil(
//           tasks.filter(
//             (task) =>
//               activeTab === "ALL TASKS" ||
//               task.status === activeTab
//           ).length / ITEMS_PER_PAGE
//         )}
//         page={currentPage}
//         onChange={handlePageChange}
//         color="primary"
//       />
//     </Box>

//     {isModalOpen && <AddTask open={isModalOpen} onClose={handleCloseModal} fetchTasks={fetchTasks} />}
//     {isTaskDetailsModalOpen && <TaskDetails open={isTaskDetailsModalOpen} task={selectedTask} onClose={handleCloseModal} onDelete={handleDeleteTask} onEdit={handleEditTask} currentUser={currentUser} />}

//   </Container>
 
//   </>
//   );


