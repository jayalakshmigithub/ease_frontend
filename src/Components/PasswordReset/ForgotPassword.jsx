import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import { axiosUser } from "../../utils/api/baseUrl";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter email");
      return;
    }
    try {
      const response = await axiosUser.post("/verify-email",{email:email});
      
      if(response.status==200){
        // const email = response.data?.user?.email;
        toast.success('please verify your email',{
            autoClose:1000
          })
          setTimeout(()=>{
            navigate('/otp',{ state: {response:response.data} })
          },2000)

      }   
    } catch (error) {
      if (error.response && error.response.status == 404) {
        toast.error(error.response.data.message, "error message");
      } else {
        toast.error("An error occurred while verifying email");
      }
    }
  };

  return (
    <>
      <Container
        sx={{
          backgroundImage: `
          radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
          radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
        `,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Reset Link
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ForgotPassword;
