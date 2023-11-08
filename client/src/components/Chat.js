import React, { useState } from 'react';
import ChatForm from "./ChatForm";
import ChatNew from "./ChatNew";
import ActiveChats from "./ActiveChats";

function Chat(props) {

    // const { isAuthenticated, setIsAuthenticated } = useAuth();

    // const navigate = useNavigate();

    // const [message, setMessage] = useState('');
    const [messages] = useState([]);

    return (
        <div className="chat-container">
            <ChatNew server_url={props.server_url} />
            <ActiveChats />
        </div>
    );
}

export default Chat;
