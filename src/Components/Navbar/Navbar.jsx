
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



// const Navbar = () => {
//   const navigate = useNavigate()

//   const handleClick=()=>{
//     navigate('/signin')
//    }
//    const handleSignupClick=()=>{
//     navigate('/signup')
//    }
//    const handleNewProject=()=>{
//     navigate('/newproject')
//    }
   

//    const StyledButton = styled(Button)({
//     display: 'flex',
//     alignItems: 'center',
//     fontFamily: 'inherit',
//     fontWeight: 500,
//     fontSize: '15px',
//     padding: '9px 14.5px',
//     color: 'white',
//     backgroundColor: '#357793',
//     border: 'none',
//     boxShadow: '0 0.7em 1.5em -0.5em rgba(59, 48, 78, 0.527)',
//     letterSpacing: '0.05em',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     position: 'relative',
//     overflow: 'hidden',
//     '&:hover': {
//       backgroundColor: 'rgb(103, 92, 156)',
//       boxShadow: '0 0.5em 1.5em -0.5em rgba(88, 71, 116, 0.627)',
//     },
//     '&:active': {
//       boxShadow: '0 0.3em 1em -0.5em rgba(88, 71, 116, 0.627)',
//     },
//     '&::before, &::after': {
//       content: '""',
//       width: '4px',
//       height: '40%',
//       backgroundColor: 'white',
//       position: 'absolute',
//       transition: 'all 0.2s',
//     },
//     '&::before': {
//       borderTopRightRadius: '5px',
//       borderBottomRightRadius: '5px',
//       left: 0,
//     },
//     '&::after': {
//       borderTopLeftRadius: '5px',
//       borderBottomLeftRadius: '5px',
//       right: 0,
//     },
//     '&:hover::before, &:hover::after': {
//       height: '60%',
//     },
//     '& svg': {
//       marginRight: '8px',
//       width: '25px',
//     },
//   });
    
//     const useStyles = makeStyles(()=>({
//   separator:{
//     width: "10px",
//     height:'2px%',
//     color:'black',
//     display:'inline-block',
//     margin:'0 10px',
//     borderLeft:'2px solid #949494',

//     verticalAlign:'middle'
//   },
// }))
// function VerticalLine(){
//   const classes = useStyles();
//   return(
//     <Box className={classes.separator}></Box>
//   )
// }
//   const location = useLocation();
//   const isLandingPage = location.pathname === '/' || location.pathname ==='/landing'

  

//   return (
//     <nav className='navClass'>
        
//         <div style={{ display: "flex", justifyContent: "flex-end" }}>
//   <NavLink className="nav-link" to='/about'>About</NavLink>
//   <NavLink className="nav-link" to='/blog'>Blog</NavLink>
//   <NavLink className="nav-link" to='/features'>Features</NavLink>
//   <NavLink className="nav-link" to='/contact'>Contact</NavLink>
  
//   {isLandingPage ? (
//     <>
//       <Button
//         onClick={handleClick}
//         sx={{
//           fontSize: '20px',
//           color: '#333',
//           fontFamily: 'Poppins',
//           fontWeight: 600
//         }}
//         to='/signin'
//       >
//         Login
//       </Button>
//       <VerticalLine />
//       <Button
//         onClick={handleSignupClick}
//         sx={{
//           backgroundColor: 'white',
//           fontSize: '15px',
//           fontFamily: 'Poppins',
//           fontWeight: 600,
//           color: '#3982b8',
//           borderRadius: '20px',
//           padding: '12px'
//         }}
//         to='/signup'
//       >
//         Get started
//       </Button>
//     </>
//   ) : (
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//       <Button sx={{display: 'flex',
//       backgroundColor:'#357793',
//     alignItems: 'center',
//     fontFamily: 'inherit',
//     fontWeight: 500,
//     fontSize: '15px',
//     padding: '9px 14.5px',
//     color: 'white',}}
//     onClick={<InviteMembers/>}>
//       <AddIcon />
//         Invite
//       </Button>
//       {/* <Toggle /> */}
//       <StyledButton onClick={handleNewProject}>
//         <AddIcon />
//         New Project
//       </StyledButton>
//     </Box>
//   )}
// </div>

     
      
       
//     </nav>

    
   
//   );
// }

const Navbar = () => {
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
    fontWeight: 500,
    fontSize: '15px',
    padding: '9px 14.5px',
    color: 'white',
    backgroundColor: '#357793',
    border: 'none',
    boxShadow: '0 0.7em 1.5em -0.5em rgba(59, 48, 78, 0.527)',
    letterSpacing: '0.05em',
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: 'rgb(103, 92, 156)',
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
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '5px',
      left: 0,
    },
    '&::after': {
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
      right: 0,
    },
    '&:hover::before, &:hover::after': {
      height: '60%',
    },
    '& svg': {
      marginRight: '8px',
      width: '25px',
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
      verticalAlign: 'middle'
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

  return (
    <nav className='navClass'>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NavLink className="nav-link" to='/about'>About</NavLink>
        <NavLink className="nav-link" to='/blog'>Blog</NavLink>
        <NavLink className="nav-link" to='/features'>Features</NavLink>
        <NavLink className="nav-link" to='/contact'>Contact</NavLink>

        {isLandingPage ? (
          <>
            <Button
              onClick={handleClick}
              sx={{
                fontSize: '20px',
                color: '#333',
                fontFamily: 'Poppins',
                fontWeight: 600
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
                padding: '12px'
              }}
            >
              Get started
            </Button>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
          {/* {isWorkspacesPage && (
            <Button
              sx={{
                display: 'flex',
                backgroundColor: '#357793',
                alignItems: 'center',
                fontFamily: 'inherit',
                fontWeight: 500,
                fontSize: '15px',
                padding: '9px 14.5px',
                color: 'white',
              }}
              onClick={handleOpenInviteDialog}
            >
              <AddIcon />
              Invite
            </Button>
          )} */}
          
          {!isLandingPage &&  (
            <StyledButton onClick={handleNewProject}>
              <AddIcon />
              New Project
            </StyledButton>
          )}
        </Box>
        )}
      </div>

     
      {openInviteDialog && (
        <InviteMembers
          open={openInviteDialog}
          onClose={handleCloseInviteDialog}
       
        />
      )}
    </nav>
  );
}

export default Navbar;








  //dark and light theme toggle button

// const MaterialUISwitch = styled(Switch)(({ theme }) => ({
//   width: 62,
//   height: 34,
//   padding: 7,
//   '& .MuiSwitch-switchBase': {
//     margin: 1,
//     padding: 0,
//     transform: 'translateX(6px)',
//     '&.Mui-checked': {
//       color: '#fff',
//       transform: 'translateX(22px)',
//       '& .MuiSwitch-thumb:before': {
//         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//           '#fff',
//         )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
//       },
//       '& + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
//     width: 32,
//     height: 32,
//     '&::before': {
//       content: "''",
//       position: 'absolute',
//       width: '100%',
//       height: '100%',
//       left: 0,
//       top: 0,
//       backgroundRepeat: 'no-repeat',
//       backgroundPosition: 'center',
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//         '#fff',
//       )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
//     },
//   },
//   '& .MuiSwitch-track': {
//     opacity: 1,
//     backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//     borderRadius: 20 / 2,
//   },
// }));





 