import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Box,
  Grid,
  Paper,
  Stack,
  Chip,
  Hidden
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { store } from "../../utils/Redux/store";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { addUser } from "../../utils/Redux/Slice/userSlice";
import ChangePassword from "./UserPassword";
import SideBar from "../SideBar";








const UserProfile = () => {
  const userInfo = useSelector((state) => state?.user?.userInfo?.user);
  const userId = userInfo?._id;
  console.log('userId:', userId);
  console.log('userInfo:', userInfo);
  const userName = userInfo?.name;
  const email = userInfo?.email;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatarLetter: '', 
  });

  useEffect(() => {
    if (userInfo) {
      setProfile({
        name: userInfo.name || '',
        email: userInfo.email || '',
        avatarLetter: userInfo.email ? userInfo.email[0].toUpperCase() : '', 
      });
    }
  }, [userInfo]);

  const updateProfile = async () => {
    if (!userInfo) {
      console.error('User info is missing');
      return;
    }

    try {
      const formData = {
        name: profile.name,
        email: profile.email,
      };

      const response = await userAxiosInstance.put(
        `/updateprofile/${userId}`,
        { formData }
      );

      if (response.status === 200) {
        dispatch(addUser(response.data));
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error in profile update:', error);
      toast.error('An error occurred, please try again later');
    }
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      await updateProfile();
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

//   return (
//     <Box
//       sx={{
//         backgroundColor:'#0f172a',
//         width: '100vw',
//         height: '100vh',
//       }}
//     >
//       <Navbar />
      
// <Box sx={{display:'flex',flexGrow:1,flexDirection:'row'}}>


//       {/* <Typography variant="h4">My profile</Typography> */}
//       <Hidden smDown>
//                     <SideBar />
//                 </Hidden>
//       <Container maxWidth="sm">
//         <Paper elevation={2} sx={{ padding: 4,backgroundColor:"#1e293b",color:"#fff", marginTop:'55px' }}>
//           <Box display="flex" alignItems="center" flexDirection="column">
//             <Avatar
//               sx={{
//                 width: 80,
//                 height: 80,
//                 marginBottom: 2,
//                 backgroundColor: '#1976d2', 
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 fontSize: '30px', 
//                 color: '#fff', 
//               }}
//             >
//               {profile.avatarLetter || '?' /*  */}
//             </Avatar>

//             <Typography variant="h5" gutterBottom>
//               {isEditing ? (
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   name="name"
//                   value={profile.name}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 profile.name
//               )}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary">
//               {profile.email}
//             </Typography>

//             <Button
//               variant="contained"
//               onClick={handleEditToggle}
//               sx={{ alignSelf: 'center' }}
//             >
//               {isEditing ? 'Save' : 'Edit'}
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//       </Box>

//       <Box sx={{ display: 'flex', flexDirection: 'row' }}>
//         <ChangePassword />
//       </Box>
//     </Box>
//   );
return (
  <Box
    sx={{
      backgroundColor: '#0f172a',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Navbar />
    
    <Box 
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
      }}
    >
      <Hidden smDown>
        <SideBar />
      </Hidden>
      
      <Box 
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 4,
          pt: 8, 
        }}
      >
        <Paper 
          elevation={2} 
          sx={{ 
            padding: 4,
            backgroundColor: "#1e293b",
            color: "#fff",
            width: '100%',
            maxWidth: '500px', 
            mb: 3,
          }}
        >
          <Box display="flex" alignItems="center" flexDirection="column">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                marginBottom: 2,
                backgroundColor: '#2563eb', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '30px',
                color: '#fff',
              }}
            >
              {profile.avatarLetter || 'J'}
            </Avatar>

            <Typography variant="h5" gutterBottom>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                />
              ) : (
                profile.name
              )}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'gray' }}>
              {profile.email}
            </Typography>

            <Button
              variant="contained"
              onClick={handleEditToggle}
              sx={{ 
                mt: 2,
                backgroundColor: '#2563eb',
                '&:hover': {
                  backgroundColor: '#1d4ed8'
                }
              }}
            >
              {isEditing ? 'Save' : 'EDIT'}
            </Button>
          </Box>
        </Paper>

        <Paper 
          elevation={2}
          sx={{ 
            padding: 4,
            backgroundColor: "#1e293b",
            color: "#fff",
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            Keep your account secure
          </Typography>
          <Button
            variant="contained"
            sx={{ 
              mt: 2,
              backgroundColor: '#2563eb',
              '&:hover': {
                backgroundColor: '#1d4ed8'
              }
            }}
          >
            UPDATE
          </Button>
        </Paper>
      </Box>
    </Box>
  </Box>
);
}

;


export default UserProfile;
