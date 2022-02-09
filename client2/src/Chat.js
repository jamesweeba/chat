
import LeftPanel from "./components/LeftPanel";
// import Display from "./components/LeftPanel"
import { useEffect, useState } from "react";
import Display from "./components/Display";
import SendButton from "./components/SendButton";
import axios from 'axios';
let _private = [];


function Chat({ socket, user, logout, isAuthenticated }) {
    socket.auth = user;
    socket.connect();

    let [users, setUsers] = useState([]);
    let [currentMessage, setCurrentMessage] = useState("");
    let [selectUser, setSelectedUser] = useState({})
    let [appendMessage, setAppendMessage] = useState([]);

    if (isAuthenticated) {
        axios.post("http://localhost:3001/api/v1/users", user).then(res => {
            return res;
        }).then(res=>{
           console.log(res)
        }).catch(err=>{
           console.log(err);
        })

    }



    useEffect(() => {
        socket.on("users", (data) => {
            setUsers(data)

        });

        socket.on("private", (data) => {
            _private.push(data);
            setAppendMessage(data)
            console.log("private message", data)
        });

    }, [socket])
    let handleClick = (selectuser) => {
        socket.emit('join', { id: selectUser.user_id });
        setSelectedUser(selectuser)
        console.log(selectuser);
    }
    let handleSendMessage = () => {
        if (currentMessage) {
            let message = { "message": currentMessage, to: selectUser, "toperson": selectUser.username, "fromperson": user.email }
            socket.emit("sendmessage", message);
            //make axios call
        }
    }

    let handleChange = (message) => {
        setCurrentMessage(message)
        console.log(message, appendMessage)
    }

    return (
        <div>
            <LeftPanel users={users} currentUser={user} handleClick={handleClick} />
            <Display handleChange={handleChange} appendMessage={appendMessage} socket={socket} logout={logout} user={user} />
            <div className="sender">
                <SendButton handleSendMessage={handleSendMessage} />
            </div>

        </div>

    )
}

export default Chat