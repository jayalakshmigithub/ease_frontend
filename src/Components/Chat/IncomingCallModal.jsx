// IncomingCallModal.jsx
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import config from '../../config/config';
import { io } from 'socket.io-client';
import { useSocket } from '../../utils/context/SocketProvider';

// const IncomingCallModal = ({  user }) => {
//     console.log('hiiiiiiii in icnoming call')
//   const [open, setOpen] = useState(false);
//   const [callData, setCallData] = useState(null);
//   const navigate = useNavigate();
//   const socket = useSocket()

  
// useEffect(() => {
//     if (!socket) {
//       console.log('No socket connection available');
//       return;
//     }


//     socket.on("connect",()=>{
//         console.log('socket connected successfully')
//     })
//         console.log("Socket connected:", socket.connected);
   
//     socket.on("incoming-call", ({ roomId, callerId, chatRoomId }) => {
//         console.log("Received incoming call event:");
//       console.log("Incoming call received", { roomId, callerId, chatRoomId });
//       setCallData({ roomId, callerId, chatRoomId });
//       setOpen(true);
//     });

//     return () => {
//       socket.off("incoming-call");
//     };
//   }, [socket]);

//   const handleAcceptCall = () => {
//     if (callData) {
//       socket.emit("accept-call", {
//         roomId: callData.roomId,
//         userId: user._id
//       });
//       setOpen(false);
//       navigate(`/video-call/${callData.roomId}`);
//     }
//   };

//   const handleRejectCall = () => {
//     if (callData) {
//       socket.emit("reject-call", {
//         roomId: callData.roomId,
//         userId: user._id,
//         callerId: callData.callerId
//       });
//       setOpen(false);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleRejectCall}
//       maxWidth="xs"
//       fullWidth
//     >
//       <DialogTitle>Incoming Video Call</DialogTitle>
//       <DialogContent>
//         <Typography>
//           Incoming call from {callData?.callerId}
//         </Typography>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleRejectCall} color="error">
//           Decline
//         </Button>
//         <Button onClick={handleAcceptCall} color="success">
//           Accept
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
const IncomingCallModal = ({user}) => {
    const [open, setOpen] = useState(false);
    const [callData, setCallData] = useState(null);
    const navigate = useNavigate();
    const { socket } = useSocket();
    const timeoutRef = useRef(null)
  
    useEffect(() => {
      if (!socket) {
        console.log('No socket connection available');
        return;
      }
  
      console.log('Setting up incoming call listener');
  
      const handleIncomingCall = (data) => {
        console.log('Incoming call received:', data);
        setCallData(data);
        setOpen(true);
        timeoutRef.current = setTimeout(() => {
            handleCallTimeout();
        },30000)
      };
      //
      const handleCallExpired = (data) => {
        console.log('Call expired event received:', data);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setOpen(false);
        setCallData(null);
    };
      socket.on('incoming-call', handleIncomingCall);

      socket.on('call-expired', handleCallExpired);
  
      return () => {
        socket.off('incoming-call', handleIncomingCall);

        socket.off('call-expired', handleCallExpired); 
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
      };
    }, [socket]);

   const handleCallTimeout = ()=>{
    if(!socket||!callData)return;

    const timeoutData = {
        roomId: callData.roomId,
        userId: user._id,
        callerId:callData.callerId,
        reason: 'timeout'
    }
    socket.emit("reject-call",timeoutData)
    setOpen(false);
    setCallData(null);
   }


  
    const handleAcceptCall = () => {
      if (!socket || !callData) return;

      //timeout adding 
      if(timeoutRef.current){
        clearTimeout(timeoutRef.current)
      }
  
      const acceptData = {
        roomId: callData.roomId,
        userId: user?._id
      };
  
      console.log('Accepting call with data:', acceptData);
      socket.emit('accept-call', acceptData);
      setOpen(false);
      navigate(`/video-call/${callData.roomId}`);
    };
  
    const handleRejectCall = () => {
      if (!socket || !callData) return;

      //timeout addingn
    if(timeoutRef.current){
        clearTimeout(timeoutRef.current)
    }
  
      const rejectData = {
        roomId: callData.roomId,
        userId: user._id,
        callerId: callData.callerId
      };
  
      console.log('Rejecting call with data:', rejectData);
      socket.emit('reject-call', rejectData);
      setOpen(false);
      setCallData(null)
    };
  
    return (
      <Dialog 
        open={open} 
        onClose={handleRejectCall}
        aria-labelledby="incoming-call-dialog"
      >
        <DialogTitle id="incoming-call-dialog">
          Incoming Video Call
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Incoming call from {callData?.callerId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectCall} color="error">
            Decline
          </Button>
          <Button onClick={handleAcceptCall} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
export default IncomingCallModal;
