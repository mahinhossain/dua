// utils/socket.js
import { io } from "socket.io-client";

let socket;

export const initiateSocket = () => {
  if (!socket) {
    socket = io({
      path: "/api/socket_io",
    });
  }
  return socket;
};
