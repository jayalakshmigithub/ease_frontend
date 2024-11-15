// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   TextareaAutosize,
//   IconButton,
//   Checkbox,
//   FormControlLabel
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
// import { userAxiosInstance } from '../../utils/api/axiosInstance';
// import { toast } from 'react-toastify';

// const steps = ['Task Details', 'Task Images', 'Assign Members'];

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
// };

// const AddTask = ({ open, onClose,projectId }) => {
//     const [showModal, setShowModal] = useState(false);
//     const [stepper, setStepper] = useState(0);
//     const [taskData, setTaskData] = useState({
//       name: '',
//       priority: '',
//       description: '',
//       from: '',
//       to: '',
//       projectId,
//       assignee:[]
//     });
//   console.log('projectID',projectId)
//     const handleNext = () => {
//       if (stepper < steps.length - 1) setStepper(stepper + 1);
//     };
  
//     const handleBack = () => {
//       if (stepper > 0) setStepper(stepper - 1);
//     };
  
//     const handleChange = (e) => {
//       setTaskData({
//         ...taskData,
//         [e.target.name]: e.target.value
//       });
//     };

//     const CreateTask = async(taskData)=>{
//       try {
//         const response = await userAxiosInstance.post('/tasks',taskData)
//         if(response===200){
//           toast.success("task created successfully")

//         }
//       } catch (error) {
//         toast.error('task creation failed')
//         console.error(error,'error');
        
        
//       }
//     }
//     useEffect(()=>{
//       CreateTask()
//     })
  
//     return (
//       <div>
       
//         <Modal open={open} onClose={onClose}
//           aria-labelledby="modal-title"
//          aria-describedby="modal-description"
//         >
//           <Box sx={style}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//               <Typography id="modal-title" variant="h6">
//                 Add Task
//               </Typography>
//               <IconButton onClick={() => setShowModal(false)}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//             <Stepper activeStep={stepper} alternativeLabel>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             <Box mt={3}>
//               {stepper === 0 && (
//                 <Box display="flex" flexDirection="column" gap={2}>
//                   <TextField
//                     label="Task Name"
//                     name="name"
//                     variant="outlined"
//                     fullWidth
//                     value={taskData.name}
                
//                     onChange={handleChange}
//                   />
//                   <FormControl fullWidth variant="outlined">
//                     <InputLabel>Priority</InputLabel>
//                     <Select
//                       label="Priority"
//                       name="priority"
//                       value={task.priority}
//                       onChange={handleChange}
//                     >
//                       <MenuItem value="Low">Low</MenuItem>
//                       <MenuItem value="Medium">Medium</MenuItem>
//                       <MenuItem value="High">High</MenuItem>
//                     </Select>
//                   </FormControl>
//                   <TextareaAutosize
//                     minRows={3}
//                     placeholder="Task Description"
//                     style={{ width: '100%', padding: '8px', }}
//                     name="description"
//                     value={taskData.description}
//                     onChange={handleChange}
                  
//                   />

//                   {/* <TextField
//                    minRows={3}
//                    placeholder="Task Description"
//                    style={{ width: '100%', padding: '8px' }}
//                    name="description"
//                    value={task.description}
//                    onChange={handleChange}
//                   /> */}
                  
//                   <Box display="flex" gap={2}>
//                     <TextField
//                       label="From"
//                       name="from"
//                       type="date"
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       value={taskData.from}
//                       onChange={handleChange}
//                     />
//                     <TextField
//                       label="To"
//                       name="to"
//                       type="date"
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       value={taskData.to}
//                       onChange={handleChange}
//                     />
//                   </Box>
//                 </Box>
//               )}
//               {/* {stepper === 1 && (
//                 <Box display="flex" flexDirection="column" gap={2}>
//                   <Typography variant="body1">Add Task Images</Typography>
//                   <Button variant="contained" component="label">
//                     Upload Images
//                     <input type="file" hidden multiple onChange={() => {}} />
//                   </Button>
//                 </Box>
//               )} */}
//               {stepper === 2 && (
//                 <Box display="flex" flexDirection="column" gap={2}>
//                   <Typography variant="body1">Assign task to Members</Typography>
//                   <FormControlLabel
//                     control={<Checkbox />}
//                     label="John Doe - johndoe@example.com"
//                   />
//                   <FormControlLabel
//                     control={<Checkbox />}
//                     label="Jane Smith - janesmith@example.com"
//                   />
//                 </Box>
//               )}
//             </Box>
//             <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
//               {stepper > 0 && (
//                 <Button variant="outlined" onClick={handleBack}>
//                   <GrLinkPrevious /> Back
//                 </Button>
//               )}
//               {stepper < steps.length - 1 ? (
//                 <Button variant="contained" onClick={handleNext}>
//                   Next <GrLinkNext />
//                 </Button>
//               ) : (
//                 <Button variant="contained" onClick={() => setShowModal(false) } >
//                   Create Task
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </Modal>
//       </div>
//     );
//   };

