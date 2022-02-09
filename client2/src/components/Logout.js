import React from "react";

function Logout({logout}){
    return(
        <div className="logout">
            <button  onClick={()=>logout()} type="button" className="btn btn-danger">Logout</button>
        </div>
    )
}

export default Logout;