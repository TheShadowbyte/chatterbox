import React, {useEffect, useState} from "react";
import './MessagesList.css';

const MessagesList = (props) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        setMessages(props.latest_messages);

    }, [props.chat_id, props.correspondents, props.latest_messages, props.local_user]);

    return (
        <div>
            <ul className="message-list">
                {messages.map((message) => (
                    <li
                        key={message.id}
                        className={`message-item ${message.sender === props.local_user ? 'sent-message' : 'received-message'}`}
                    >
                        <p className="username">{message.sender}</p>
                        <p>{message.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessagesList;