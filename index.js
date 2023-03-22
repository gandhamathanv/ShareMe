const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Set up routes and other middleware...

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected.");
  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  });
  socket.on("chat message", (msg, user) => {
    console.log(user);
    console.log("Received message:", msg);
    io.emit("chat message", { msg, user });
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
