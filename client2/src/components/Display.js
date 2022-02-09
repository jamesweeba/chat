import React, {useEffect, useState  } from "react";
import Logout from "./Logout"


function Display({handleChange,logout,appendMessage,user})  {
    let[currentMessage,setCurrentMessage]=useState("")

        let stye = {
            "margin-left": "25%"
        }
        let inputStyle = {
            "height": "123px",
            "width": "366px"
        }
        let mainpanel = {
            "width": "742px",
            "height": "218px",
            "border": "1px solid",
            "overflow-y": "scroll"
        }
        let footerPanel={
            "margin-top":"20px"
        }
        useEffect(()=>{
            console.log("this is on changeiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
            console.log(currentMessage);
            console.log("this is on changeiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
            handleChange(currentMessage)
        })
    

        return (
            <div style={stye}>
                <div className="w3-container w3-teal">
                    <h1>MESSAGES </h1>
                    <Logout className="logout" logout={logout}/>
                </div>
                <div className="w3-container">
                    <h2></h2>
                    < div style={mainpanel}>
                        {appendMessage.map((item)=><div id={item.sender==user.name?"you":"other"} className="message-content" > <p >{item.message}</p></div>)}

                        </div>

                   <div style={footerPanel}> <input type="text" onChange={(event)=>setCurrentMessage(event.target.value)} style={inputStyle} /></div>

                </div>
            </div>
        )


}

export default Display