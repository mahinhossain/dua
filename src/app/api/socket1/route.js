// pages/api/socket.js
import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Starting Socket.IO server...");
    const io = new Server(res.socket.server, {
      path: "/api/socket_io",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("send-message", (msg) => {
        console.log("Received:", msg);
        socket.broadcast.emit("receive-message", msg); // send to others
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  res.end();
}
