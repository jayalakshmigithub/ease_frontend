// import React from "react";
// import "./LandingPage.css";
// import background_img from '../../Assets/download.jpeg'
// import group from '../../Assets/group.png'
// import landingUI from '../../Assets/landingUI.png'
// import landing1 from '../../Assets/landing1.png'
// import landing2 from '../../Assets/landing2.png'
// import landing3 from '../../Assets/landing3.png'
// // C:\Users\laksh\Desktop\EASE1\ease_frontend\src\Assets\groupChat.png
// import {useNavigate} from 'react-router-dom'
// import {
//   Box,
//   Typography,
//   Button
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import Navbar from "../Navbar/Navbar";
// const useStyles = makeStyles(()=>({
//   CustomButton: {
//     padding: '20px 30px',
//     border: 'unset',
//     borderRadius: '15px',
//     color: '#212121',
//     zIndex: 1,
//     backgroundColor: '#3982b8',
//     position: 'relative',
//     fontWeight: 1000,
//     fontSize: '20px',
//     boxShadow: '4px 8px 19px -3px rgba(0,0,0,0.27)',
//     transition: 'all 250ms',
//     overflow: 'hidden',
//     '&:hover': {
//       color: '#e8e8e8',
//     },
//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       height: '100%',
//       width: '0',
//       borderRadius: '20px',
//       backgroundColor: '#212121',
//       zIndex: -1,
//       boxShadow: '4px 8px 19px -3px rgba(0,0,0,0.27)',
//       transition: 'all 250ms',
//     },
//     '&:hover::before': {
//       width: '100%',
//     },
//   },
    


// }))







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
//        minWidth:'auto',
//        minHeight:'auto'
//      }}>
//        <Navbar />
      
 
//        <div className="heading" >
        
//         <Box sx={{display:'flex',justifyContent:'space-between',marginLeft:'40px',marginRight:'60px'}}>
  
//          <Typography sx={{textAlign:'center',fontFamily:'Poppins',fontSize:'35px', color:'black',fontWeight:'bold',marginTop:'130px'}}>
//          Seamlessly synchronize teams, <br/>tasks & projects with planIt. <br/>
//        "Project management,Tailored for you"
//        <p style={{fontSize:'15px', fontWeight:'lighter'}}>PlanIt helps you streamline workflows, track progress, and collaborate effortlessly, ensuring your team stays aligned and productive." </p>
     
//       <Button className={buttOnClasses.CustomButton} onClick={handleSignupClick} sx={{fontFamily:'poppins',fontSize:'18px', backgroundColor:'#fff', color:'#3982b8',padding:'10px',borderRadius:'18px',marginTop:'15px',fontWeight:500}}>Get started</Button>
//          </Typography>
//          <img src={group} alt="groupChat" className="groupChat"  style={{ width: '42%', height: "42%", objectFit: "cover" ,marginTop:"40px"}}  />
        
//          </Box>

//         <Box>
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#C0CFFA" fill-opacity="1" d="M0,128L34.3,154.7C68.6,181,137,235,206,218.7C274.3,203,343,117,411,117.3C480,117,549,203,617,224C685.7,245,754,203,823,165.3C891.4,128,960,96,1029,101.3C1097.1,107,1166,149,1234,170.7C1302.9,192,1371,192,1406,192L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
//         </Box>
        
        
      
//        </div>
//      </div>
//    );
//  };

// export default LandingPage;

















































// // const linkStyles = {
// //   ':hover':{textDecoration:'underline'},
// //   color:'#333',
// //   fontWeight:600,
// //   marginLeft:'1rem',
// //   fontFamily:'poppins',
// //   fontSize:20
// // }
// // const useStyles = makeStyles(()=>({
// //   separator:{
// //     width: "1px",
// //     height:'5px%',
// //     color:'black',
// //     display:'inline-block',
// //     margin:'0 10px',
// //     borderLeft:'2px solid grey',
// //     height:'100%',
// //     verticalAlign:'middle'
// //   },
// // }))
// // function VerticalLine(){
// //   const classes = useStyles();
// //   return(
// //     <Box className={classes.separator}></Box>
// //   )
// // }
// {
//   /* <div>
//       <nav sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}} >
        
