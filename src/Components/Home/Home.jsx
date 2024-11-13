import React, { useState } from "react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import Hidden from "@mui/material/Hidden";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import SideBar from "../SideBar";
import { useSelector } from "react-redux";
import { store } from "../../utils/Redux/store";
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

  return (
    <>
      <Box
        className="homepage"
        sx={{
          backgroundImage: `
          radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
          radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
        `,
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
        
        <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box>
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
                color: "black",
                fontWeight: "semibold",
              }}
            >
              {greeting} {userName}!
            </Typography>
            <Box sx={{ py: 5 }}>
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
                      Ease provides a comprehensive set of tools and features to
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
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2 }}
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
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
