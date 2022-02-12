const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  res.end("Hello for here");
});

io.on("connection", (socket) => {
  console.log("a user connected: ", socket);
});

server.listen(3033, () => {
  console.log("listening on *:3033");
});