//         <ul style={{listStyle:'none',display:'flex'}}>
        
//           <li><Link href='#'underline='none' sx={{...linkStyles}}>About Us</Link></li>
//           <li><Link href='#'underline='none' sx={{...linkStyles}}>Features</Link></li>
//           <li><Link href='#'underline='none' sx={{...linkStyles}}>Blog</Link></li>
//           <li><Link href='#'underline='none' sx={{...linkStyles}}>Contact</Link></li>

//         <Button style={{height:'2.5vh' , display:'flex',alignItems:'center', marginLeft:'1rem'}}>Log in</Button>
//        <VerticalLine/>
//         <Button style={{height:'2.5vh' , display:'flex',alignItems:'center', marginLeft:'1rem'}}>Get started</Button>
//         </ul>
//       </nav>
//       </div> */
// }
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logo from '../../Assets/logo.png'
// import { BarChart3,} from "lucide-react";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  Layers,
  Clock,
  Users,
  BarChart3,
  Zap,
  Shield,
  MessageSquare,
  CheckCircle2,
  Target,
  Rocket,
  TrendingUp,
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// const darkTheme = createTheme({

//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#3366FF',
//     },
//     background: {
//       default: '#0A0F1E',
//       paper: '#141B2D',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontSize: '4rem',
//       fontWeight: 700,
//       lineHeight: 1.2,
//     },
//     h2: {
//       fontSize: '2.5rem',
//       fontWeight: 600,
//       marginBottom: '2rem',
//     },
//     h3: {
//       fontSize: '1.5rem',
//       fontWeight: 600,
//       marginBottom: '1rem',
//     },
//     subtitle1: {
//       fontSize: '1.25rem',
//       lineHeight: 1.6,
//       color: '#94A3B8',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: '8px',
//           textTransform: 'none',
//           padding: '10px 24px',
//           fontSize: '1rem',
//         },
//         containedPrimary: {
//           background: 'linear-gradient(135deg, #3366FF 0%, #6366F1 100%)',
//           '&:hover': {
//             background: 'linear-gradient(135deg, #2952CC 0%, #5253C4 100%)',
//           },
//         },
//       },
//     },
//   },
// });

// const features = [
//   {
//     icon: <Clock size={24} />,
//     title: 'Time Tracking',
//     description: 'Track time spent on tasks and projects with precision',
//   },
//   {
//     icon: <Users size={24} />,
//     title: 'Team Collaboration',
//     description: 'Work seamlessly with your team members in real-time',
//   },
//   {
//     icon: <BarChart3 size={24} />,
//     title: 'Analytics',
//     description: 'Get insights into project progress and team performance',
//   },
//   {
//     icon: <Zap size={24} />,
//     title: 'Automation',
//     description: 'Automate repetitive tasks and workflows',
//   },
//   {
//     icon: <Shield size={24} />,
//     title: 'Security',
//     description: 'Enterprise-grade security for your project data',
//   },
//   {
//     icon: <MessageSquare size={24} />,
//     title: 'Communication',
//     description: 'Built-in chat and commenting system for teams',
//   },
// ];

// const testimonials = [
//   {
//     quote: "SyncPlus has transformed how our team manages projects. It's intuitive and powerful.",
//     author: "Sarah Johnson",
//     position: "Project Manager, TechCorp"
//   },
//   {
//     quote: "The best project management tool we've used. It's helped us increase productivity by 40%.",
//     author: "Michael Chen",
//     position: "CEO, Innovation Labs"
//   },
// ];

// const stats = [
//   { value: '10K+', label: 'Active Users' },
//   { value: '50M+', label: 'Tasks Completed' },
//   { value: '99.9%', label: 'Uptime' },
//   { value: '24/7', label: 'Support' },
// ];

// const steps = [
//   {
//     icon: <CheckCircle2 size={32} />,
//     title: 'Create Your Workspace',
//     description: 'Set up your team workspace in minutes with our intuitive onboarding process',
//   },
//   {
//     icon: <Target size={32} />,
//     title: 'Set Goals & Milestones',
//     description: 'Define project goals, set milestones, and create actionable tasks',
//   },
//   {
//     icon: <Users size={32} />,
//     title: 'Collaborate & Track',
//     description: 'Work together with your team, track progress, and stay aligned',
//   },
//   {
//     icon: <Rocket size={32} />,
//     title: 'Achieve Results',
//     description: 'Complete projects on time and celebrate team success',
//   },
// ];

