
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
    let [error,setErrors]=useState("");

    if (isAuthenticated) {
        //https://fridge-ger.herokuapp.com/api/v1/users
        let url=  `https://fridge-ger.herokuapp.com/api/v1/users`||`/api/v1/users`
        axios.post(url, user).then(res => {
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
        let {username}=selectUser;
        if (currentMessage&& username) {
            let message = { "message": currentMessage, to: selectUser, "toperson": selectUser.username, "fromperson": user.email }
            socket.emit("sendmessage", message);
            //make axios call
        }else{
            setErrors("PLEASE SELECT A USER FIRST AND TYPE TO CHAT")
 
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
            {error && <div className="center-screen" >{error}</div>}

        </div>

    )
}

export default Chat