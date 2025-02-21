

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const ChangePassword = ({ userEmail }) => { 
  const userId = useSelector((state)=>state?.user?.userInfo?.user?._id);
  const [isEditing, setIsEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setPasswords((prev) => ({ ...prev, email: userEmail }));
  }, [userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setPasswords({
        email: userEmail, 
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setError("");
      setSuccess("");
    }
  };

  const changePassword = async () => {
    const { email, currentPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await userAxiosInstance.post("/change-password", {
        userId,
        password: newPassword,
        currentPassword,
      });

      if (response.data.status === 401) {
        toast.error("Error: " + response.data.message);  
        return;
      }

      setSuccess(response.data.message);
      setError("");
      toast.success("Password changed successfully!");  

      setPasswords({
        email: userEmail,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Error changing password");
      setSuccess("");
    }
  };

  return (
    <>
    <ToastContainer/>
    <Container maxWidth="sm" sx={{ marginTop: 1, }}>
      <Paper elevation={3} sx={{ padding: 2, textAlign: "center" ,backgroundColor:"#1e293b",color:'#fff'}}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography variant="h5" gutterBottom>
            Change Password
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Keep your account secure
          </Typography>

          {isEditing ? (
            <>
              <TextField
                fullWidth
                variant="outlined"
                name="currentPassword"
                type="password"
                label="Current Password"
                value={passwords.currentPassword}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                variant="outlined"
                name="newPassword"
                type="password"
                label="New Password"
                value={passwords.newPassword}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                variant="outlined"
                name="confirmPassword"
                type="password"
                label="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={handleInputChange}
              />
            </>
          ) : (
            
            <Typography variant="body1">
           
            </Typography>
          )}

          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}

          <Button
            variant="contained"
            onClick={isEditing ? changePassword : handleEditToggle}
            sx={{ mt: 2 }}
          >
            {isEditing ? "Save" : "Update"}
          </Button>
        </Box>
      </Paper>
    </Container>
    </>
  );
};

export default ChangePassword;
