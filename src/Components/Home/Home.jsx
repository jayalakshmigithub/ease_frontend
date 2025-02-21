import React, { useState } from "react";
import { motion } from "framer-motion";
import Hidden from "@mui/material/Hidden";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import SideBar from "../SideBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "../../utils/Redux/store";
import { Briefcase, Users, Clock, CheckCircle2, Shield, Zap, ArrowRight } from "lucide-react";
// const useStyles = makeStyles(()=>({
// CustomButton: {
//   padding: '20px 30px',
//   border: 'unset',
//   borderRadius: '15px',
//   color: '#212121',
//   zIndex: 1,
//   backgroundColor: '#e8e8e8',
//   position: 'relative',
//   fontWeight: 1000,
//   fontSize: '20px',
//   boxShadow: '4px 8px 19px -3px rgba(0,0,0,0.27)',
//   transition: 'all 250ms',
//   overflow: 'hidden',
//   '&:hover': {
//     color: '#e8e8e8',
//   },
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '100%',
//     width: '0',
//     borderRadius: '20px',
//     backgroundColor: '#212121',
//     zIndex: -1,
//     boxShadow: '4px 8px 19px -3px rgba(0,0,0,0.27)',
//     transition: 'all 250ms',
//   },
//   '&:hover::before': {
//     width: '100%',
//   },
// },

// }))

const Home = () => {
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState("");

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    let today = new Date();
    let currHr = today.getHours();
    let greetingText = "";
    if (currHr >= 0 && currHr < 6) {
      greetingText = "welcome";
    } else if (currHr >= 6 && currHr < 12) {
      greetingText = "Good Morning";
    } else if (currHr >= 12 && currHr < 16) {
      greetingText = "Good Afternoon";
    } else {
      greetingText = "Good Evening";
    }
    setGreeting(greetingText);
  }, []);

  const userInfo = useSelector((state) => state?.user?.userInfo?.user);
  console.log("userinfo in home", userInfo);
  const userName = userInfo?.name;
  console.log("useerrrname", userName);
  // const buttOnClasses = useStyles()
  // return (
  //   <>
  //   <Box className="homepage" sx={{
  //     backgroundImage: `
  //       radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
  //       radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
  //     `,
  //     width:'100vw',
  //     height:'100vh'
  //   }}
  //   >
  //     <Navbar />
  //     <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box>

  //     <SideBar/>
  //     <Typography sx={{textAlign:'center',fontFamily:'Poppins',fontSize:'35px',marginTop:'6px', color:'black',fontWeight:'semibold',display:'flex',justifyContent:'center'}}>
  //       {greeting}
  //     </Typography>

  //   </Box>

  //   </>
  // );

  //   return (
  //     <>
  //       <Box
  //         className="homepage"
  //         sx={{
  //           backgroundImage: `
  //             radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
  //             radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
  //           `,
  //           width: '100vw',
  //           height: '100vh',
  //           display: 'flex',
  //           flexDirection: 'column',
  //           boxSizing: 'border-box',
  //           overflowX: 'hidden',
  //         }}
  //       >
  //         <Navbar />
  //         <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box>
  //         <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
  //           <Box sx={{ width: '100px',flexShrink:0 }}>
  //             <SideBar />
  //           </Box>
  //           <Box sx={{ flexGrow: 1 , overflow: 'auto'}}>
  //             <Typography
  //               sx={{
  //                 textAlign: 'center',
  //                 fontFamily: 'Poppins',
  //                 fontSize: '35px',
  //                 marginTop: '20px',
  //                 color: 'black',
  //                 fontWeight: 'semibold'
  //               }}
  //             >
  //               {greeting} {userName}!
  //             </Typography>
  //             <Box sx={{ py: 5 }}>
  //   <Container maxWidth="md">
  //     <Box sx={{ textAlign: 'center', mb: 4 }}>
  //       <motion.div
  //         initial={{ opacity: 0, y: -50 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.6 }}
  //       >
  //         <Typography
  //           variant="h3"
  //           sx={{
  //             fontWeight: 'bold',
  //             color: 'text.primary',
  //             mb: 2,
  //           }}
  //         >
  //           Boost Your Project Management
  //         </Typography>
  //       </motion.div>
  //       <motion.div
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         transition={{ duration: 0.6, delay: 0.2 }}
  //       >
  //         <Typography
  //           variant="body1"
  //           sx={{
  //             color: 'text.secondary',
  //           }}
  //         >
  //           Ease provides a comprehensive set of tools and features to streamline your project management process.
  //         </Typography>
  //       </motion.div>
  //     </Box>
  //     <Grid container spacing={4}>

  //       <Grid item xs={12} sm={6} md={4}>
  //         <motion.div
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           transition={{ duration: 0.6, delay: 0.4 }}
  //         >
  //           <Paper
  //             elevation={3}
  //             sx={{
  //               p: 3,
  //               borderRadius: 2,
  //               textAlign: 'center',
  //               '&:hover': {
  //                 transform: 'scale(1.05)',
  //                 transition: 'transform 0.3s',
  //               },
  //               cursor: 'pointer',
  //             }}

  //           >
  //             <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
  //               Workspace
  //             </Typography>
  //             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //               Efficiently track manage workspaces, assign responsibilities, and monitor progress.
  //             </Typography>
  //           </Paper>
  //         </motion.div>
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={4}>
  //         <motion.div
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           transition={{ duration: 0.6, delay: 0.6 }}
  //         >
  //           <Paper
  //             elevation={3}
  //             sx={{
  //               p: 3,
  //               borderRadius: 2,
  //               textAlign: 'center',
  //               '&:hover': {
  //                 transform: 'scale(1.05)',
  //                 transition: 'transform 0.3s',
  //               },
  //               cursor: 'pointer',
  //             }}

  //           >
  //             <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
  //               Project Discussions
  //             </Typography>
  //             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //               Foster seamless collaboration among team members, with real-time communication and file sharing.
  //             </Typography>
  //           </Paper>
  //         </motion.div>
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={4}>
  //         <motion.div
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           transition={{ duration: 0.6, delay: 0.8 }}
  //         >
  //           <Paper
  //             elevation={3}
  //             sx={{
  //               p: 3,
  //               borderRadius: 2,
  //               textAlign: 'center',
  //               '&:hover': {
  //                 transform: 'scale(1.05)',
  //                 transition: 'transform 0.3s',
  //               },
  //               cursor: 'pointer',
  //             }}

  //           >
  //             <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
  //               Project Analytics
  //             </Typography>
  //             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //               Gain valuable insights into your projects' performance and make data-driven decisions.assign responsibilities.
  //             </Typography>
  //           </Paper>
  //         </motion.div>
  //       </Grid>
  //     </Grid>
  //   </Container>
  // </Box>
  //           </Box>

  //         </Box>

  //       </Box>

  //     </>
  //   );
  // Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <Box
    sx={{
      bgcolor: "grey.800",
      p: 3,
      borderRadius: 2,
      textAlign: "center",
      transition: "all 0.3s",
      "&:hover": { transform: "translateY(-4px)" },
    }}
  >
    <Box sx={{ fontSize: 40, mb: 2 }}>{icon}</Box>
    <Typography variant="h6" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Typography sx={{ color: "grey.400" }}>{description}</Typography>
  </Box>
);

