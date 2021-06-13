const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
//const io = new Server(server);
const io = require("socket.io")(server);
var cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("msg", (msg) => {
    io.emit("msg", msg);
  });
});

var server_port = process.env.PORT || 3000;
server.listen(server_port, function (err) {
  if (err) throw err;
  console.log("Listening on port %d", server_port);
});

/*const server = require("http").createServer();
const io = require("socket.io")(server);
io.on("connection", function (socket) {
  console.log("connected....");
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});
var server_port = process.env.PORT || 3000;
server.listen(server_port, function (err) {
  if (err) throw err;
  console.log("Listening on port %d", server_port);
});*/
