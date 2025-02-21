import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import config from "../../config/config";

const SocketContext = createContext({
  socket: null,
  // onlineUsers: [],
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const userId = useSelector((state) => state.user.userInfo?.user?._id || "");
  console.log(userId, "in socket context");

  useEffect(() => {
    try {
      if (!userId) return;
      if (socket) {
        console.log("Socket already connected, reusing existing connection.");
        return;
      }

      const newSocket = io(config.API_URL_SOCKET ,{
        reconnectionAttempts:3,
        // reconnection: true,
        transports:["websocket"]
      });

      // setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log(`socket connected with id ${newSocket.id}`);
        newSocket.emit("register-for-notifications", userId);
        console.log(`user ${userId} registered for notification`);
      });
      newSocket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.off("connect");
          newSocket.off("connect_error");
          newSocket.disconnect();
          console.log("Socket cleanup on unmount.");
        }
      };
    } catch (error) {
      console.error("Error in SocketProvider:", error);
    }
  }, [userId]);

  if (!socket) {
    return <>{children}</>;
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
