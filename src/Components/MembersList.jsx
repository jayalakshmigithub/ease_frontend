import React from "react";
import { Modal, Box, Typography, List, ListItem, ListItemText, Button, Divider,IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';



const MembersList = ({ open, onClose, members, onAddMember }) => {
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
             overflow: "auto"
          }}
        >
               <IconButton
               onClick ={(e)=>{
                e.stopPropagation()
                onClose()
               }}
        //   onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
          <Typography variant="h6" mb={2}>
            Add Members
          </Typography>
          <List>
          {members && members.length > 0 ? (
            members.map((member) => (
              <Box key={member._id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                  }}
                >
                  <ListItem sx={{ width: "65%" }}>
                    <ListItemText primary={member.email} sx={{ color: 'black' }} />
                  </ListItem>
                  <Button
                    variant="contained"
                    size="small"
                    onClick ={(e)=>{
                        e.stopPropagation()
                        onAddMember(member)
                    }
                      
                    }
                    // onClick={() => onAddMember(member)}
                  >
                    Add
                  </Button>
                </Box>
                <Divider />
              </Box>
            ))
          ) : (
            <Typography variant="body2">No members available.</Typography>
          )}
        </List>
        </Box>
      </Modal>
    );
  };
  

export default MembersList;