// function LandingPage() {
//   const isMobile = useMediaQuery(darkTheme.breakpoints.down('md'));

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);
//   const navigate = useNavigate()
//   const handleSignupClick=()=>{
//     navigate('/signup')
//    }
//    const handleLogin = ()=>{
//     navigate('/signin')
//    }

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <Box
//         sx={{
//           minHeight: '100vh',
//           minWidth:'126.5%',
//           background: 'linear-gradient(135deg, #0A0F1E 0%, #1A1F35 100%)',
//           position: 'relative',
//           overflow: 'hidden',
//         }}
//       >
//         {/* Navigation */}
//         <AppBar position="static" color="transparent" elevation={0}>
//           <Container maxWidth="lg">
//             <Toolbar sx={{ py: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//                 {/* <Layers size={32} color="#3366FF" sx={{ transform: 'rotate(65deg)' }} /> */}
//                 <BarChart3 size={32} color='#007FFF' />
//                  {/* <Box
//           component="img"
//           src={logo}
//           alt="Logo"
//           sx={{
//             height: { xs: '24px', sm: '32px', md: '48px' },
//             width: 'auto',
//             display: 'block',
//             objectFit: 'contain',
//           }}
//         /> */}

//                 <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>
//                   PlanIt
//                 </Typography>
//               </Box>
//               <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
//                 <Button color="inherit">Features</Button>
//                 <Button color="inherit">Resources</Button>
//                 <Button color="inherit">Pricing</Button>
//                 <Button color="inherit">About</Button>
//                 <Button variant="contained" color="primary">
//                   Contact Us
//                 </Button>
//               </Box>
//             </Toolbar>
//           </Container>
//         </AppBar>

//         {/* Hero Section */}
//         <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 }, mb: 8 }}>
//           <Box
//             sx={{
//               textAlign: 'center',
//               maxWidth: '900px',
//               mx: 'auto',
//               px: { xs: 2, sm: 4 },
//               position: 'relative',
//             }}
//             data-aos="fade-up"
//           >
//             {/* Decorative elements */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: -100,
//                 left: -100,
//                 width: 200,
//                 height: 200,
//                 background: 'radial-gradient(circle, rgba(51, 102, 255, 0.1) 0%, rgba(51, 102, 255, 0) 70%)',
//                 borderRadius: '50%',
//                 zIndex: 0,
//               }}
//             />
//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: -50,
//                 right: -100,
//                 width: 150,
//                 height: 150,
//                 background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 70%)',
//                 borderRadius: '50%',
//                 zIndex: 0,
//               }}
//             />
            
//             {/* <Typography
//               variant="h1"
//               component="h1"
//               sx={{
//                 mb: 3,
//                 fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3rem' },
//                 position: 'relative',
//                 zIndex: 1,
//               }}
//             >
//               Organize your work, Seamlessly synchronize teams,
//               <br />
//                tasks & projects with planIt. <br/>
            

//             </Typography> */}
//              <Typography
//               variant="h1"
//               component="h1"
//               sx={{
//                 mb: 3,
//                 fontSize: { xs: '2.5rem', sm: '3.5rem', md: '2.8rem' },
//                 position: 'relative',
//                 zIndex: 1,
//               }}
//             >
//               Organize your work, Seamlessly synchronize teams,
//               <br />
//                tasks & projects with {' '} 
//                <Typography component="span" sx={{color:"#3E8EDE",fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3rem' },}}>
//                    "planIt" 
//                </Typography>
//                <br/>
            

//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 mb: 6,
//                 maxWidth: '700px',
//                 mx: 'auto',
//                 position: 'relative',
//                 zIndex: 1,
//               }}
//             >
//               PlanIt helps you streamline workflows, track progress, and collaborate effortlessly, ensuring your team stays aligned and productive."
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', position: 'relative', zIndex: 1 }}>
//               <Button variant="contained" color="primary" size="large" onClick={handleSignupClick}>
//                 Get Started
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 size="large"
//                 sx={{
//                   borderColor: 'rgba(99, 102, 241, 0.5)',
//                   '&:hover': {
//                     borderColor: 'primary.main',
//                   },
//                 }}
//                 onClick={handleLogin}
//               >
//                 Continue to Account
//               </Button>
//             </Box>
//           </Box>
//         </Container>

