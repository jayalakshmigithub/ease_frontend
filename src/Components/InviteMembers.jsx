

// const InviteMembers = ({open,onClose}) => {
//   const [email,setEmail] = useState('');
//   const [emails,setEmails] = useState([])
   
//   const handleAddEmail =(e)=>{
//     e.preventDefault()
//     if(email !== emails.includes(email)){
//       setEmails([...emails,email])
//       setEmail('')
//     }
//   }
//   const DeleteEmail=(emailToDelete)=>{
//     setEmails(emails.filter(email=>email!==emailToDelete))
//   }
//     const handleDeleteEmail =(emailToDelete)=>{
//       DeleteEmail(emailToDelete)
      
//     }

//     const handleClick=()=>{
//       console.log('chip clicked')
//     }

//     const handleSubmit=()=>{
//       console.log({emails})
//     }
//   return (
//     <Dialog open={open} onClose ={onClose} fullWidth maxWidth="sm"> 
//     <DialogTitle>Invite Members</DialogTitle>
//     <DialogContent>
//       <Box 
//       component='form'
//       sx={{display:'flex',flexDirection:'column',gap:2}}
//       autoComplete='off'
//       onSubmit={handleAddEmail}>
//          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
//           {emails.map((email, index) => (
//             <Chip
//               key={index}
//               label={email}
//               onClick={handleClick}
//               onDelete={() => handleDeleteEmail(email)}
//             />
//           ))}
//         </Stack>
//         <TextField 
//         fullWidth 
//         label="enter emails" 
//         id="fullWidth"
//         value={email}
//         onChange={(e)=>setEmail(e.target.value)}
//         onKeyPress={(e)=>{
//           if(e.key===enter){
//           handleAddEmail(e)
//           }
//         }} >
//           enter email id
//         </TextField>
       
//       </Box>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onClose}>
//          skip
//       </Button>
//       <Button onClick={handleSubmit}>
//          submit
//       </Button>
//     </DialogActions>      
//     </Dialog>
//   )
// }

import React, { useState ,useEffect} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack,
  Chip
} from "@mui/material";

import { userAxiosInstance } from '../utils/api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const InviteMembers = ({ open, onClose,workSpace }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const workspaceId = workSpace?.workspace?._id;
  
  const handleAddEmail = (e) => {
    e.preventDefault();
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };
  const handleDeleteEmail = (emailToDelete) => {
    setEmails(emails.filter(email => email !== emailToDelete));
  };
  console.log(email)
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const formData = {emails,workspaceId}
    console.log(formData,'h')
    try {
      const response = await userAxiosInstance.post('/invite', formData,{withCredentials:true});
      console.log('Invitations sent:', response.data);
      toast.success('Invitation sent');
      onClose(); 
      setTimeout(() => {
        navigate('/home');
      }, 1000);
      
    } catch (err) {
      console.error('Error sending invitations:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  const handleSkip = () => {
    onClose(); 
    setTimeout(() => {
      navigate('/home');
    }, 500);
   
  }

  // useEffect(()=>{
  //   const fetchData = async ()=>{ 
  //       console.log(workSpace)
        
  //   }
  //   if(workSpace !== null)fetchData()
  //       },[workSpace])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Invite Members</DialogTitle>
      <DialogContent>
        <Box
          component='form'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          autoComplete='off'
          onSubmit={handleAddEmail}
        >
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {emails.map((email, index) => (
              <Chip
                key={index}
                label={email}
                onDelete={() => handleDeleteEmail(email)}
              />
            ))}
          </Stack>
          <TextField
            fullWidth
            label="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddEmail(e);
              }
            }}
          />
        </Box>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSkip}>Skip</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteMembers;

