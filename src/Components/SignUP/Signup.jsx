import React, { useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Link,
  Button,
  Box,
  Modal
} from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { makeStyles } from "@mui/styles";
import login_icon from "../../Assets/login.png";
import "./Signup.css";
import { axiosUser } from "../../utils/api/baseUrl";
import { useNavigate } from "react-router-dom";
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
            // margin: "20px 0 15px",
            marginTop:'12px',
            marginBottom:"50px",
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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [OtpVerified, setOtpVerified] = useState(false);
  const [openModal, setopenModal] = useState(false)
  const [otp,setOtp] = useState("")
  const dispatch = useDispatch();

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // if (validateInput()) {
  //   //   console.log("form submitted");

  //     axiosUser
  //       .post(
  //         "/otpgenerate" ,{email})
  //       .then(function (response) {
  //         if (response.status === 200) {
  //           toast.success("registered successfully");
  //           // navigate("/home");
  //           setTimeout(() => {
  //             navigate("/home");
  //           }, 1000);
  //           console.log(response.data);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   // }
  // };

  //og
  // const handleGetOtp = () => {
  //   if (validateInput()) {
  //     axiosUser
  //       .post("/otpgenerate", { email })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           const otp = window.prompt("Enter the OTP sent to your email:");
  //           if (otp) {
  //             axiosUser
  //               .post("/otpverify", { email, otp })
  //               .then((verifyResponse) => {
  //                 console.log(verifyResponse);
  //                 if (
  //                   verifyResponse.status === 200 &&
  //                   verifyResponse.data.message === "OTP verified"
  //                 ) {
  //                   toast.success("OTP verified successfully");
  //                   setOtpVerified(true);
  //                 } else {
  //                   toast.error("Invalid OTP");
  //                 }
  //               })
  //               .catch((error) => {
  //                 console.log(error);
  //                 toast.error("Error verifying OTP");
  //               });
  //           }
  //         } else {
  //           toast.error("otp input is empty");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         toast.error("Error generating OTP");
  //       });
  //   }
  // };

  const handleGetOtp = () => {
    if (validateInput()) {
      axiosUser
        .post("/otpgenerate", { email })
        .then((response) => {
          if (response.status === 200) {
            // const otp = window.prompt("Enter the OTP sent to your email:");
            setopenModal(true)
            // if (otp) {
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
            //       } else {
            //         toast.error("Invalid OTP");
            //       }
            //     })
            //     .catch((error) => {
            //       console.log(error);
            //       toast.error("Error verifying OTP");
            //     });
            // }
          } else {
            toast.error("otp generation failed");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error generating OTP");
        });
    }
  };

  // const handleGetOtp =()=>{
  //   e.preventDefault()
  //   if(validateInput()){
  //     axiosUser.post('/otpgenerate',{email})
  //     .then(function (response){
  //       if(response.status===200){
  //         const otp = window.prompt('enter the otp here')
  //        if(otp){
  //         axiosUser.post('/otpverify',{email,otp})
  //         .then((verifyResponse)=>{
  //           if(verifyResponse.status===200){
  //            toast.success('otp get')
  //            handleSubmit()
  //           }
  //         }).catch((error)=>{
  //           console.log(error)
  //         })
  //        }
  //       }
  //     })
  //     .catch(()=>{
  //       console.error(error)
  //     })
  //   }
  // }


  const handleSubmitOtp =()=>{
               axiosUser
                .post("/otpverify", { email, otp })
                .then((verifyResponse) => {
                  console.log(verifyResponse);
                  if (
                    verifyResponse.status === 200 &&
                    verifyResponse.data.message === "OTP verified"
                  ) {
                    toast.success("OTP verified successfully");
                    setOtpVerified(true);
                    setopenModal(false)
                  } else {
                    toast.error("Invalid OTP");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Error verifying OTP");
                });
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!OtpVerified) {
      toast.error("please verify your otp");
      return;
    }

    if (validateInput()) {
      console.log("form submitted");

      axiosUser
        .post(
          "/signup",
          {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmpassword,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            toast.success("registered successfully");
            // navigate("/home");
            dispatch(addUser(response.data));
            localStorage.setItem("useraccessToken", response.data.accessToken);
            localStorage.setItem(
              "userrefreshToken",
              response.data.refreshToken
            );
            setTimeout(() => {
              navigate("/stepper");
            }, 2000);
            console.log(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const classes = useStyles();
  return (
    <Box className="signup-container">
      <div className="wrapper" style={{width:'650px' ,height:'500px'}}>
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
                sx={{ fontFamily: "Poppins ", marginTop:'40px' , textAlign:"center"}}
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
                sx={{marginBottom:"5px"}}
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
            <Box display="flex" flexDirection='column' justifyContent="space-between" gap='10px'>
            <Button  sx={{
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
                }} onClick={handleGetOtp}>get otp</Button>
              <Button
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
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <Button onClick={handleSubmitOtp} variant="contained" color="primary">
                Verify OTP
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <img src=""/>
    </Box>
  );
};
export default Signup;
