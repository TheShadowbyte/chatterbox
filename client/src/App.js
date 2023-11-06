import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';
const socket = io(SERVER_URL);

function App() {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', (message) => {
            setMessages((messages) => [...messages, message]);
        });
        return () => socket.off('chat message');
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('chat message', message);
            setMessage('');
        }
    };

    return (
        <div>
            <ul id="messages">
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
                <input value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default App;