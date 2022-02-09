import react, { useEffect, useState } from "react";
import queryString from "query-string";


function Chat({ socket, isAuthenticated, username, room, location }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [chatData, setchatData] = useState("none");

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours()
            }
            await socket.emit("send_message", messageData)
        }
    }

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            console.log(data)

        })

    }, [socket]);


    const { code } = queryString.parse(location.search);
    useEffect(() => {
        fetch(`http:// localhost:3001/real-time?code=${code}`,{
            "method":"GET",
            "headers":{
                "Contect-Type":"application/json",
                Accept:"application/json"
            }
        }).then(res=>res.json()).then(res=>setchatData(JSON.stringify(res)))
    },[code]);

    console.log(chatData)

    return (
        <div>
            <div>
                <p>Live Chat</p>
            </div>
            <div>
                <input type="text"
                    placeholder="Hey..." onChange={(event) => { setCurrentMessage(event.target.value) }} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>

        </div>
    )

}

export default Chat