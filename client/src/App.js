// import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import io from 'socket.io-client';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Account/Login';
import Register from "./components/Account/Register";
import ChatPage from "./components/ChatPage";
import ActiveChatsList from "./components/ActiveChats/ActiveChatsList";
import './App.css';
import CurrentChatPage from "./components/CurrentChat/CurrentChatPage";

const SERVER_URL = 'http://localhost:5000';
// const socket = io(SERVER_URL);

function App() {

    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);

    return (
        <Router>
            <div className="px-5 py-3">
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register server_url={SERVER_URL} />} />
                    <Route path="/login" element={<Login server_url={SERVER_URL} />} />
                    <Route path="/logout" element={<Home />} />
                    <Route path="/chat" element={<ChatPage server_url={SERVER_URL} />} />
                    <Route path="/chat/:chatId" element={<CurrentChatPage server_url={SERVER_URL} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;