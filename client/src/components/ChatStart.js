import React, { useState } from 'react';
import ChatForm from "./ChatForm";

function ChatStart(props) {

    // This file might not be needed

    // const { isAuthenticated, setIsAuthenticated } = useAuth();

    // const navigate = useNavigate();

    // const [message, setMessage] = useState('');
    // const [messages] = useState([]);

    const handleSubmit = async (event) => {

        event.preventDefault();

    };

    return (
        <div className="chat-start-container">
            <h2>Start Chat</h2>
        </div>
    );
}

export default ChatStart;
