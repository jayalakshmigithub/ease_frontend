import React , { useState }from 'react'
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { axiosAdmin } from '../../utils/api/baseUrl';
import adminLogin from '../../Assets/adminLogin.jpeg';
import {useDispatch} from 'react-redux'
import {addAdmin} from '../../utils/Redux/Slice/adminSlice'
import { toast } from "sonner";
import {
    Typography,
    TextField,
    InputAdornment,
    Checkbox,
    Link,
    Button,
    Grid,
    Box,
  } from "@mui/material";

const AdminLogin = () => {

    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleLogin = (e) => {
      e.preventDefault();
      axiosAdmin
          .post("/login", {
              email: email,
              password: password
          })
          .then((response) => {
              if (response.status === 200) {
                  toast.success('Admin logged in successfully');
                  dispatch(addAdmin(response.data))
                  localStorage.setItem(
                      "adminaccessToken",
                      response.data.accessToken
                  );
                  localStorage.setItem(
                      "adminrefreshToken",
                      response.data.refreshToken
                  );
                  navigate("/admin/*");
              } else {
                  toast.error('Not an authorized person');
              }
          })
          .catch((error) => {
              if (error.response) {
                  if (error.response.status === 400 || error.response.status === 401) {
                      toast.error(error.response.data.message || "Invalid credentials");
                  } else {
                      toast.error("Not an authorized person");
                  }
              } else {
                  toast.error("An error occurred, please try again later");
              }
          });
  };
  return (
    <div className="container">
    <div className="wrapper">
      <img src={adminLogin} alt="Login Image" className="login-image" />
      <div className="form-box login">
        <form action="">
          <Box display="flex" justifyContent="center">
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              justifyContent="center"
              sx={{ fontFamily: "Poppins ", textAlign: "center" }}
            >
              Admin Login
            </Typography>
          </Box>

          <div className="input-box">
            <TextField
              label="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ fontFamily: "Poppins " }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FaUser />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="input-box">
            <TextField
              label="Password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              sx={{ fontFamily: "Poppins " }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FaLock className="icon" />
                  </InputAdornment>
                ),
              }}
            />
           
          </div>
          <div className="remember-forgot"></div>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{
                backgroundColor: "white",
                color: "grey",
                padding: "1px 25px",
                borderRadius: "5px",
                fontSize: "18px",
                fontWeight: "normal",
                width: "100%",
                maxHeight: "35px",
                boxShadow: "0 0 5PX",
                marginTop: "20px",
                fontFamily: "Poppins ",
              }}
            >
              Login
            </Button>
          </Box>
         
         

         
        </form>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin
