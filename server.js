// server.js
const express = require("express");
const next = require("next");
const http = require("http");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {
    path: "/api/socket_io",
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("send-message", (msg) => {
      socket.broadcast.emit("receive-message", msg);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = 3000;
  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
