import React, { useEffect, useState } from "react";
import { Box, Hidden, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Container, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar";
import { IoMdCloseCircle } from "react-icons/io";
import { userAxiosInstance } from "../../utils/api/axiosInstance";
import { format } from 'date-fns';
import { useSocket } from "../../utils/context/SocketProvider";
import { useSelector } from "react-redux";

const NotificationPage = () => {
    const socket = useSocket();
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const currentUser = useSelector((state)=>state?.user?.userInfo?.user)
    const currentUserID = currentUser._id

    const fetchNotifications = async () => {
        try {
            const response = await userAxiosInstance.get("/notifications");
            setNotifications(response.data.data);
            setNotificationCount(response.data.data.length);
        } catch (error) {
            console.error('Error fetching notifications', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);
    

    useEffect(() => {
        console.log("Socket state:", {
            socketExists: !!socket?.socket,
            connected: socket?.socket?.connected,
            id: socket?.socket?.id
        });

      
        if (!socket?.socket?.connected) {
            console.log("Waiting for socket connection...");
            return;
        }

        const handleNewNotification = (notification) => {
            console.log("Received new notification:", notification);
            setNotifications(prevNotifications => [notification, ...prevNotifications]);
            setNotificationCount(prevCount => prevCount + 1);
        };
        // socket.on("receive-notification", (notifications) => {
        //     console.log("Socket data:", notifications);
        //     setNotifications((prevNotifications) => [notifications, ...prevNotifications]);
        //     setNotificationCount((prevCount) => prevCount + 1);
        // });

        const handleNotificationRead = ({ notificationId }) => {
            console.log(`Notification ${notificationId} marked as read in notifacation read`);
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification._id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        };
    

        socket.socket.on("receive-notification",handleNewNotification)
        socket.socket.on("notification-read", handleNotificationRead);


        return () => {
            if (socket?.socket?.connected) {
                socket.socket.off("receive-notification", handleNewNotification);
                socket.socket.off("notification-read", handleNotificationRead);

            }
        };
    },  [socket?.socket?.connected]);
    const handleViewNotifications = () => {
        setNotificationCount(0);
    };

    // const handleAsMarked = async(notificationId)=>{
    //     console.log('clicked ')
    //     if(socket?.socket){
    //         socket.socket.emit("mark-notification-as-read",{
    //             notificationId,
    //             userId : currentUserID
    //         })
    //     }
    //     console.log('notificationId',notificationId)

    // }
    const handleAsMarked = async (notificationId) => {
        console.log("clicked", notificationId);
        if (socket?.socket) {
            socket.socket.emit("mark-notification-as-read", {
                notificationId,
                userId: currentUserID,
            });
    
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification._id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        }
    };
    

    const handleClose = (_id, event) => {
        event.stopPropagation();
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification._id !== _id)
        );
    };

    return (
        <Box
            className="homepage"
            sx={{
                backgroundColor:'#0f172a',
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                overflowX: "hidden",
            }}
        >
            <Hidden smDown>
                <Navbar />
            </Hidden>
            <Box sx={{ display: "flex", flexGrow: 1, flexDirection: 'row' }}>
                <Hidden smDown>
                    <SideBar />
                </Hidden>
                <Container
                    sx={{
                        flexGrow: 1,
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                       
                    }}
                >

                    <Typography variant="h4" component="h1" sx={{ marginBottom: 3, textAlign: "center" }}>
                        Notifications
                    </Typography>
                    <List>
                        {notifications.map((notification) => (
                            
                            <React.Fragment key={notification._id}>
                                <ListItem
                                key={notification._id}
                                    sx={{
                                        backgroundColor: notification.isRead ? "#333" : "#f5f5f5",
                                        borderRadius: 1,
                                        marginBottom: 1,
                                        ":hover": { backgroundColor: "#e8eaf6" },
                                    }}
                                    onClick={()=>handleAsMarked(notification._id)}
                                >
                                    <ListItemIcon>
                                        <NotificationsIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={notification.message}
                                        secondary={
                                            notification.createdAt 
                                                ? format(new Date(notification.createdAt), "PP")
                                                : "Date not available"
                                        }
                                        sx={{
                                            "& .MuiListItemText-primary": {
                                                color: "#000",
                                                fontWeight: "bold",
                                            },
                                            "& .MuiListItemText-secondary": {
                                                color: "#555",
                                            },
                                        }}
                                    />
                                    <Box sx={{ marginRight: '30px', color: 'darkblue', fontSize: '20px' }}
                                        onClick={(event) => handleClose(notification._id, event)}
                                    >
                                        <IoMdCloseCircle />
                                    </Box>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Container>
            </Box>
        </Box>
    );
};

export default NotificationPage;