import React, { useEffect, useRef,useMemo } from 'react'
import {useParams} from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { v4 as uuidv4 } from "uuid";
import {useSocket} from '../../utils/context/SocketProvider'
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import config from '../../config/config';


//og
// const VideoConference = () => {
//   const {roomId} = useParams()
//   const containerRef = useRef(null);
//  const socket = useRef(io(config.API_URL_SOCKET)).current
//  const userId = useSelector((state)=>state?.user?.userInfo?.user._id)
//  const hasJoined = useRef(false)

  
//    useEffect(()=>{
   

//     if(!userId||hasJoined.current){
//       return
//     }
//      socket.emit("join-call",{roomId,userId})

//      socket.on("user-joined", ({ userId }) => {
//       console.log(`User ${userId} joined the call`);
//     });

//     const myMeeting = async()=>{
//         const AppID = 756935525
//         const serverSecret = "1231045f526b0a34dae2e91fb38bc1b8"
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             AppID,
//             serverSecret,
//             roomId,
//             // uuidv4(),
//             userId,
//             "test",
//         )
//         const  ui = ZegoUIKitPrebuilt.create(kitToken)
      
//         if(!hasJoined.current){
//           ui.joinRoom({
//             container :containerRef.current,
//             scenario: {
//                 mode: ZegoUIKitPrebuilt.VideoConference
//             }
//         })
//            hasJoined.current = true
//         }
      
//     }
//     myMeeting()
//     return()=>{
//       socket.emit("leave-call",{roomId,userId})
//       socket.off("user-joined");
//       hasJoined.current = false
//     }
//    },[roomId,userId])



 

//   return (
//     <>
//     <div ref={containerRef} style={{ background:'white',width: "100%", height: "100vh" }} />
      
     
//     </>
   
//   )
// }

// const VideoConference = () => {
//   const { roomId } = useParams();
//   const containerRef = useRef(null);
//   const socket = useMemo(() => io(config.API_URL_SOCKET), []);
//   const userId = useSelector((state) => state?.user?.userInfo?.user._id);
//   const hasJoined = useRef(false);
//   const uiRef = useRef(null); // Store Zego instance

//   useEffect(() => {
//       if (!userId || hasJoined.current) return;
//       console.log('hiii in joincall frontend',roomId, userId)
//       socket.emit("join-call", { roomId, userId });
      

//       socket.on("user-joined", ({ userId }) => {
//           console.log(`User ${userId} joined the call`);
//       });

//       const myMeeting = async () => {
//           if (!containerRef.current || hasJoined.current) return;

//           const AppID = 756935525;
//           const serverSecret = "1231045f526b0a34dae2e91fb38bc1b8";
//           const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//               AppID,
//               serverSecret,
//               roomId,
//               userId,
//               "test"
//           );

//           const ui = ZegoUIKitPrebuilt.create(kitToken);
//           uiRef.current = ui; // Store the instance

//           ui.joinRoom({
//               container: containerRef.current,
//               scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
//           });

//           hasJoined.current = true;
//       };

//       myMeeting();

//       return () => {
//           socket.emit("leave-call", { roomId, userId });
//           socket.off("user-joined");

//           // Properly destroy Zego instance if possible
//           if (uiRef.current && typeof uiRef.current.destroy === "function") {
//               uiRef.current.destroy();
//           }

//           hasJoined.current = false;
//       };
//   }, [roomId, userId]);

//   useEffect(() => {
//       return () => {
//           socket.disconnect(); // Disconnect socket when component unmounts
//       };
//   }, []);

//   return <div ref={containerRef} />;
// };

const VideoConference = () => {
  const { roomId } = useParams();
  const containerRef = useRef(null);
  const socket = useMemo(() => io(config.API_URL_SOCKET), []);
  const userId = useSelector((state) => state?.user?.userInfo?.user._id);
  const username = useSelector((state)=>state?.user?.userInfo?.user?.name)
  const hasJoined = useRef(false);
  const uiRef = useRef(null);
  useEffect(() => {
    if (!userId || !roomId) return;

    const initializeCall = async () => {
      try {
        
        socket.emit("join-call", { roomId, userId });

       
        const AppID = config.APP_ID
        const serverSecret = config.SERVER_SECRET_KEY
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          AppID,
          serverSecret,
          roomId,
          userId,
          username, 
        );

        const ui = ZegoUIKitPrebuilt.create(kitToken);
        uiRef.current = ui;

       
         ui.joinRoom({
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
            config: {
              role: 'Host', 
              turnOnCameraWhenJoining: true,
              turnOnMicrophoneWhenJoining: true,
              useFrontFacingCamera: true,
              showMyCameraToggleButton: true,
              showMyMicrophoneToggleButton: true,
              showAudioVideoSettingsButton: true,
              showScreenSharingButton: true,
              showTextChat: true,
              showUserList: true,
              maxUsers: 50,
              layout: 'Auto',
              showLayoutButton: true,
            }
          },
          showPreJoinView: true 
        });

        hasJoined.current = true;
      } catch (error) {
        console.error("Error joining video call:", error);
      }
    };

    if (!hasJoined.current) {
      initializeCall();
    }

    
    socket.on("user-joined", ({ userId: joinedUserId }) => {
      console.log(`User ${joinedUserId} joined the call`);
    });

    socket.on("user-left", ({ userId: leftUserId }) => {
      console.log(`User ${leftUserId} left the call`);
    });

    return () => {
      if (hasJoined.current) {
        socket.emit("leave-call", { roomId, userId });
        if (uiRef.current?.destroy) {
          uiRef.current.destroy();
        }
        hasJoined.current = false;
      }
      socket.off("user-joined");
      socket.off("user-left");
    };
  }, [roomId, userId, socket]);

 
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div 
      ref={containerRef} 
      className="video-conference-container"
      style={{ 
        width: "100%", 
        height: "100vh",
        backgroundColor: "#f0f2f5"
      }} 
    />
  );
};


export default VideoConference
