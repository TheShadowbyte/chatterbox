import React, { useState } from 'react';

function ChatForm(props) {

    if (!localStorage.getItem('token')) {
        window.location.href = '/login';
    }
    const token = localStorage.getItem('token');
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userJson = JSON.parse(rawPayload);

    const [message, setMessage] = useState('');

    const onSendMessage = (message) => {
        console.log(message);

        fetch(props.server_url + '/api/messages/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: userJson.user.id,
                content: message,
                chat: props.chat_id
            })
        }).catch((error) => {
            console.error('Error:', error);
        });

    };

    const handleSendMessageSubmit = (e) => {
        e.preventDefault();
        // When the form is submitted, invoke the callback with the new message
        onSendMessage(message);
        setMessage('');
    };

    return (
        <div>
            <form onSubmit={handleSendMessageSubmit}>
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
