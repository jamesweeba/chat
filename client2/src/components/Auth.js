import React, { Component } from "react";
import Chat from "../Chat";
import LoginButton from "../auth/Login";


class Start extends Component {
    render() {
        let { isAuthenticated, socket, loginWithRedirect, user ,logout} = this.props;
        if (isAuthenticated) {
            return (<Chat socket={socket} user={user} logout={logout} isAuthenticated={isAuthenticated}/>)
        };
        return <LoginButton loginWithRedirect={loginWithRedirect} />
    }

}

export default Start;