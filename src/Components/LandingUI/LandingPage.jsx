import React from "react";
import "./LandingPage.css";
import background_img from '../../Assets/download.jpeg'
import {useNavigate} from 'react-router-dom'
import {
  Box,
  Typography,
  Button
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Navbar from "../Navbar/Navbar";
const useStyles = makeStyles(()=>({
  CustomButton: {
    padding: '20px 30px',
    border: 'unset',
    borderRadius: '15px',
    color: '#212121',
    zIndex: 1,
    backgroundColor: '#3982b8',
    position: 'relative',
    fontWeight: 1000,
    fontSize: '20px',
    boxShadow: '4px 8px 19px -3px rgba(0,0,0,0.27)',
    transition: 'all 250ms',
    overflow: 'hidden',
    '&:hover': {
      color: '#e8e8e8',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '0',
      borderRadius: '20px',
      backgroundColor: '#212121',
      zIndex: -1,
      boxShadow: '4px 8px 19px -3px rgba(0,0,0,0.27)',
      transition: 'all 250ms',
    },
    '&:hover::before': {
      width: '100%',
    },
  },
    


}))

// const LandingPage = () => {
//  const navigate = useNavigate()
//  const handleSignupClick=()=>{
//   navigate('/signup')
//  }
//   const buttOnClasses = useStyles()
//   return (
//     <div className="landing" style={{
//       backgroundImage: `
//         radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
//         radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
//       `
//       ,
//       width:'100vw',
//       height:'100vh'
//     }}>
//       <Navbar />
//       <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box>

//       <div className="heading" >
//         <Typography sx={{textAlign:'center',fontFamily:'Poppins',fontSize:'35px',marginTop:'60px', color:'black',fontWeight:'bold',display:'block'}}>
//         Seamlessly synchronize teams, tasks & projects with EASE. <br/>
//       "Project management, personalized for you"
//       <p style={{fontSize:'15px', fontWeight:'lighter'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt <br/>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut </p>
    
//      <Button className={buttOnClasses.CustomButton} onClick={handleSignupClick} sx={{fontFamily:'poppins',fontSize:'20px', backgroundColor:'#fff', color:'#3982b8',padding:'12px',borderRadius:'18px',marginTop:'15px'}}>Get started</Button>
//         </Typography>
     
//       </div>
//       {/* <div>
//         <Box sx={{ width:'80%',height:'500px', backgroundColor:'white', alignItems:'center',justifyContent:'center',margin:'40px auto', display:'flex'}}>
        
//         </Box>
//       </div> */}
//     </div>
//   );
// };

//OOOOOOOOGGGGGGGGGGGGGGG
// const LandingPage = () => {
//   const navigate = useNavigate()
//   const handleSignupClick=()=>{
//    navigate('/signup')
//   }
//    const buttOnClasses = useStyles()
//    return (
//      <div className="landing" style={{
//        backgroundImage: `
//          radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
//          radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
//        `
//        ,
//        width:'100vw',
//        height:'100vh'
//      }}>
//        <Navbar />
//        {/* <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box> */}
 
//        <div className="heading" >
//          <Typography sx={{textAlign:'center',fontFamily:'Poppins',fontSize:'35px',marginTop:'60px', color:'black',fontWeight:'bold',display:'block'}}>
//          Seamlessly synchronize teams, tasks & projects with EASE. <br/>
//        "Project management, personalized for you"
//        <p style={{fontSize:'15px', fontWeight:'lighter'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt <br/>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut </p>
     
//       <Button className={buttOnClasses.CustomButton} onClick={handleSignupClick} sx={{fontFamily:'poppins',fontSize:'18px', backgroundColor:'#fff', color:'#3982b8',padding:'10px',borderRadius:'18px',marginTop:'15px',fontWeight:500}}>Get started</Button>
//          </Typography>
      
//        </div>
//        {/* <div>
//          <Box sx={{ width:'80%',height:'500px', backgroundColor:'white', alignItems:'center',justifyContent:'center',margin:'40px auto', display:'flex'}}>
         
//          </Box>
//        </div> */}
//      </div>
//    );
//  };

// export default LandingPage;






const LandingPage = () => {
  const navigate = useNavigate()
  const handleSignupClick=()=>{
   navigate('/signup')
  }
   const buttOnClasses = useStyles()
   return (
     <div className="landing" style={{
       backgroundImage: `
         radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
         radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
       `
       ,
       width:'100vw',
       height:'100vh'
     }}>
       <Navbar />
       {/* <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box> */}
 
       <div className="heading" >
         <Typography sx={{textAlign:'center',fontFamily:'Poppins',fontSize:'35px',marginTop:'60px', color:'black',fontWeight:'bold',display:'block'}}>
         Seamlessly synchronize teams, tasks & projects with planIt. <br/>
       "Project management, personalized for you"
       <p style={{fontSize:'15px', fontWeight:'lighter'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt <br/>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut </p>
     
      <Button className={buttOnClasses.CustomButton} onClick={handleSignupClick} sx={{fontFamily:'poppins',fontSize:'18px', backgroundColor:'#fff', color:'#3982b8',padding:'10px',borderRadius:'18px',marginTop:'15px',fontWeight:500}}>Get started</Button>
         </Typography>
      
       </div>
       {/* <div>
         <Box sx={{ width:'80%',height:'500px', backgroundColor:'white', alignItems:'center',justifyContent:'center',margin:'40px auto', display:'flex'}}>
         
         </Box>
       </div> */}
     </div>
   );
 };

export default LandingPage;

















































// const linkStyles = {
//   ':hover':{textDecoration:'underline'},
//   color:'#333',
//   fontWeight:600,
//   marginLeft:'1rem',
//   fontFamily:'poppins',
//   fontSize:20
// }
// const useStyles = makeStyles(()=>({
//   separator:{
//     width: "1px",
//     height:'5px%',
//     color:'black',
//     display:'inline-block',
//     margin:'0 10px',
//     borderLeft:'2px solid grey',
//     height:'100%',
//     verticalAlign:'middle'
//   },
// }))
// function VerticalLine(){
//   const classes = useStyles();
//   return(
//     <Box className={classes.separator}></Box>
//   )
// }
{
  /* <div>
      <nav sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}} >
        
        <ul style={{listStyle:'none',display:'flex'}}>
        
          <li><Link href='#'underline='none' sx={{...linkStyles}}>About Us</Link></li>
          <li><Link href='#'underline='none' sx={{...linkStyles}}>Features</Link></li>
          <li><Link href='#'underline='none' sx={{...linkStyles}}>Blog</Link></li>
          <li><Link href='#'underline='none' sx={{...linkStyles}}>Contact</Link></li>

        <Button style={{height:'2.5vh' , display:'flex',alignItems:'center', marginLeft:'1rem'}}>Log in</Button>
       <VerticalLine/>
        <Button style={{height:'2.5vh' , display:'flex',alignItems:'center', marginLeft:'1rem'}}>Get started</Button>
        </ul>
      </nav>
      </div> */
}
