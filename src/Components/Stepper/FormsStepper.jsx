import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import Navbar from '../Navbar/Navbar';
import CreateWorkspace from '../CreateWorkspace';
import ColorlibConnector from './Connectors/ColorlibConnector';
import ColorlibStepIcon from './StepperIcons/ColorlibStepIcon';
import AddMembers from "../AddMembers";
import { Bounce,toast,ToastContainer } from "react-toastify";
import InviteMembers from "../InviteMembers";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";


const FormsStepper = () => {
  const [activeStep, setActivestep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
const [workSpace , setWorkSpace] = useState(null)
  const handleCloseDialog = () => setOpenDialog(false);
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setOpenDialog(true);
    }, 1000);
  }, [activeStep]);

  const nextStep = () => {
    if (activeStep < 1) {
      setActivestep((currentStep) => currentStep + 1);
    }else{
      navigate('/home')
    }
     
  }

  const previousStep = () => {
    if (activeStep !== 0) setActivestep((currentStep) => currentStep - 1);
  }

 
  // const handleSelect=(selectOption)=>{
  //   console.log('selectedOption',selectOption)
  // }

  const steps = ['Create Workspace', 'Invite Members'];



  return (
    <>
      <Box
        sx={{
          backgroundImage: `
            radial-gradient(at top right, #C0CFFA 55.55%, #fff 70%),
            radial-gradient(at bottom left, #C0CFFA 55.55%, #fff 70%)
          `,
          width: '100vw',
          height: '100vh',
        }}
      >
        <Navbar />

        <Box sx={{ borderBottom: 'dotted', borderColor: '#A2CFFE' }}></Box>
        <Container
        sx={{
          marginTop: '150px',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
          maxWidth: '600px',
        }}>

        <Box sx={{ marginTop: '100px', backgroundColor: 'transparent', backdropFilter: 'blur' }}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box >
          {activeStep === 0 && (
            <CreateWorkspace open={openDialog} onClose={handleCloseDialog} setWorkSpace={setWorkSpace} nextStep={nextStep} />
          )}
          
         {activeStep === 1&& (
          <InviteMembers open={openDialog} onClose={handleCloseDialog} setWorkSpace={setWorkSpace} workSpace={workSpace}/>
        )}
         
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '80px', gap:'28px' }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={nextStep} 
            sx={{ marginLeft: '10px'}} 
            disabled={activeStep === steps.length - 1}
          >
            Next 
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={previousStep} 
            sx={{ marginRight: '10px' }}
          >
            Previous 
          </Button>
        </Box>
        </Container>
        {/* <ToastContainer/> */}
      </Box>
    </>
  );
};

export default FormsStepper;


 {/* {activeStep === 1 && (
          <AddMembers open={openDialog} onClose={handleCloseDialog} handleSelect={handleSelect} nextStep ={nextStep} workSpace={workSpace} />
        )} */}
  // , 'Number of Members to Invite'
