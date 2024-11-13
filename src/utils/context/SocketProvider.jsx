// import React, { createContext, useContext, useEffect, useState } from "react";
// // import io from "socket.io-client";
// import { useSelector } from "react-redux";
// import config from "../../config/config";

// const SocketContext = createContext({
//   socket: null,
//   onlineUsers: new Set(),
// });

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const userId = useSelector((state) => state.user.userInfo?.user?._id || "");
//   const [onlineUsers, setOnlineUsers] = useState(new Set());

//   useEffect(() => {
//     const newSocket = io(config.API_BACKEND);

//     if (userId) {
//       newSocket.emit("register", userId);
//     }

//     newSocket.on("user-status", (data) => {
//       setOnlineUsers((prev) => {
//         const updatedUsers = new Set(prev);
//         if (data.status === "online") {
//           updatedUsers.add(data.userId);
//         } else {
//           updatedUsers.delete(data.userId);
//         }
//         return updatedUsers;
//       });
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//       newSocket.off("user-status");
//     };
//   }, [userId]);

//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
