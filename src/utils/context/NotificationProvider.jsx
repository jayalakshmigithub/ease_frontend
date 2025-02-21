// import React, { Children } from 'react'
// import  { createContext, useContext, useState, useEffect } from "react";
// import { useSocket } from './SocketProvider';

// const NotificationContext = createContext()
// const NotificationProvider = ({children}) => {
//     const socket = useSocket()
//     const [notificationCount,setNotificationCount] = useState(0)
    
//    useEffect(()=>{
//     if(!socket)
//         return

//     socket.on("receive-notification",()=>{
//         setNotificationCount((prevCount)=>prevCount+1)
//     })

//     return()=>{
//         socket.off("receive-notification")
//     }
//    },[socket])

//    const resetNotificationCount =()=>{
//     setNotificationCount(0)
//    }
  
//   return (
//     <div>
//       <NotificationContext.Provider value={{notificationCount,resetNotificationCount}}>
//         {children}
//       </NotificationContext.Provider>
//     </div>
//   )
// }

// export default NotificationProvider
// export const useNotification = () => useContext(NotificationContext)


import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { userAxiosInstance } from "../api/axiosInstance";

export const NotificationContext = createContext({
    notificationCount: 0,
    resetNotificationCount: () => {}
  });
  
  export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
      throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
  };

// NotificationProvider.jsx
const NotificationProvider = ({ children }) => {
    const socket = useSocket();
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        if (!socket) {
            console.log("No socket in NotificationProvider");
            return;
        }

        console.log("Setting up notification listener");
        socket.on("receive-notification", () => {
            console.log("Notification received");
            setNotificationCount(prev => prev + 1);
        });

        return () => {
            socket.off("receive-notification");
        };
    }, [socket]);

    const fetchNotifications = async () => {
        try {
            const response = await userAxiosInstance.get("/notifications");
            console.log("Fetched notifications:", response.data);
            setNotificationCount(response.data.data.length);
        } catch (error) {
            console.error('Error fetching notifications', error);
        }
    };

    const resetNotificationCount = () => {
        setNotificationCount(0);
    };

    const value = {
        notificationCount,
        resetNotificationCount
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;


