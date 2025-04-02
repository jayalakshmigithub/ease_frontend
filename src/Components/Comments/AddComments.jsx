import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Grid, Card, Typography, Button } from "@mui/material";

const AddComments = ({onAddComment}) => {
    const [comment,setComment] = useState([])

    const handleSubmit = ()=>{
        if(comment.trim()){
            onAddComment(comment)
            setComment('')
        }
    }


  return (
    <Box sx={{ mt: 2 }}>
    <ReactQuill 
      value={comment} 
      onChange={setComment} 
      theme="snow"
      placeholder="Write your comment..."
    />
    <Button 
      variant="contained" 
      sx={{ mt: 1 }} 
      onClick={handleSubmit}
    >
      Add Comment
    </Button>
  </Box>
  )
 
};

export default AddComments;
