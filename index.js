const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("static"));

// Set up routes and other middleware...

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/chat.html");
});

io.on("connection", (socket) => {
  let userName;
  // console.log(socket);
  console.log("A user connected.");
  socket.on("disconnect", () => {
    console.log("A user disconnected.");
    io.emit("user disconnected", { username: userName });
  });
  socket.on("chat message", (msg, user) => {
    console.log(user);
    console.log("Received message:", msg);
    io.emit("chat message", { msg, user });
  });
  socket.on("user connected", (username) => {
    userName = username;
    io.emit("user connected", { username });
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
