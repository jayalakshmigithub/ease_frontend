import React, { useState,useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel
  } from "@mui/material";
  import { ToastContainer,toast,Bounce } from 'react-toastify';
import { userAxiosInstance } from '../utils/api/axiosInstance';

const AddMembers = ({open , onClose, handleSelect ,nextStep ,workSpace}) => {
    // const ownerId = workSpace?.workspace?.OwnerId;
    // console.log(workSpace,"workspa il aahjn");
    const [selectedOption,setSelectedOption] =useState('')
    const handleMembers=(e)=>{
        setSelectedOption(e.target.value)
        console.log('e.target.value',e.target.value)
    }

    useEffect(()=>{
const fetchData = async ()=>{
    console.log(workSpace)
    
}
if(workSpace !== null)fetchData()
    },[workSpace])
        
     const handleSubmit=()=>{
        if(selectedOption){
            handleSelect(selectedOption)
            toast.success('option selected succesfully')
            onClose()
            setTimeout(() => {
                nextStep()
                
            }, 500);
        }
    
        
     }
    
     
    //  useEffect(()=>{
    //     console.log('owner',ownerId)
    //     const response =  userAxiosInstance.get('/getworks',ownerId,{withCredentials:true})
    //     console.log(response.data,'workspoacceeeee')
    //  },[ownerId])
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Select Number of members</DialogTitle>
        <DialogContent>
            <Box
            component='form'
            sx={{display:'flex',flexDirection:'column',gap:2}}
            autoComplete='off'
            >
                <RadioGroup value={selectedOption} onChange={handleMembers}>
                    <FormControlLabel value="1-5" control={<Radio/>} label='1 to 5'/>
                    <FormControlLabel value="5-10" control={<Radio/>} label='5 to 10'/>
                    <FormControlLabel value="10 to 15" control={<Radio/>} label='10 to 15' />
                </RadioGroup>
 
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>{
                onClose()
                nextStep()
            }}>
                Skip
            </Button>
            <Button onClick={handleSubmit}>
                Select
            </Button>
        </DialogActions>

    </Dialog>
    
  )
}

export default AddMembers
