import React ,{useState,useEffect}from 'react'
import { Badge,Box } from '@mui/material'
import { IoNotificationsSharp } from "react-icons/io5";
import { useSocket } from '../../utils/context/SocketProvider';
import { userAxiosInstance } from '../../utils/api/axiosInstance';
import { color } from '@mui/system';



const NotificstionBadge = () => {
  const socket = useSocket()
  const[ notificationCount,setNotificationCount] = useState(0)
  const fetchNotificationCount = async()=>{
    try {
      const response = await userAxiosInstance.get('/notifications')
      setNotificationCount(response.data.data.length)

    } catch (error) {
      console.error('error fetching notification count',error);
      
    }
  }
  useEffect(() => {
    fetchNotificationCount();
}, []);
useEffect(() => {
  if (!socket?.socket?.connected) return;

  const handleNewNotification = () => {
      setNotificationCount((prevCount) => prevCount + 1);
  };

  socket.socket.on("receive-notification", handleNewNotification);

  return () => {
      socket.socket.off("receive-notification", handleNewNotification);
  };
}, [socket?.socket?.connected]);

const handleViewNotifications = () => {
  setNotificationCount(0);
};
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
            <Badge badgeContent={notificationCount} color="error">
                <IoNotificationsSharp
                    sx={{ fontSize: 32, cursor: "pointer"}}
                    onClick={handleViewNotifications}
                />
            </Badge>
        </Box>
  )
}

export default NotificstionBadge