// Feature Text Component
const FeatureText = ({ icon, title, description }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
    <Box sx={{ fontSize: 30, mr: 2 }}>{icon}</Box>
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ color: "grey.400" }}>{description}</Typography>
    </Box>
  </Box>
);

const handleStepper = ()=>{
  navigate('/stepper')
  
}

  return (
    
    <>
      <Box
        className="homepage"
        sx={{
          background: {
            default: '#0f172a', 
            paper: '#1e293b', 
          },
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <Hidden smDown>
        <Navbar />
        </Hidden>
        
        {/* <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSm ? "column" : "row",
            flexGrow: 1,
          }}
        >
          <Box sx={{ width: isSm ? "100%" : "100px", flexShrink: 0 }}>
            
              <SideBar />
      
          </Box>
          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: isXs ? "24px" : "35px",
                marginTop: "20px",
                color: "#8a9098",
                fontWeight: "semibold",
              }}
            >
              {greeting} {userName}!
            </Typography>
            {/* <Box sx={{ py: 5 }}>
              <Container maxWidth="md">
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Typography
                      variant={isXs ? "h4" : "h3"}
                      sx={{
                        fontWeight: "bold",
                        color: "text.primary",
                        mb: 2,
                      }}
                    >
                      Boost Your Project Management
                    </Typography>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      planIt provides a comprehensive set of tools and features to
                      streamline your project management process.
                    </Typography>
                  </motion.div>
                </Box>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6} md={4}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          p: isXs ? 2 : 3,
                          borderRadius: 2,
                          textAlign: "center",
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.3s",
                          },
                          cursor: "pointer",
                        backgroundColor: "#313b50"
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2, }}
                        >
                          Workspace
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Efficiently track manage workspaces, assign
                          responsibilities, and monitor progress.
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          textAlign: "center",
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.3s",
                          },
                          cursor: "pointer",
                            backgroundColor: "#313b50"
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2 }}
                        >
                          Project Discussions
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Foster seamless collaboration among team members, with
                          real-time communication and file sharing.
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          textAlign: "center",
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.3s",
                          },
                          cursor: "pointer",
                            backgroundColor: "#313b50"
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2 }}
                        >
                          Project Analytics
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Gain valuable insights into your projects' performance
                          and make data-driven decisions.assign
                          responsibilities.
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                </Grid>
              </Container>
            </Box> */}
            
              <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: "bold" }}>
              Project Management Made Simple
            </Typography>
            <Typography variant="h6" sx={{ color: "grey.400", maxWidth: "md", mx: "auto",fontSize:'18px' }}>
            planIt provides a comprehensive set of tools and features to
            streamline your project management process.
            </Typography>
          </Box>

          {/* Features Section */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={4}>
              <FeatureCard icon={<Briefcase />} title="Workspace" description="Efficiently track manage workspaces, assign
                          responsibilities, and monitor progress." />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard icon={<Users />} title=" Project Discussions" description="Foster seamless collaboration among team members, with
                          real-time communication" />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard icon={<Clock />} title="Project Analytics" description="Meet deadlines and track progress ease, assign
                          responsibilities." />
            </Grid>
          </Grid>

          {/* Why Choose Us */}
          <Box sx={{ bgcolor: "grey.800", p: 4, borderRadius: 2, mb: 8 }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
              Why Choose PlanIt?
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <FeatureText icon={<CheckCircle2 />} title="Easy to Use" description="Intuitive interface that requires no training" />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureText icon={<Shield />} title="Enterprise Security" description="Bank-grade security for your data" />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureText icon={<Zap />} title="Lightning Fast" description="Optimized performance for quick actions" />
              </Grid>
            </Grid>
          </Box>

          {/* CTA Section */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Ready to Get Started?
            </Typography>
            <Typography sx={{ color: "grey.400", mb: 4 }}>
              Join thousands of teams already using PlanIt to deliver successful projects.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowRight />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: "1.1rem",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
              onClick={handleStepper}
            >
              Start Here
            </Button>
          </Box>
          
        </Container>
        
        
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
