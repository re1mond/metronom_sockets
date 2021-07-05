const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

io.on("connection", (socket) => {
  console.log("user connected...");
  socket.on("metronom-start", (msg) => {
    console.log("user start a metronome");
    socket.broadcast.emit("metronom-start");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
