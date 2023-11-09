import React, { useState } from 'react';
import ChatForm from "./CurrentChat/ChatForm";
import ChatNew from "./ChatNew";
import ActiveChatsList from "./ActiveChats/ActiveChatsList";

function ChatPage(props) {

    // const { isAuthenticated, setIsAuthenticated } = useAuth();

    // const navigate = useNavigate();

    // const [message, setMessage] = useState('');
    const [messages] = useState([]);

    return (
        <div className="chat-page-container">
            <ChatNew server_url={props.server_url} />
            <ActiveChatsList server_url={props.server_url} />
        </div>
    );
}

export default ChatPage;
