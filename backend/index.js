const express = require("express");
const app = express();
const port = 80;
const path = require("path");

var http = require("http").createServer(app);
const io = require("socket.io")(http);

let userCount = 0;

app.use(express.static(path.resolve(__dirname + "/../frontend/build/")));

io.on("connection", (socket) => {
  const userId = userCount;
  socket.on("NEW_MESSAGE", (text) => {
    io.emit("NEW_MESSAGE", { userId, text });
  });

  userCount = userCount + 1;
});

app.get("*", (request, response, next) => {
  response.sendFile(path.resolve(__dirname + "/../frontend/build/index.html"));
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
