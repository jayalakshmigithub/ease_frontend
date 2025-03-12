import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import login_icon from "../../Assets/login.png";
import { addUser } from "../../utils/Redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import config from "../../config/config";

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

import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { color, display, height, margin, width } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { axiosUser } from "../../utils/api/baseUrl";
// import { toast } from "sonner";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginGoogle from "./LoginGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link as RouterLink } from 'react-router-dom';
// import { addUser } from "../../utils/Redux/Slice/userSlice";

const useStyles = makeStyles(() => ({
  separator: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    margin: "15px 0",
    fontFamily: "Poppins ",
  },
  line: {
    flex: 1,
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    margin: "0 10px",
  },
  span: {
    color: "grey",
  }, 
}));

function OrSeparator() {
  const classes = useStyles();
  return (
    <Box className={classes.separator}>
      <Box className={classes.line} />
      <span className={classes.span}>or</span>
      <Box className={classes.line} />
    </Box>
  );
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

 


  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password, "login");
    axiosUser
      .post("/signin", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(addUser(response?.data))
          localStorage.setItem(
            "useraccessToken",
            response.data.accessToken
        );
        localStorage.setItem(
            "userrefreshToken",
            response.data.refreshToken
        );
          toast.success("logged in succesfully");
          console.log('naviagting to homee',response.status)
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log('Calling toast error');
        if(error.response){
          const status = error.response.status

          if(status===403){
            toast.error(error.response.data.message||"user is blocked , please contact admin ")
          }else if ( status === 401){
            toast.error(error.response.data.message || "Invalid email or password.");
          }else{
            toast.error(error.response.data.message || "An unexpected error occurred.");
          }
        }else{
          toast.error("Internal server error, please try again later.");
        }
        console.log(error);
      });
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };
  return (
    <Box sx={{backgroundColor: '#0f172a'}}>
    <div className="container">
      <div className="wrapper">
        <img src={login_icon} alt="Login Image" className="login-image" />
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
                Login
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
             <Box display="flex" justifyContent="flex-end">
        <Typography variant="body2" component="p">
          <Link
            component={RouterLink}
            to="/forgotpassword"
            underline="none"
            sx={{
              ":hover": { textDecoration: "underline" },
              fontFamily: "Poppins",
            }}
          >
            Forgot Password?
          </Link>
        </Typography>
      </Box>
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
            <OrSeparator />
            <div className="google-signin">
              <Box display={"flex"} justifyContent={"center"}>
                {/* <Button
                  endIcon={<FcGoogle />}
                  sx={{
                    border: "1px solid",
                    borderColor: "lightgray",
                    color: "gray",
                    width: "100%",
                    fontFamily: "Poppins ",
                    "&:hover": {
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  Sign in with google
                </Button> */}
                <GoogleOAuthProvider
                  clientId={config.GOOGLE_CLIENT_ID}
                >
                  <LoginGoogle />
                </GoogleOAuthProvider>
              </Box>
            </div>

            <div className="signup">
              <Typography
                variant="body2"
                component="p"
                sx={{
                  fontSize: 13.5,
                  textAlign: "center",
                  margin: "20px 0 15px",
                  fontFamily: "Poppins ",
                }}
              >
                Don't Have an Account?{" "}
                <Link
                  href="/signup"
                  underline="none"
                  sx={{ ":hover": { textDecoration: "underline" } }}
                  onClick={handleSignupClick}
                >
                  Sign Up
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
    </Box>
  );
};

export default Login;
