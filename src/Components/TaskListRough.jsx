import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { Timeline } from '@mui/lab';
import { TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Add as AddIcon, MoreVert as MoreVertIcon,  } from '@mui/icons-material';
import { RefreshCw } from 'lucide-react';
import { format } from 'date-fns';


// Mock data
const mockTasks = [
    {
      id: '1',
      title: 'Implement Authentication',
      description: 'Set up JWT authentication for the application',
      currentStatus: 'ongoing',
      statusHistory: [
        { status: 'pending', updatedBy: 'John Doe', updatedAt: new Date('2024-02-01') },
        { status: 'ongoing', updatedBy: 'Jane Smith', updatedAt: new Date('2024-02-05') },
        { status: 'pending', updatedBy: 'Mike Johnson', updatedAt: new Date('2024-02-10') },
        { status: 'ongoing', updatedBy: 'Sarah Wilson', updatedAt: new Date('2024-02-15') },
        { status: 'completed', updatedBy: 'Tom Brown', updatedAt: new Date('2024-02-20') },
        { status: 'ongoing', updatedBy: 'Jane Smith', updatedAt: new Date('2024-02-25') }
      ],
      createdAt: new Date('2024-02-01'),
      createdBy: 'John Doe'
    },
  ];

const TaskListRough = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [isNewTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
 
const [tasks] = useState(mockTasks);

    const [isRefreshing, setIsRefreshing] = useState(false);
  
    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
      };
      
      const getFilteredTasks = () => {
        if (currentTab === 0) return tasks;
        const statusMap = ['ongoing', 'pending', 'completed'];
        return tasks.filter(task => task.currentStatus === statusMap[currentTab - 1]);
      };
      
      const handleTaskClick = (task) => {
        setSelectedTask(task);
      };
      const handleMenuClick = (event, task) => {
        setAnchorEl(event.currentTarget);
        setSelectedTask(task);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
        setSelectedTask(null);
      };
    
      const handleStatusChange = (status) => {
        if (selectedTask) {
          selectedTask.status = status; // Update status (you might need a state update or API call)
        }
        handleClose();
      };
  
    const handleRefreshTracking = () => {
      setIsRefreshing(true);
      // Simulate refresh with a timeout
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    };
  
    return (
      <Box   sx={{
        backgroundColor: "#0f172a",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1, // Adjust to fit inside parent
        boxSizing: "border-box",
        overflowX: "hidden",
        padding: { xs: 2, md: 3 }, // Ensures spacing on different screens
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ color: 'white' }}>Task Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewTaskDialogOpen(true)}
            sx={{ backgroundColor: '#3b82f6' }}
          >
            New Task
          </Button>
        </Box>
  
        <Paper sx={{ backgroundColor: '#1e293b' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': { color: 'white' },
              '& .Mui-selected': { color: '#3b82f6' },
              '& .MuiTabs-indicator': { backgroundColor: '#3b82f6' }
            }}
          >
            <Tab label="All Tasks" />
            <Tab label="Ongoing" />
            <Tab label="Pending" />
            <Tab label="Completed" />
          </Tabs>
        </Paper>
  
        <Box sx={{ 
    mt: 3, 
    flexGrow: 1, 
    overflowY: "auto", // Allow scrolling if content overflows
    maxHeight: "calc(100vh - 200px)", // Prevents excessive height
  }}>
          <List>
            {getFilteredTasks().map((task) => (
              <ListItem
                key={task.id}
                onClick={() => handleTaskClick(task)}
                sx={{
                  backgroundColor: '#1e293b',
                  mb: 2,
                  borderRadius: 1,
                  cursor: 'pointer',
                  minHeight: "60px",
                  '&:hover': { backgroundColor: '#2d3748' }
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      {task.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {task.description}
                    </Typography>
                  }
                />
                <IconButton>
                  <MoreVertIcon sx={{ color: 'white' }} />
                </IconButton>
              </ListItem>
            ))}
            
          </List>
        </Box>
  
        {/* Task Details Dialog */}
        <Dialog
          open={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: '#1e293b',
              maxHeight: '90vh',
            }
          }}
        >
          {selectedTask && (
            <>
              <DialogTitle sx={{ color: 'white', pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {selectedTask.title}
                  <IconButton
                    onClick={handleRefreshTracking}
                    sx={{
                      color: 'white',
                      animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }}
                  >
                    <RefreshCw size={20} />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3 }}>
                  {selectedTask.description}
                </Typography>
                
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Status History</Typography>
                <Timeline>
                  {selectedTask.statusHistory.map((status, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color="primary" />
                        {index < selectedTask.statusHistory.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                          {status.status.toUpperCase()}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                          Updated by {status.updatedBy} on {format(status.updatedAt, 'PPP')}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={() => setSelectedTask(null)} sx={{ color: 'white' }}>
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
  
        {/* New Task Dialog */}
        <Dialog
          open={isNewTaskDialogOpen}
          onClose={() => setNewTaskDialogOpen(false)}
          PaperProps={{
            sx: { backgroundColor: '#1e293b' }
          }}
        >
          <DialogTitle sx={{ color: 'white' }}>Create New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: '#4b5563',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#94a3b8',
                },
              }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: '#4b5563',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#94a3b8',
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewTaskDialogOpen(false)} sx={{ color: 'white' }}>
              Cancel
            </Button>
            <Button onClick={() => setNewTaskDialogOpen(false)} variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
}

export default TaskListRough
