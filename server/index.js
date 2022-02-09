// const app = require("express")()
// const httpServer = require("http").createServer(app);
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//     method: ["GET", "POST"]
//   },
// });

// io.use((socket, next) => {
//     const username = socket.handshake.auth.username;
//     if (!username) {
//       return next(new Error("invalid username"));
//     }
//     socket.username = username;
//     next();
//   });



//   io.on("connection", (socket) => {
//     console.log(socket.auth);
//     console.log("==============================================")
//     console.log(socket.username)
//     // fetch existing users
//     const users = [];
//     for (let [id, socket] of io.of("/").sockets) {
//       users.push({
//         userID: id,
//         username: socket.username,
//       });
//     }
//     socket.emit("users", users);

//     // notify existing users
//     socket.broadcast.emit("user connected", {
//       userID: socket.id,
//       username: socket.username,
//     });

//     // forward the private message to the right recipient
//     socket.on("private message", ({ content, to }) => {
//       socket.to(to).emit("private message", {
//         content,
//         from: socket.id,
//       });
//     });

//     // notify users upon disconnection
//     socket.on("disconnect", () => {
//       socket.broadcast.emit("user disconnected", socket.id);
//     });
//   });

//   const PORT = process.env.PORT || 3001;

//   httpServer.listen(PORT, () =>
//     console.log(`server listening at http://localhost:${PORT}`)
//   );



const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
// const users = require("./src/users/routes");
const messages = require("./src/messages/routes");
const users=require("./src/users/routes")

const port = 3001
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }), bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use("/api/v1/auth", users)
app.use("/api/v1/users",users)
app.use("/api/v1/messages", messages);
var content = [];



const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    },
});
io.on("connection", (socket) => {
    const users = [];
   
    for (let [id, socket] of io.of("/").sockets) {
        users.push({ user_id: id, username: socket.handshake.auth.name });
    }
    io.sockets.emit("users", users)
    console.log("coonected", users)
    socket.emit("connected", users);
    

    socket.on("sendmessage", (data) => {
        console.log("message")
        console.log(data, socket.id);
        console.log("message")
        let payload = { "message": data.message, "from": socket.id, "receiver": data.toperson, "sender": data.fromperson }
        content.push(payload);
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx")

        console.log(content);
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        io.sockets.to(data.user_id).emit("private", content);
    });

    socket.on("join", (data) => {
        socket.join(data.id)
    })
    socket.on("disconnect", (data) => {
        io.sockets.emit("users", users)
        socket.emit("connected", users);
        console.log("user disconeccted", socket.id)


    });
})







server.listen(port, () => {
    console.log("magic happens on port " + port)
})