//         {/* Stats Section */}
//         <Container maxWidth="lg" sx={{ mb: 15 }}>
//           <Grid container spacing={4} justifyContent="center">
//             {stats.map((stat, index) => (
//               <Grid item xs={6} md={3} key={index}>
//                 <Paper
//                   sx={{
//                     p: 4,
//                     textAlign: 'center',
//                     background: 'rgba(20, 27, 45, 0.7)',
//                     backdropFilter: 'blur(10px)',
//                     border: '1px solid rgba(255, 255, 255, 0.1)',
//                   }}
//                   data-aos="fade-right"
//                   data-aos-delay={index * 100}
//                 >
//                   <Typography
//                     variant="h3"
//                     sx={{
//                       color: 'primary.main',
//                       fontWeight: 'bold',
//                       mb: 1,
//                     }}
//                   >
//                     {stat.value}
//                   </Typography>
//                   <Typography variant="subtitle2">{stat.label}</Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>

//         {/* Features Section */}
//         <Container maxWidth="lg" sx={{ py: 10 }}>
//           <Typography
//             variant="h2"
//             align="center"
//             data-aos="fade-left"
//             sx={{ mb: 8 }}
//           >
//             Features that empower your team
//           </Typography>
//           <Grid container spacing={4}>
//             {features.map((feature, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Paper
//                   sx={{
//                     p: 4,
//                     height: '100%',
//                     background: 'rgba(20, 27, 45, 0.7)',
//                     backdropFilter: 'blur(10px)',
//                     transition: 'transform 0.3s ease-in-out',
//                     border: '1px solid rgba(255, 255, 255, 0.1)',
//                     '&:hover': {
//                       transform: 'translateY(-5px)',
//                     },
//                   }}
//                   data-aos="flip-left"
//                   data-aos-delay={index * 100}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       mb: 2,
//                       color: 'primary.main',
//                     }}
//                   >
//                     {feature.icon}
//                   </Box>
//                   <Typography variant="h3">{feature.title}</Typography>
//                   <Typography>{feature.description}</Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>

