import React from "react";
import "./LandingPage.css";
import background_img from '../../Assets/download.jpeg'
import group from '../../Assets/group.png'
import landingUI from '../../Assets/landingUI.png'
import landing1 from '../../Assets/landing1.png'
import landing2 from '../../Assets/landing2.png'
import landing3 from '../../Assets/landing3.png'
// C:\Users\laksh\Desktop\EASE1\ease_frontend\src\Assets\groupChat.png
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
       minWidth:'auto',
       minHeight:'auto'
     }}>
       <Navbar />
      
 
       <div className="heading" >
        
        <Box sx={{display:'flex',justifyContent:'space-between',marginLeft:'40px',marginRight:'60px'}}>
  
         <Typography sx={{textAlign:'center',fontFamily:'Poppins',fontSize:'35px', color:'black',fontWeight:'bold',marginTop:'130px'}}>
         Seamlessly synchronize teams, <br/>tasks & projects with planIt. <br/>
       "Project management,Tailored for you"
       <p style={{fontSize:'15px', fontWeight:'lighter'}}>PlanIt helps you streamline workflows, track progress, and collaborate effortlessly, ensuring your team stays aligned and productive." </p>
     
      <Button className={buttOnClasses.CustomButton} onClick={handleSignupClick} sx={{fontFamily:'poppins',fontSize:'18px', backgroundColor:'#fff', color:'#3982b8',padding:'10px',borderRadius:'18px',marginTop:'15px',fontWeight:500}}>Get started</Button>
         </Typography>
         <img src={group} alt="groupChat" className="groupChat"  style={{ width: '42%', height: "42%", objectFit: "cover" ,marginTop:"40px"}}  />
         </Box>
        <Box>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#C0CFFA" fill-opacity="1" d="M0,128L34.3,154.7C68.6,181,137,235,206,218.7C274.3,203,343,117,411,117.3C480,117,549,203,617,224C685.7,245,754,203,823,165.3C891.4,128,960,96,1029,101.3C1097.1,107,1166,149,1234,170.7C1302.9,192,1371,192,1406,192L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
        </Box>
       </div>
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
