import React, {useEffect, useState} from "react";
import './MessagesList.css';

const MessagesList = (props) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        setMessages(props.latest_messages);

    }, [props.chat_id, props.correspondents, props.latest_messages, props.local_user]);

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);

        // Create options for Intl.DateTimeFormat to display date and time in desired format
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

        // Format the date and time separately
        const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

        // Combine both date and time parts
        return `${formattedDate} ${formattedTime}`;
    }

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
                        <p className="timestamp">{formatDateTime(message.sentAt)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessagesList;