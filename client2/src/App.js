import logo from './logo.svg';
import './App.css';
import Chat from './Chat';
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Start from './components/Auth';
const URL = "http://localhost:3001";




function App() {
    const socket = io(URL, { autoConnect: false })
    const { user, isAuthenticated, loginWithRedirect,logout } = useAuth0()
    return <Start socket={socket} isAuthenticated={isAuthenticated} user={user} loginWithRedirect={loginWithRedirect} logout={logout}/> 
}

export default App;
