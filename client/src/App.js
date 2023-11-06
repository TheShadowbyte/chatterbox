import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";

const SERVER_URL = 'http://localhost:5000';
// const socket = io(SERVER_URL);

function App() {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     socket.on('chat message', (message) => {
    //         setMessages((messages) => [...messages, message]);
    //     });
    //     return () => socket.off('chat message');
    // }, []);
    //
    // const sendMessage = (e) => {
    //     e.preventDefault();
    //     if (message) {
    //         socket.emit('chat message', message);
    //         setMessage('');
    //     }
    // };

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login server_url={SERVER_URL} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;