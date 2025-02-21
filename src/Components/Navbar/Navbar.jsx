
import { Button  , useMediaQuery , useTheme} from '@mui/material';
import { display } from '@mui/system';
import React,{useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import {
    Box
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import { styled } from '@mui/material/styles';
  import AddIcon from '@mui/icons-material/Add';
import Toggle from '../Toggle';
import InviteMembers from '../InviteMembers';
import { IoNotificationsSharp } from "react-icons/io5";
import logo from '../../Assets/logo2.png'
import NotificstionBadge from '../Chat/NotificstionBadge';
import {

  Typography,
  Container,
 
} from "@mui/material";
import { BarChart3,} from "lucide-react";




const Navbar = ({notificationCount}) => {
  const navigate = useNavigate();
  const [openInviteDialog, setOpenInviteDialog] = useState(false); 
  const [drawerOpen , setDrawerOpen] = useState(false);
  const theme = useTheme()

  const handleClick = () => {
    navigate('/signin');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleNewProject = () => {
    navigate('/newproject');
  };

  const handleOpenInviteDialog = () => {
    setOpenInviteDialog(true);
  };

  const handleCloseInviteDialog = () => {
    setOpenInviteDialog(false);
  };

  const StyledButton = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'inherit',
    fontWeight: 700,
    fontSize: '14px',
    padding: '9px 14.5px',
    color: '#1e293b',
    backgroundColor: '#fff',
    border: 'none',
    boxShadow: '0 0.7em 1.5em -0.5em rgba(59, 48, 78, 0.527)',
    letterSpacing: '0.05em',
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    marginRight:'30px',
    '&:hover': {
      backgroundColor: '#8a9098',
      boxShadow: '0 0.5em 1.5em -0.5em rgba(88, 71, 116, 0.627)',
    },
    '&:active': {
      boxShadow: '0 0.3em 1em -0.5em rgba(88, 71, 116, 0.627)',
    },
    '&::before, &::after': {
      content: '""',
      width: '4px',
      height: '40%',
      backgroundColor: 'white',
      position: 'absolute',
      transition: 'all 0.2s',
    },
    '&::before': {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      left: 0,
    },
    '&::after': {
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
      right: 0,
    },
    '&:hover::before, &:hover::after': {
      height: '50%',
    },
    '& svg': {
      marginRight: '8px',
      width: '15px',
    },
  });

  const useStyles = makeStyles(() => ({
    separator: {
      width: "10px",
      height: '2px%',
      color: 'black',
      display: 'inline-block',
      margin: '0 10px',
      borderLeft: '2px solid #949494',
      verticalAlign: 'middle',
     
    },
  }));

  function VerticalLine() {
    const classes = useStyles();
    return (
      <Box className={classes.separator}></Box>
    );
  }

  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/landing';
  const isWorkspacesPage = location.pathname ==='/workspace'

  const handleNotificationClick = async()=>{
    
    console.log('Notification clicked')
    navigate('/notifications')
  }

  return (



<nav className={`navClass ${isLandingPage ? 'landing-navbar' : ''}`}  style={{ backgroundColor: '#1e293b' }}>
  {/* <div className="navbar-logo-container">
    <Box
      component="img"
      src={logo}
      alt="Logo"
      sx={{
        height: { xs: '50px', sm: '60px', md: '180px', marginTop: '8px' },
        maxWidth: '200px',
        objectFit: 'contain',
      }}
    />
   
  </div> */}
   <Box sx={{ display: "flex", marginLeft:'30px',alignItems: "center",height: { xs: '50px', sm: '60px', md: '180px', marginTop: '8px' } }}>
              <BarChart3 size={32} color={theme.palette.primary.main} />
              <Typography variant="h5" sx={{ ml: 1, fontWeight: "bold" }}>
              PlanIt
              </Typography>
            </Box>

  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {/* <NavLink className="nav-link" to="/about">
      About
    </NavLink>
    <NavLink className="nav-link" to="/blog">
      Blog
    </NavLink>
    <NavLink className="nav-link" to="/features">
      Features
    </NavLink>
    <NavLink className="nav-link" to="/contact">
      Contact
    </NavLink> */}

    {isLandingPage ? (
      <>
        <Button
          onClick={handleClick}
          sx={{
            fontSize: '20px',
            color: '#333',
            fontFamily: 'Poppins',
            fontWeight: 600,
          
          }}
        >
          Login
        </Button>
        <VerticalLine />
        <Button
          onClick={handleSignupClick}
          sx={{
            backgroundColor: 'white',
            fontSize: '15px',
            fontFamily: 'Poppins',
            fontWeight: 600,
            color: '#3982b8',
            borderRadius: '20px',
            padding: '10px',
             marginRight:'100px'
          }}
        >
          Get started
        </Button>
      </>
    ) : (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            borderRadius: '50%',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '25px',
            marginTop:'16px'
          }}
          onClick={handleNotificationClick}
        >
          <NotificstionBadge notificationCount={notificationCount} />
        </Button>
        {!isLandingPage && (
          
          <StyledButton onClick={handleNewProject}>
            <AddIcon />
            New Project
          </StyledButton>
        )}

      </Box>
    )}
  </div>

  {isLandingPage && (
    <>
    
      <div className="left-dot"></div>
    
      <div className="right-dot"></div>
    </>
  )}

  {openInviteDialog && (
    <InviteMembers open={openInviteDialog} onClose={handleCloseInviteDialog} />
  )}
</nav>

  );
}

export default Navbar;


























