
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const https       = require( "https" );
const bodyParser = require("body-parser");
// const users = require("./src/users/routes");
const messages = require("./src/messages/routes");
const users=require("./src/users/routes")
const PORT = process.env.PORT || 5000;
const path=require("path")
app.use(cors({
    origin: '*',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(bodyParser.json({ limit: '50mb' }), bodyParser.urlencoded({ extended: true, limit: '50mb' }));


app.use("/api/v1/users",users)
app.use("/api/v1/messages", messages);
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'));
      });
    
    // app.get("*",(req,res)=>{
    //     res.sendFile(path.resolve(__dirname,"build","index.html"))
    // })
}
var content = [];
const server = http.createServer(app);
let io = require("socket.io")(server, {cors: {origin: "*"}});
io.on("connection", (socket) => {
    let users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({ user_id: id, username: socket.handshake.auth.name });
    }
    users = [...new Map(users.map(item =>
        [item["username"], item])).values()];
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







server.listen(PORT, () => {
    console.log("magic happens on port " + PORT)
})