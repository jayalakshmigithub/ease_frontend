import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import config from "../../config/config";

const SocketContext = createContext({
  socket: null,
  onlineUsers: [],
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const userId = useSelector((state) => state.user.userInfo?.user?._id || "");
  console.log(userId,"in socket context");

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(config.API_URL_SOCKET);

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.off();
        newSocket.disconnect();
      }
    };
  }, [userId]);

  if (!socket) {
    return null; 
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
