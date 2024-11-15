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
import { addUser } from "../../utils/Redux/Slice/userSlice";



const useStyles = makeStyles({
  label: {
    color: "grey",
    fontSize: "5px",
    fontFamily: "Poppins ",
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    boxShadow: 24,
    padding: 4,
    borderRadius: 2,
  },
});

const Signup = ({isInvited}) => {

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

  const handleResendOtp = () => {
    setOtpExpired(false);
    startOtpTimer()
    console.log("otp resent");
    axiosUser
    .post("/otpgenerate", { email })
    .then((response) => {
      if (response.status === 200) {
        setopenModal(true);
      } else {
        toast.error("otp generation failed");
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error generating OTP");
    });
  };

  const handleSubmit =async()=>{
    try {
      const userData = { name ,email , password, workspaceId }
      if(validateInput()){
        const response = await axiosUser.post("/otpgenerate", { email  })
        if(response.data){
          toast.success('please verify your email',{
            autoClose:1000
          })
          setTimeout(()=>{
            navigate('/otp',{ state: {userData:userData,origin:'signup'} })
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
    <Box className="signup-container">
      <div className="wrapper" style={{ width: "650px", height: "500px" }}>
        <ToastContainer
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
        />
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
                type="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FaLock className="icon" />
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
                type="password"
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
                  onClick={handleResendOtp}
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







{/* <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!OtpVerified}
                variant="contained"
                color="primary"
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
              >
                {" "}
             
              </Button> */}

  // const handleGetOtp = () => {
  //   if (validateInput()) {
  //     axiosUser
  //       .post("/otpgenerate", { email })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setopenModal(true);
  //         } else {
  //           toast.error("otp generation failed");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         toast.error("Error generating OTP");
  //       });
  //   }
  // };

  // const handleSubmitOtp = () => {
  //   axiosUser
  //     .post("/otpverify", { email, otp })
  //     .then((verifyResponse) => {
  //       console.log(verifyResponse);
  //       if (
  //         verifyResponse.status === 200 &&
  //         verifyResponse.data.message === "OTP verified"
  //       ) {
  //         toast.success("OTP verified successfully");
  //         setOtpVerified(true);
  //         setopenModal(false);
  //       } else {
  //         toast.error("Invalid OTP");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("Error verifying OTP");
  //     });
  // };



  //OG IN REVIEW DAY CHANGING FOR OTP NEW PAGE
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!OtpVerified) {
  //       toast.error("please verify your otp");
  //       return;
  //     }
  
  //     if (validateInput()) {
  //       console.log("form submitted");
  
  //       const signupData = {
  //         name,
  //         email,
  //         password,
  //         confirmpassword: confirmpassword,
  //       };
  //       if (!isInvited) {
  //         signupData.name = name;
  //       }
        
  //       if (workspaceId) {
  //         signupData.workspaceId = workspaceId;
  //       }
  
  //       const res = await axiosUser.post(
  //         "/signup",
  //         signupData,
  //         // {
  //         //   name: name,
  //         //   email: email,
  //         //   password: password,
  //         //   confirmPassword: confirmpassword,
  //         //   workspaceId,
  //         // },
  //         { withCredentials: true }
  //       );
  //       console.log(res.data, "res waitttttttt");
  
  //       if (res.data) {
  //         if (res.status === 200) {
  //           toast.success("registered successfully");
  //           navigate("/stepper");
  //           dispatch(addUser(res.data));
  //           localStorage.setItem("useraccessToken", res.data.accessToken);
  //           localStorage.setItem("userrefreshToken", res.data.refreshToken);
  //           setTimeout(() => {
  //             navigate("/home");
  //           }, 2000);
  //           console.log("res.data logged", res.data);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error, "error in submit ");
  //   }
  // };
  
  
  
  //  ' const handleSubmit = async (e) => {
  //     e.preventDefault();
  
  //     try {
     
  //       if (!OtpVerified) {
  //         toast.error("Please verify your OTP");
  //         return;
  //       }
  
     
  //       if (validateInput()) {
  //         console.log("Form is being submitted");
  
  //         const signupData = {
  //           name,
  //           email,
  //           password,
  //         };
  
       
  
       
  //         const response = await axiosUser.post("/signup", signupData, { withCredentials: true });
  //         console.log("Server response:", response.data);
  
       
  //         if ( response.status === 200) {
  
  //           navigate("/otp", {state: {response:response.data}});
          
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error during submission:", error);
  //       toast.error("Error submitting form, please try again.");
  //     }
  //   };'
  

















  
//CHANGED TODAY FOR NEW OTP PAGE
  // const handleGetOtp = () => {
  //   if (validateInput()) {
  //     axiosUser
  //       .post("/otpgenerate", { email })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setopenModal(true);
  //         } else {
  //           toast.error("otp generation failed");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         toast.error("Error generating OTP");
  //       });
  //   }
  // };



  
  // const handleGetOtp = () => {
  //   if (validateInput()) {
  //     axiosUser
  //       .post("/otpgenerate", { email })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           toast.success("OTP generated");
  //           navigate("/otp", { state: { email, workspaceId ,name,password} });
  //         } else {
  //           toast.error("OTP generation failed");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         toast.error("Error generating OTP");
  //       });
  //   }
  // };



// <Modal
// open={openModal}
// onClose={() => setopenModal(false)}
// aria-labelledby="modal-title"
// aria-describedby="modal-description"
// >

// <Box
//   sx={{
//     width: 400,
//     margin: "auto",
//     padding: 2,
//     backgroundColor: "white",
//     borderRadius: 2,
//     boxShadow: 3,
//   }}
// >
//   <Typography variant="h6" id="modal-title">
//     Enter OTP
//   </Typography>
//   <TextField
//     label="Please enter your OTP here"
//     value={otp}
//     onChange={(e) => setOtp(e.target.value)}
//     fullWidth
//     margin="normal"
//   />
//   <Box display="flex" justifyContent="flex-end" marginTop={2}>
//     <Button
//       onClick={handleSubmitOtp}
//       variant="contained"
//       color="primary"
//     >
//       Verify OTP
//     </Button>
//   </Box>
// </Box>
// </Modal>