//         {/* How it Works Section */}
//         <Container maxWidth="lg" sx={{ py: 10 }}>
//           <Typography
//             variant="h2"
//             align="center"
//             data-aos="fade-up"
//             sx={{ mb: 8 }}
//           >
//             How it Works
//           </Typography>
//           <Grid container spacing={4}>
//             {steps.map((step, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Box
//                   sx={{
//                     textAlign: 'center',
//                     position: 'relative',
//                   }}
//                   data-aos="fade-up"
//                   data-aos-delay={index * 100}
//                 >
//                   {index < steps.length - 1 && (
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: '2rem',
//                         right: '-50%',
//                         width: '100%',
//                         height: '2px',
//                         background: 'linear-gradient(90deg, #3366FF 0%, transparent 100%)',
//                         display: { xs: 'none', md: 'block' },
//                       }}
//                     />
//                   )}
//                   <Box
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: '50%',
//                       background: 'rgba(51, 102, 255, 0.1)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       mb: 3,
//                       mx: 'auto',
//                       color: 'primary.main',
//                     }}
//                   >
//                     {step.icon}
//                   </Box>
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     {step.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {step.description}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>

//         {/* Testimonials Section */}
//         <Container maxWidth="lg" sx={{ py: 10 }}>
//           <Typography
//             variant="h2"
//             align="center"
//             data-aos="fade-up"
//             sx={{ mb: 8 }}
//           >
//             What our clients say
//           </Typography>
//           <Grid container spacing={4}>
//             {testimonials.map((testimonial, index) => (
//               <Grid item xs={12} md={6} key={index}>
//                 <Paper
//                   sx={{
//                     p: 4,
//                     height: '100%',
//                     background: 'rgba(20, 27, 45, 0.7)',
//                     backdropFilter: 'blur(10px)',
//                     border: '1px solid rgba(255, 255, 255, 0.1)',
//                   }}
//                   data-aos="fade-up"
//                   data-aos-delay={index * 100}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{ mb: 2, fontStyle: 'italic' }}
//                   >
//                     "{testimonial.quote}"
//                   </Typography>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                     {testimonial.author}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {testimonial.position}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>

//         {/* CTA Section */}
//         <Container maxWidth="md" sx={{ py: 15 }}>
//           <Paper
//             sx={{
//               p: { xs: 4, md: 8 },
//               textAlign: 'center',
//               background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
//               backdropFilter: 'blur(10px)',
//               border: '1px solid rgba(255, 255, 255, 0.1)',
//               position: 'relative',
//               overflow: 'hidden',
//             }}
//             data-aos="fade-up"
//           >
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: -50,
//                 left: -50,
//                 width: 100,
//                 height: 100,
//                 background: 'radial-gradient(circle, rgba(51, 102, 255, 0.2) 0%, rgba(51, 102, 255, 0) 70%)',
//                 borderRadius: '50%',
//               }}
//             />
//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: -30,
//                 right: -30,
//                 width: 80,
//                 height: 80,
//                 background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 70%)',
//                 borderRadius: '50%',
//               }}
//             />
//             <Typography variant="h3" sx={{ mb: 2 }}>
//               Ready to transform your workflow?
//             </Typography>
//             <Typography variant="subtitle1" sx={{ mb: 4 }}>
//               Join thousands of teams already using SyncPlus to improve their productivity
//             </Typography>
//             <Button variant="contained" color="primary" size="large" onClick={handleSignupClick}>
//               Signup
//             </Button>
//           </Paper>
//         </Container>

//         {/* Footer */}
//         <Box
//           component="footer"
//           sx={{
//             py: 8,
//             backgroundColor: 'rgba(20, 27, 45, 0.9)',
//             backdropFilter: 'blur(10px)',
//             borderTop: '1px solid rgba(255, 255, 255, 0.1)',
//           }}
//         >
//           <Container maxWidth="lg">
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={4}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <BarChart3 size={32} color='#007FFF' />
//                   <Typography variant="h6" sx={{ ml: 1 }}>
//                     PlanIt
//                   </Typography>
//                 </Box>
//                 <Typography variant="body2" sx={{ mb: 2 }}>
//                   Empowering teams to achieve more through effective project management.
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                   <TrendingUp size={20} color="#3366FF" />
//                   <Typography variant="body2" color="primary">
//                     Trusted by over 10,000 teams worldwide
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={6} md={2}>
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   Product
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Features</Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Pricing</Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Resources</Typography>
//               </Grid>
//               <Grid item xs={6} md={2}>
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   Company
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>About</Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Careers</Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Blog</Typography>
//               </Grid>
//               <Grid item xs={6} md={2}>
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   Support
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Help Center</Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Documentation</Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Contact</Typography>
//               </Grid>
//               <Grid item xs={6} md={2}>
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   Legal
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Privacy</Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Terms</Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Security</Typography>
//               </Grid>
//             </Grid>
//             <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
//               <Typography variant="body2" align="center">
//                 © 2024 PlanIt. All rights reserved.
//               </Typography>
//             </Box>
//           </Container>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }












const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3366FF',
    },
    background: {
      default: '#0A0F1E',
      paper: '#141B2D',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      marginBottom: '2rem',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    subtitle1: {
      fontSize: '1.25rem',
      lineHeight: 1.6,
      color: '#94A3B8',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 24px',
          fontSize: '1rem',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3366FF 0%, #6366F1 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2952CC 0%, #5253C4 100%)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const features = [
  {
    icon: <Clock size={24} />,
    title: 'Time Tracking',
    description: 'Track time spent on tasks and projects with precision',
  },
  {
    icon: <Users size={24} />,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team members in real-time',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Analytics',
    description: 'Get insights into project progress and team performance',
  },
  {
    icon: <Zap size={24} />,
    title: 'Automation',
    description: 'Automate repetitive tasks and workflows',
  },
  {
    icon: <Shield size={24} />,
    title: 'Security',
    description: 'Enterprise-grade security for your project data',
  },
  {
    icon: <MessageSquare size={24} />,
    title: 'Communication',
    description: 'Built-in chat and commenting system for teams',
  },
];

const testimonials = [
  {
    quote: "PlanIT has transformed how our team manages projects. It's intuitive and powerful.",
    author: "Sarah Johnson",
    position: "Project Manager, TechCorp"
  },
  {
    quote: "The best project management tool we've used. It's helped us increase productivity by 40%.",
    author: "Michael Chen",
    position: "CEO, Innovation Labs"
  },
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50M+', label: 'Tasks Completed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

const steps = [
  {
    icon: <CheckCircle2 size={32} />,
    title: 'Create Your Workspace',
    description: 'Set up your team workspace in minutes with our intuitive onboarding process',
  },
  {
    icon: <Target size={32} />,
    title: 'Set Goals & Milestones',
    description: 'Define project goals, set milestones, and create actionable tasks',
  },
  {
    icon: <Users size={32} />,
    title: 'Collaborate & Track',
    description: 'Work together with your team, track progress, and stay aligned',
  },
  {
    icon: <Rocket size={32} />,
    title: 'Achieve Results',
    description: 'Complete projects on time and celebrate team success',
  },
];

function LandingPage() {
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('md'));
  const isTablet = useMediaQuery(darkTheme.breakpoints.down('lg'));
  const isSmallMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: window.innerWidth < 768,
    });
  }, []);

  const navigate = useNavigate();
  
  const handleSignupClick = () => {
    navigate('/signup');
  };
  
  const handleLogin = () => {
    navigate('/signin');
  };

  // Responsive menu state
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '99vw',
          background: 'linear-gradient(135deg, #0A0F1E 0%, #1A1F35 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Navigation */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Container maxWidth="lg">
            <Toolbar sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <BarChart3 size={isMobile ? 24 : 32} color='#007FFF' />
                <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                  PlanIt
                </Typography>
              </Box>
              
              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <Button color="inherit">Features</Button>
                <Button color="inherit">Resources</Button>
                <Button color="inherit">Pricing</Button>
                <Button color="inherit">About</Button>
                <Button variant="contained" color="primary">
                  Contact Us
                </Button>
              </Box>
              
              {/* Mobile Menu Button */}
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  color="inherit"
                >
                  {menuOpen ? 'Close' : 'Menu'}
                </Button>
              </Box>
            </Toolbar>
            
            {/* Mobile Menu */}
            {menuOpen && (
              <Box 
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  flexDirection: 'column',
                  pb: 2,
                  gap: 1
                }}
              >
                <Button color="inherit">Features</Button>
                <Button color="inherit">Resources</Button>
                <Button color="inherit">Pricing</Button>
                <Button color="inherit">About</Button>
                <Button variant="contained" color="primary">
                  Contact Us
                </Button>
              </Box>
            )}
          </Container>
        </AppBar>

        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ mt: { xs: 4, sm: 6, md: 12 }, mb: 8 }}>
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: '900px',
              mx: 'auto',
              px: { xs: 1, sm: 2, md: 4 },
              position: 'relative',
            }}
            data-aos="fade-up"
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -100,
                left: -100,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(51, 102, 255, 0.1) 0%, rgba(51, 102, 255, 0) 70%)',
                borderRadius: '50%',
                zIndex: 0,
                display: { xs: 'none', md: 'block' },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -50,
                right: -100,
                width: 150,
                height: 150,
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 70%)',
                borderRadius: '50%',
                zIndex: 0,
                display: { xs: 'none', md: 'block' },
              }}
            />
            
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 3,
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '2.8rem' },
                position: 'relative',
                zIndex: 1,
                lineHeight: { xs: 1.3, md: 1.2 },
              }}
            >
              Organize your work, Seamlessly synchronize teams,
              {!isSmallMobile && <br />}
              tasks & projects with{' '}
              <Typography component="span" sx={{
                color: "#3E8EDE",
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              }}>
                "planIt"
              </Typography>
            </Typography>
            
            <Typography
              variant="subtitle1"
              sx={{
                mb: 6,
                maxWidth: '700px',
                mx: 'auto',
                position: 'relative',
                zIndex: 1,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                px: { xs: 1, sm: 2 },
              }}
            >
              PlanIt helps you streamline workflows, track progress, and collaborate effortlessly, ensuring your team stays aligned and productive.
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 }, 
              justifyContent: 'center', 
              position: 'relative', 
              zIndex: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
            }}>
              <Button 
                variant="contained" 
                color="primary" 
                size={isSmallMobile ? "medium" : "large"}
                onClick={handleSignupClick}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size={isSmallMobile ? "medium" : "large"}
                sx={{
                  borderColor: 'rgba(99, 102, 241, 0.5)',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                  width: { xs: '100%', sm: 'auto' }
                }}
                onClick={handleLogin}
              >
                Continue to Account
              </Button>
            </Box>
          </Box>
        </Container>

        {/* Stats Section */}
        <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 15 } }}>
          <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    textAlign: 'center',
                    background: 'rgba(20, 27, 45, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 'bold',
                      mb: 1,
                      fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 } }}>
          <Typography
            variant="h2"
            align="center"
            data-aos="fade-left"
            sx={{ 
              mb: { xs: 4, md: 8 },
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
            }}
          >
            Features that empower your team
          </Typography>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    background: 'rgba(20, 27, 45, 0.7)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease-in-out',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      transform: { xs: 'none', md: 'translateY(-5px)' },
                    },
                  }}
                  data-aos="flip-left"
                  data-aos-delay={index * 100}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      color: 'primary.main',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* How it Works Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 } }}>
          <Typography
            variant="h2"
            align="center"
            data-aos="fade-up"
            sx={{ 
              mb: { xs: 4, md: 8 },
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
            }}
          >
            How it Works
          </Typography>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    position: 'relative',
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {index < steps.length - 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '2rem',
                        right: '-50%',
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #3366FF 0%, transparent 100%)',
                        display: { xs: 'none', md: 'block' },
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      borderRadius: '50%',
                      background: 'rgba(51, 102, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      mx: 'auto',
                      color: 'primary.main',
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Testimonials Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 } }}>
          <Typography
            variant="h2"
            align="center"
            data-aos="fade-up"
            sx={{ 
              mb: { xs: 4, md: 8 },
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
            }}
          >
            What our clients say
          </Typography>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    background: 'rgba(20, 27, 45, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Typography
                    variant="h6"
                    sx={{ 
                      mb: 2, 
                      fontStyle: 'italic',
                      fontSize: { xs: '1rem', md: '1.25rem' }
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    {testimonial.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                    {testimonial.position}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Container maxWidth="md" sx={{ py: { xs: 8, md: 15 } }}>
          <Paper
            sx={{
              p: { xs: 3, sm: 4, md: 8 },
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
            data-aos="fade-up"
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                left: -50,
                width: 100,
                height: 100,
                background: 'radial-gradient(circle, rgba(51, 102, 255, 0.2) 0%, rgba(51, 102, 255, 0) 70%)',
                borderRadius: '50%',
                display: { xs: 'none', md: 'block' },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                right: -30,
                width: 80,
                height: 80,
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 70%)',
                borderRadius: '50%',
                display: { xs: 'none', md: 'block' },
              }}
            />
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' } 
              }}
            >
              Ready to transform your workflow?
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 4,
                fontSize: { xs: '1rem', md: '1.25rem' } 
              }}
            >
              Join thousands of teams already using PlanIt to improve their productivity
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size={isSmallMobile ? "medium" : "large"} 
              onClick={handleSignupClick}
            >
              Signup
            </Button>
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: { xs: 4, md: 8 },
            backgroundColor: 'rgba(20, 27, 45, 0.9)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 3, md: 4 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BarChart3 size={24} color='#007FFF' />
                  <Typography variant="h6" sx={{ ml: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    PlanIt
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 2, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                  Empowering teams to achieve more through effective project management.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TrendingUp size={16} color="#3366FF" />
                  <Typography variant="body2" color="primary" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                    Trusted by over 10,000 teams worldwide
                  </Typography>
                </Box>
              </Grid>
              
              {/* Footer Links - Responsive Grid */}
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  Product
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Features</Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Pricing</Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Resources</Typography>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  Company
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>About</Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Careers</Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Blog</Typography>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  Support
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Help Center</Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Documentation</Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Contact</Typography>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  Legal
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Privacy</Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Terms</Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Security</Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: { xs: 4, md: 8 }, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography variant="body2" align="center" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                © 2024 PlanIt. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;