// export default AddTask



import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextareaAutosize,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { userAxiosInstance } from '../../utils/api/axiosInstance';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const steps = ['Task Details', , 'Assign Members'];
// 'Task Images'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddTask = ({ open, onClose, fetchTasks }) => {
  {console.log('hiiiiiiiii')}
  const { projectId } = useParams();
  const today = dayjs();
  const [stepper, setStepper] = useState(0);
  const [members,setMembers] = useState([])
  const [taskData, setTaskData] = useState({
    name: '',
    priority: '',
    description: '',
    // fromDate: dayjs(),
    // toDate: dayjs().add(1, "day"),
    projectId: projectId,
    assignee: []
  });
 

  const handleNext = () => {
    if (stepper < steps.length - 1) setStepper(stepper + 1);
  };

  const handleBack = () => {
    if (stepper > 0) setStepper(stepper - 1);
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value
    });
  };
    
  const fetchProjectMembers = async()=>{
    try {
      if(!projectId)throw new Error("project id is missing")
        const response = await userAxiosInstance.get(`/projects/${projectId}`)
      if(response.data.project){
        console.log('fetchedmembers',response.data.project)
        setMembers(response.data.project.members)
        console.log('members',response.data.project.members)
      }else{
        console.warn('no members found');
        
      }
    } catch (error) {
      console.error('error fetching project',error);
      
      
    }
  }
  useEffect(() => {
 fetchProjectMembers();
}, [projectId]);

useEffect(() => {
  console.log("Component re-rendered, members:", members);
}, [members]);

  
  // const handleAssigneeChange = (e) => {
  //   const value = e.target.value;
  //   setTaskData((prevData) => ({
  //     ...prevData,
  //     assignee: prevData.assignee.includes(value)
  //       ? prevData.assignee.filter((id) => id !== value)
  //       : [...prevData.assignee, value],
  //   }));
  // };
  const handleAssigneeChange = (e, members) => {
    const { _id, email } = members;
    
    setTaskData((prevData) => {
      const alreadySelected = prevData.assignee.find(
        (selected) => selected.id === _id
      );
  
      return {
        ...prevData,
        assignee: alreadySelected
          ? prevData.assignee.filter((selected) => selected.id !== _id) 
          : [...prevData.assignee, { id: _id, email }], 
      };
    });
  };


  const createTask = async () => {
    try {
      console.log('taskData before sending:', taskData);
      const response = await userAxiosInstance.post('/tasks', taskData);
      console.log('responsee in createtask', response.data);
      if (response.status === 200) {
        toast.success("Task created successfully");
        onClose(); 
        fetchTasks()
      }
    } catch (error) {
      toast.error('Task creation failed');
      console.error('Error:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="modal-title" variant="h6">Add Task</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stepper activeStep={stepper} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={3}>
          {stepper === 0 && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="name"
                name="name"
                variant="outlined"
                fullWidth
                value={taskData.name}
                onChange={handleChange}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel>Priority</InputLabel>
                <Select
                  label="Priority"
                  name="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <TextareaAutosize
                minRows={3}
                placeholder="Task Description"
                style={{ width: '100%', padding: '8px' }}
                name="description"
                value={taskData.description}
                onChange={handleChange}
              />
              {/* <Box display="flex" gap={2}>
                <TextField
                  label="From"
                  name="from"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={taskData.from}
                  onChange={handleChange}
                />
                <TextField
                  label="To"
                  name="to"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={taskData.to}
                  onChange={handleChange}
                />
              </Box> */}
            </Box>
          )}
          {stepper === 1 && (
    <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="body1">Assign task to Members</Typography>
    {members && members.length > 0 ? (
    members.map((member) => {
        console.log("Rendering member:", member);
        return (
            <FormControlLabel
                key={member._id}
                control={
                    <Checkbox
                        value={member._id}
                        checked={taskData.assignee.some(
                            (assignee) => assignee.id === member._id
                        )}
                        onChange={(e) => handleAssigneeChange(e, member)}
                    />
                }
                label={<Typography color="black">{member.email}</Typography>}
            />
        );
    })
) : (
    <Typography>No members found.</Typography>
)}

</Box>
  
         
          )}
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          {stepper > 0 && (
            <Button variant="outlined" onClick={handleBack}>
              <GrLinkPrevious /> Back
            </Button>
          )}
          {stepper < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next <GrLinkNext />
            </Button>
          ) : (
            <Button variant="contained" onClick={createTask}>
              Create Task
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTask;
