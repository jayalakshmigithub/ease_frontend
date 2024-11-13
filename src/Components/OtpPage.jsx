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
  const [OtpVerified, setOtpVerified] = useState(location.state?.OtpVerified || false);
  const [workspaceId,setWorkspaceId] = useState(null)
 

     const { userData} = location.state || location.state
     const {origin} = location.state
    

     useEffect(()=>{
      console.log(userData,"userData");  
     },[userData])
      

  
 
  
// for get the workspace 

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
    .post("/otpgenerate", { email:userData.email })
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
  
  // const handleSubmitOtp = async() => {
  //   console.log('verify button clicked')

  //   if (otpExpired) {
  //     toast.error("OTP expired, please resend OTP");
  //     return;
  //   }

  //   try {
  //     console.log('hi here')
  //     const res = await axiosUser.post("/otpverify", { userData , otp })
  //     if(res.data && res.data.message === "registration success"){
  //       toast.success("user registration successful")

  //       dispatch(addUser(res.data));
  //       localStorage.setItem("useraccessToken", res.data.accessToken);
  //       localStorage.setItem("userrefreshToken", res.data.refreshToken);
  //       console.log('navigating to stepper')
        

  //        navigate("/stepper");

        
  //         // setTimeout(() => {
  //         //   navigate("/home");
  //         // }, 5000);
  //     }

  //   } catch (error) {
  //     if(error.response&&error.response.status===400&&error.response.data.message==="Invalid OTP"){
  //       console.log('wrong otp')
  //       toast.error('you entered an incorrect otp')
  //     }else{
  //       console.error("Error verifying OTP", error);
  //       toast.error("Error verifying OTP");
  //     }
     
  //   }


  // };

  // return (
  // <Box
  //  sx={{
  //    backgroundImage: `
  //      radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
  //      radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
  //    `,
  //    width: "100vw",
  //    height: "100vh",
  //    display: "flex",
  //    justifyContent: "center",
  //    alignItems: "center",
  //  }}
  // >
  
  //  <Box
  //    sx={{
  //      display: "flex",
  //      flexDirection: "column",
  //      justifyContent: "center",
  //      alignItems: "center",
  //      width: { xs: "90%", sm: "400px" }, 
  //      padding: "20px",
  //      borderRadius: "10px",
  //      background: "white",
  //      boxShadow: "3px 6px 15px rgba(192, 207, 250, 0.7)",
  //    }}
  //  >
  //    <Typography variant="h5" gutterBottom>OTP Verification</Typography>
  //    <Typography variant="body2" gutterBottom>An OTP has been sent to your email: {userData?.email}</Typography>
     
    
  //    <TextField
  //      label="Enter OTP"
  //      value={otp}
  //      onChange={(e) => setOtp(e.target.value)}
  //      fullWidth
  //      sx={{ marginBottom: "20px" }} 
  //    />
  
  //    <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
  //      {otpExpired ? (
  //        <Button variant="outlined" color="secondary" onClick={handleResendOtp}>
  //          Resend OTP
  //        </Button>
  //      ) : (
  //        <Typography variant="body2" color="textSecondary">
  //          Resend OTP in {timeLeft} seconds
  //        </Typography>
  //      )}
  
  //      <Button
  //        variant="contained"
  //        color="primary"
  //        onClick={handleSubmitOtp}
  //        disabled={otpExpired}
  //      >
  //        Verify OTP
  //      </Button>
  //    </Box>
  //  </Box>
  // </Box>
  // );
  // };

 
 
  const handleSubmitOtp = async() => {
    // toast.error("Testing toast visibility on function call");
  
    if (otpExpired) {
      toast.error("OTP expired, please resend OTP");
      return;
    }
  
    try {
      const res = await axiosUser.post("/verify-otp", { userData, origin,otp });

     if(origin=="signup"){
      if (res.data && res.data.message === "registration success") {
        toast.success("User registration successful");
  
        dispatch(addUser(res.data));
        localStorage.setItem("useraccessToken", res.data.accessToken);
        localStorage.setItem("userrefreshToken", res.data.refreshToken);
        navigate("/stepper");
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
 <ToastContainer/>
    <Box
    
      sx={{
        backgroundImage: `
          radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
          radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
        `,
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
          boxShadow: "3px 6px 15px rgba(192, 207, 250, 0.7)",
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






// const handleSubmitOtp = () => {
//     if (otpExpired) {
//       toast.error("OTP expired, please resend OTP");
//       return;
//     }

//     axiosUser.post("/otpverify", { email, otp })
//       .then((response)=>{
//         // const {user} = response.data
//         if (response.data && response.status === 200 && response.data.message === "OTP verified") {
            
//             dispatch(addUser(response.data));
//             localStorage.setItem("useraccessToken", response.data.accessToken);
//             localStorage.setItem("userrefreshToken", response.data.refreshToken);
//             navigate("/stepper");
         
         
//             dispatch(addUser(response.data));
  
         
//             navigate("/stepper");

  
//             console.log("res.data logged", response.data);
  
//           } else {
//             toast.error("Invalid OTP, please try again");
//           }
     
       

//       })
//       .catch(error => {
//         console.error("Error verifying OTP", error);
//         toast.error("Error verifying OTP");
//       });

          
         

       
          

       
       

        
// //           setTimeout(() => {
// //             navigate("/home");
// //           }, 2000);

// //           console.log("res.data logged", response.data);

// //         } else {
// //           toast.error("Invalid OTP, please try again");
// //         }
// //       })
      
// //   };
// }
