const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:
      "https://vercel-deployment-client-1f4ikb4on-pushkarbhangale15s-projects.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log(`Client connected : ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message",data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected : ", socket.id);
    });
});
server.listen(3001, () => {
    console.log("server is running on port 3001");
});
