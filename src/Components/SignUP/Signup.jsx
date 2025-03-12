import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Link,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { makeStyles } from "@mui/styles";
import login_icon from "../../Assets/login.png";
import "./Signup.css";
import { axiosUser } from "../../utils/api/baseUrl";
import { useNavigate, useLocation } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { addUser } from "../../utils/Redux/Slice/userSlice";





const Signup = () => {

  const SignuPrompt = () => {
    return (
      <div className="signup">
        <Typography
          variant="body2"
          component="p"
          sx={{
            fontSize: 13.5,
            textAlign: "center",
            marginTop: "12px",
            marginBottom: "50px",
            fontFamily: "Poppins ",
          }}
        >
          Already Have an Account?{" "}
          <Link
            href="/signin"
            underline="none"
            sx={{ ":hover": { textDecoration: "underline" } }}
          >
            Login
          </Link>
        </Typography>
      </div>
    );
  };
  const navigate = useNavigate();
  const location = useLocation();
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  // const [OtpVerified, setOtpVerified] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [workspaceId, setWorkspaceId] = useState(null);
  const dispatch = useDispatch();
  const [otpExpired, setOtpExpired] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [OtpVerified, setOtpVerified] = useState(location.state?.OtpVerified || false);
const [email, setEmail] = useState(location.state?.email || "");




  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const workspaceIdFromUrl = params.get("workspaceId");
    setWorkspaceId(workspaceIdFromUrl);
  }, [location]);

  const validateInput = () => {
    console.log("validation");
    let validationErros = {};
    let isValid = true;
    if (!name) {
      validationErros.name = "username required";
      toast.error("username required");
      isValid = false;
    }
    if (!email) {
      validationErros.email = "email is required";
      toast.error("email is required");
      isValid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      validationErros.email = "email is not valid";
      toast.error("email is not valid");
      isValid = false;
    } else {
      validationErros.email = "";
    }
    if (!password) {
      validationErros.password = "password required";
      toast.error("password is required");
      isValid = false;
    } else if (password.length < 6) {
      validationErros.password = "password must be atleast of 6 chararcters";
      toast.error("password must be atleast of 6 chararcters");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      toast.error("password must include at least one lowercase letter");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("password must include at least one UPPERCASE character");
      isValid = false;
    } else if (!/\d/.test(password)) {
      toast.error("password must include at least one number");
      isValid = false;
    } else if (!/[@$!%*?&]/.test(password)) {
      toast.error("password must include at least one specail character");
      isValid = false;
    } else {
      validationErros.password = "";
    }
    if (confirmpassword !== password) {
      validationErros.confirmpassword = "password do not match";
      toast.error("password do not match");
      isValid = false;
    } else {
      validationErros.confirmpassword = "";
    }

    return isValid;
  };


  const startOtpTimer =()=>{
    let countDown = 60
    setTimeLeft(countDown)
  

const interval = setInterval(() => {
  countDown--
  setTimeLeft(countDown)
   if(countDown===0){
    setOtpExpired(true)
    clearInterval(interval)
   }

  
}, 1000);
  }

useEffect(()=>{
  startOtpTimer()
},[])

  // const handleResendOtp = () => {
  //   setOtpExpired(false);
  //   startOtpTimer()
  //   console.log("otp resent");
  //   axiosUser
  //   .post("/otpgenerate", { email })
  //   .then((response) => {
  //     if (response.status === 200) {
  //       setopenModal(true);
  //     } else {
  //       toast.error("otp generation failed");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     toast.error("Error generating OTP");
  //   });
  // };

  const handleSubmit =async()=>{
    try {
      const userData = { name ,email , password, workspaceId }
      if(validateInput()){
        const response = await axiosUser.post("/signup", { userData  })
        console.log(response,'respomse')
        if(response.data){
          toast.success('please verify your email',{
            autoClose:1000
          })
          setTimeout(()=>{
            navigate('/otp',{ state: {response:response.data,origin:'signup'} })
          },2000)
        }        
      }
    } catch (error) {
      console.error(error,"error in response");
      toast.error("Error generating OTP");
      
    }
  }
  
  
  const handleSubmitOtp = () => {
    if (!otpExpired) {
      axiosUser
        .post("/otpverify", { email, otp,workspaceId })
        .then((verifyResponse) => {
          console.log(verifyResponse);
          if (
            verifyResponse.status === 200 &&
            verifyResponse.data.message === "OTP verified"
          ) {
            toast.success("OTP verified successfully");
            setOtpVerified(true);
            setopenModal(false);
          } else {
            toast.error("Invalid OTP");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error verifying OTP");
        });
    }
  };
  
  
  return (
    <Box className="signup-container" sx={{backgroundColor:'#0f172a'}}>
      <div className="wrapper" style={{ width: "650px", height: "500px" }}>
        {/* <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        /> */}
        <img src={login_icon} alt="Login Image" className="login-image" />
        <div className="form-box login">
          <form action="">
            <Box display="flex" justifyContent="center">
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                justifyContent="center"
                sx={{
                  fontFamily: "Poppins ",
                  marginTop: "40px",
                  textAlign: "center",
                }}
              >
                Signup
              </Typography>
            </Box>
  
            <div className="input-box">
              <TextField
                label="Username"
                placeholder="Username"
                required
                value={name}
                sx={{ marginBottom: "5px" }}
                onChange={(e) => setName(e.target.value)}
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
                label="Email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MdEmail />
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
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {/* <FaLock className="icon" /> */}
                <span onClick={togglePasswordVisibility} style={{ cursor: "pointer", marginLeft: "5px" }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </InputAdornment>
            ),
          }}
        />
            </div>
            <div className="input-box">
            <TextField
          label="Confirm Password"
          placeholder="Confirm Password"
          required
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {/* <FaLock className="icon" /> */}
                <span onClick={togglePasswordVisibility} style={{ cursor: "pointer", marginLeft: "5px" }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </InputAdornment>
            ),
          }}
        />
            </div>
  
            <div className="remember-forgot"></div>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="10px"
            >
              <Button
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
                  fontFamily: "Poppins ",
                }}
                onClick={handleSubmit}
              >
                  Sign up
              </Button>
              
            </Box>
            <SignuPrompt />
          </form>
        </div>
        <Modal
          open={openModal}
          onClose={() => setopenModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              width: 400,
              margin: "auto",
              padding: 2,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" id="modal-title">
              Enter OTP
            </Typography>
            <TextField
              label="Please enter your OTP here"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              margin="normal"
            />
  
            <Box marginTop={2}>
              {otpExpired ? (
                <Button
                
                  variant="outlined"
                  color="secondary"
                >
                  Resend OTP
                </Button>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Resend OTP in {timeLeft} seconds
                </Typography>
              )}
            </Box>
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <Button
                onClick={handleSubmitOtp}
                variant="contained"
                color="primary"
              >
                Verify OTP
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <img src="" />
    </Box>
  );
  };
  export default Signup;
























  

