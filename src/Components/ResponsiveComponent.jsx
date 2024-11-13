import React,{useState} from 'react';
import {Box, useMediaQuery, Typography, Button ,useTheme} from '@mui/material';

const ResponsiveComponent = () => {
    const theme = useTheme();

    // Determine if the screen is smaller than 600px (mobile size)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    // State to control the visibility of the mobile menu
    const [open, setOpen] = useState(false);
  
    // Toggle menu visibility for mobile screens
    const toggleMenu = () => {
      setOpen(!open);
    };
  
    // return (

    //   <nav>
    //     {/* If screen size is mobile, show a hamburger menu button */}
    //     {isMobile ? (
    //       <>
    //         <Button onClick={toggleMenu}>🍔 Menu</Button>
    //         {open && (
    //           <Box
    //             sx={{
    //               display: 'flex',
    //               flexDirection: 'column',
    //               background: '#efefef',
    //               padding: '10px',
    //               position: 'absolute',
    //               top: '50px',
    //               width: '100%',
    //             }}
    //           >
    //             <a href="#home">Home</a>
    //             <a href="#about">About</a>
    //             <a href="#contact">Contact</a>
    //           </Box>
    //         )}
    //       </>
    //     ) : (
    //       // If screen size is larger than mobile, show a horizontal navbar
    //       <Box
    //         sx={{
    //           display: 'flex',
    //           justifyContent: 'space-around',
    //           background: '#efefef',
    //           padding: '10px',
    //         }}
    //       >
    //         <a href="#home">Home</a>
    //         <a href="#about">About</a>
    //         <a href="#contact">Contact</a>
    //       </Box>
    //     )}
    //   </nav>
    // );


    return (
        <>
          <Box
            className="homepage"
            sx={{
              backgroundImage: `
                radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
                radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
              `,
              width: '100vw',              
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              overflowX: 'hidden',
            }}
          >
            {/* Navbar component */}
            <Navbar />
    
            {/* Divider */}
            <Box sx={{ borderBottom: "dotted", borderColor: "#A2CFFE" }}></Box>
    
            {/* Main Content */}
            <Box sx={{
              display: 'flex',
              flexDirection: isSm ? 'column' : 'row',  // Stacks content on smaller screens
              flexGrow: 1,
            }}>
              {/* Sidebar */}
              <Box sx={{
                width: isSm ? '100%' : '100px',  // Full width on small screens, fixed width on large
                flexShrink: 0,
              }}>
                <SideBar />
              </Box>
    
              {/* Content Area */}
              <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'Poppins',
                    fontSize: isXs ? '24px' : '35px',  // Smaller font for smaller devices
                    marginTop: '20px',
                    color: 'black',
                    fontWeight: 'semibold'
                  }}
                >
                  {greeting} {userName}!
                </Typography>
    
                <Box sx={{ py: 5 }}>
                  <Container maxWidth="md">
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Typography
                          variant={isXs ? 'h4' : 'h3'}  // Smaller heading on smaller devices
                          sx={{
                            fontWeight: 'bold',
                            color: 'text.primary',
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
                            color: 'text.secondary',
                          }}
                        >
                          Ease provides a comprehensive set of tools and features to streamline your project management process.
                        </Typography>
                      </motion.div>
                    </Box>
    
                    {/* Cards Section */}
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
                              p: isXs ? 2 : 3,  // Smaller padding on smaller screens
                              borderRadius: 2,
                              textAlign: 'center',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                transition: 'transform 0.3s',
                              },
                              cursor: 'pointer',
                            }}
                          >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                              Workspace
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              Efficiently track and manage workspaces, assign responsibilities, and monitor progress.
                            </Typography>
                          </Paper>
                        </motion.div>
                      </Grid>
    
                      {/* Other Cards (Similar to above) */}
                      {/* Repeat the same structure for other cards like "Project Discussions", "Project Analytics" */}
                    </Grid>
                  </Container>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      );
};

export default ResponsiveComponent;
