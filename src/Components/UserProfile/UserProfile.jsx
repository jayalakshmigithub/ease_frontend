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
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { store } from "../../utils/Redux/store";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { addUser } from "../../utils/Redux/Slice/userSlice";
import ChangePassword from "./UserPassword";








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

  return (
    <Box
      sx={{
        backgroundImage: `radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%), radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%)`,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Navbar />
      <Box sx={{ borderBottom: 'dotted', borderColor: '#A2CFFE' }}></Box>

      <Typography variant="h4">My profile</Typography>

      <Container maxWidth="sm">
        <Paper elevation={2} sx={{ padding: 4 }}>
          <Box display="flex" alignItems="center" flexDirection="column">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                marginBottom: 2,
                backgroundColor: '#1976d2', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '30px', 
                color: '#fff', 
              }}
            >
              {profile.avatarLetter || '?' /*  */}
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
            <Typography variant="subtitle1" color="textSecondary">
              {profile.email}
            </Typography>

            <Button
              variant="contained"
              onClick={handleEditToggle}
              sx={{ alignSelf: 'center' }}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </Box>
        </Paper>
      </Container>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <ChangePassword />
      </Box>
    </Box>
  );
};


export default UserProfile;
