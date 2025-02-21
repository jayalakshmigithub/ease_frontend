import React, { useEffect,useState,useRef } from 'react'
import { Box, Typography, Avatar, Button, Stack,Card, IconButton} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { userAxiosInstance } from '../../utils/api/axiosInstance';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { color } from 'framer-motion';

const MembersPanel = () => {
    const [members, setMembers] = useState([]);
    const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await userAxiosInstance.get("/workspaces");

        const allMembers = response.data.workspace.flatMap(ws => ws.members);
        setMembers(allMembers);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, []);

//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
//     }
//   };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (

    <Card
    sx={{
      backgroundColor: "#E7ECF5",
      borderRadius: "16px",
      p: 3,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      maxWidth: "380px",
      minHeight: "120px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
    }}
  >
    {/* Quick Transfer Header */}
    <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{textAlign:'start'}}>
      Members
    </Typography>

    {/* Navigation Arrows */}
    {members.length > 1 && (
      <>
        {/* <IconButton
          sx={{
            position: "absolute",
            left: 5,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            zIndex: 1,
          }}
        //   onClick={scrollLeft}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton> */}

        <IconButton
          sx={{
            position: "absolute",
            right: 5,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            zIndex: 1,
            color:'#333'
          }}
          onClick={scrollRight}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </>
    )}

    {/* Contacts List with Scroll */}
    <Box
      ref={scrollContainerRef}
      sx={{
        display: "flex",
        overflowX: "auto",
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        gap: 2,
        padding: "10px 0",
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      {/* Add New Contact */}
      <Box sx={{ textAlign: "center", flexShrink: 0 }}>
        <Avatar sx={{ bgcolor: "#d9d9d9", width: 50, height: 50 }}>
          <AddCircleOutlineIcon />
        </Avatar>
        <Typography variant="caption" color="text.secondary">
          Invite
        </Typography>
      </Box>

      {/* Existing Contacts */}
      {members.map((member, index) => (
        <Box key={index} sx={{ textAlign: "center", flexShrink: 0 }}>
          <Avatar sx={{ bgcolor: "#1976d2", width: 50, height: 50 }}>
            {member.email.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
      ))}
    </Box>
  </Card>
  )
}

export default MembersPanel

