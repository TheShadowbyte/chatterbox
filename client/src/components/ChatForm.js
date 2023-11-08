import React, { useState } from 'react';

function ChatForm({ onSendMessage }) {

    const [messages] = useState([]);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // When the form is submitted, invoke the callback with the new message
        onSendMessage(message);
        setMessage(''); // Clear the input after sending
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ChatForm;
