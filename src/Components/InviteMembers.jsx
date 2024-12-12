



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
import { toast ,ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PiUser } from "react-icons/pi";

// const InviteMembers = ({workspace, open, onClose, }) => {
 
  
//   const navigate = useNavigate()
//   const [email, setEmail] = useState('');
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);


 


//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // const handleAddEmail = (e) => {   
//   //   e.preventDefault();
//   //   if(validateEmail(email)){
//   //   if (email && !emails.includes(email)) {
//   //     setEmails([...emails, email]);
//   //     setEmail('');
//   //   }
//   // }else{
//   //   setError(true)
//   // }
//   // };
//   const handleAddEmail = (e) => {   
//     e.preventDefault();
//     if(validateEmail(email)){
//     if (email && !emails.includes(email)) {
//       setEmails([...emails, email]);
//       setEmail('');
//     }
//   }else{
//     setError(true)
//   }
//   };
//   const handleDeleteEmail = (emailToDelete) => {
//     setEmails(emails.filter(email => email !== emailToDelete));
//   };
 
//   const handleSubmit = async () => {
//     let updatedEmails = emails
 
//     if (email && !emails.includes(email)) {
//       updatedEmails = [...emails, email];
//       setEmails(updatedEmails);
//       setEmail('');  
//     }
  
//     setLoading(true);
//     setError(null);
   
//     const formData = { emails: updatedEmails,workspace}
//     try {
//       const response = await userAxiosInstance.post('/invite', formData);
//       if(response.status==200){
//         console.log('success')
//       }
//       if(response.error==400){
//         console.log('error')

//       }
//       toast.success('Invitation sent');
//       onClose(); 
//       setTimeout(() => {
//         navigate('/workspace');
//       }, 1000);
      
//     } catch (err) {
//       console.error('Error sending invitations:', err);
//       setError(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleSkip = () => {
//     onClose(); 
//     setTimeout(() => {
//       navigate('/home');
//     }, 500);
   
//   }

//   // useEffect(()=>{
//   //   const fetchData = async ()=>{ 
//   //       console.log(workSpace)
        
//   //   }
//   //   if(workSpace !== null)fetchData()
//   //       },[workSpace])

//   return (
//     <>
//     <ToastContainer />
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Invite Members</DialogTitle>
//       <DialogContent>
//         <Box
//           component='form'
//           sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//           autoComplete='off'
//           onSubmit={handleAddEmail}
//         >
//           <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
//             {emails.map((email, index) => (
//               <Chip
//                 key={index}
//                 label={email}
//                 onDelete={() => handleDeleteEmail(email)}
//               />
//             ))}
//           </Stack>
//           <TextField
//             fullWidth
//             label="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 handleAddEmail(e);
//               }
//             }}
//           />
//         </Box>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleSkip}>Skip</Button>
//         <Button onClick={handleSubmit} disabled={loading}>
//           {loading ? 'Sending...' : 'Submit'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//     </>
//   );
// };

const InviteMembers = ({ workspace, open, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setError(null);
      if (!emails.includes(email)) {
        setEmails([...emails, email]);
        setEmail('');
      }
    } else {
      setError('Please enter a valid email address');
    }
  };

  const handleDeleteEmail = (emailToDelete) => {
    setEmails(emails.filter((email) => email !== emailToDelete));
  };

  const handleSubmit = async () => {
    let updatedEmails = emails;

    if (email && validateEmail(email) && !emails.includes(email)) {
      updatedEmails = [...emails, email];
      setEmails(updatedEmails);
      setEmail('');
    }

    if (updatedEmails.length === 0) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = { emails: updatedEmails, workspace };

    try {
      const response = await userAxiosInstance.post('/invite', formData);

      if (response.status === 200) {
        toast.success('Invitation sent successfully');
        onClose();
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        toast.error('Failed to send invitations');
      }
    } catch (err) {
      console.error('Error sending invitations:', err);
      setError(err.response?.data?.message || 'Failed to send invitations');
      toast.error(err.response?.data?.message || 'Failed to send invitations');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onClose();
    setTimeout(() => {
      navigate('/home');
    }, 500);
  };

  return (
    <>
    <ToastContainer/>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Invite Members</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          autoComplete="off"
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddEmail(e);
              }
            }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSkip}>Skip</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};


export default InviteMembers;



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

