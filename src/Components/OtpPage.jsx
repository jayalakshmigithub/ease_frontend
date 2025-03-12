import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosUser } from "../utils/api/baseUrl"; 
import { toast ,ToastContainer} from "react-toastify";
import { Button, TextField, Typography, Box , useMediaQuery , useTheme } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Redux/Slice/userSlice";


const OtpPage = () => {  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const { email } = location.state || {}; 
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs')); 
  const isSm = useMediaQuery(theme.breakpoints.down('sm')); 
  const isMd = useMediaQuery(theme.breakpoints.down('md')); 
  const isLg = useMediaQuery(theme.breakpoints.up('lg')); 
  
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [otpExpired, setOtpExpired] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [OtpVerified, setOtpVerified] = useState(location.state?.OtpVerified || false);
  const [workspaceId,setWorkspaceId] = useState(null)
  const response = location.state?.response?.user || "";
 
console.log(response,'response')
     const { userData} = location.state || location.state
     const {origin} = location.state
    

     useEffect(()=>{
      console.log(userData,"userData");  
     },[userData])

useEffect(()=>{
  const params = new URLSearchParams(location.search)
  const workspaceIdFromUrl = params.get("workspace")
  setWorkspaceId(workspaceIdFromUrl)
},[location])
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setOtpExpired(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, [])



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
    axiosUser
    .post("/otpgenerate", { email:response.email,userId:response._id })
    .then((response) => {
      if (response.status === 200) {
        setopenModal(true);
        console.log('hii modal')
      } else {
        toast.error("otp generation failed");
      }
    })
    .catch((error) => {
      console.log(error,'errorrrrr');

      toast.error("Error generating OTP");
    });
  };
  
 

 
 
  const handleSubmitOtp = async() => {
    
  
    if (otpExpired) {
      toast.error("OTP expired, please resend OTP");
      return;
    }
  
    try {
      const res = await axiosUser.post("/verify-otp", { userData:response, origin,otp });

     if(origin=="signup"){
      if (res.data && res.data.message === "registration success") {
        toast.success("User registration successful");
  
        dispatch(addUser(res.data));
        localStorage.setItem("useraccessToken", res.data.accessToken);
        localStorage.setItem("userrefreshToken", res.data.refreshToken);
        navigate("/stepper",{ replace: true });
      }
     }else{
          toast.success("Otp verified successfully");
          navigate('/reset-password',{state:{res:res.data.user}})
     }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === "Invalid OTP") {
        toast.error("Incorrect OTP. Please try again.");
        
      } else {
        console.error("Error verifying OTP", error);
        toast.error("Error verifying OTP. Please try again later.");
      }
    }
  };
  
 
 
  return (
  <>
 {/* <ToastContainer/> */}
    <Box
    
      sx={{
        backgroundColor:'#0f172a',
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: isXs ? "95%" : isSm ? "85%" : isMd ? "60%" : isLg ? "40%" : "50%", 
          padding: isXs || isSm ? "10px" : isMd ? "20px" : "30px",
          borderRadius: "10px",
          background: "white",
        }}
      >
        <Typography variant="h5" gutterBottom>
          OTP Verification
        </Typography>
        <Typography variant="body2" gutterBottom>
          An OTP has been sent to your email: {userData?.email}
        </Typography>

        <TextField
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          fullWidth
          sx={{ marginBottom: isXs || isSm ? "10px" : "20px" }}
        />

        <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
          {otpExpired ? (
            <Button variant="outlined" color="secondary" onClick={handleResendOtp}>
              Resend OTP
            </Button>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Resend OTP in {timeLeft} seconds
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitOtp}
            disabled={otpExpired}
          >
            Verify OTP
          </Button>
        </Box>
      </Box>
    </Box>
    </>
    
  )
};
  
  export default OtpPage;















  


