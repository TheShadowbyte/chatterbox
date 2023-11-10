import React, {useEffect, useState} from "react";
import './MessagesList.css';

const MessagesList = (props) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        setMessages(props.latest_messages);

    }, [props.chat_id, props.correspondents, props.latest_messages, props.local_user]);

    function formatDateTime(dateTimeString) {

        const correctedDateTimeString = dateTimeString.replace(
            /T(\d):|:(\d)(?=:)|:(\d)\./g,
            (match, p1, p2, p3) => {
                // p1 is for hour, p2 is for minute, and p3 is for second
                if (p1) return `T0${p1}:`; // Correct hour
                if (p2) return `:0${p2}:`; // Correct minute
                if (p3) return `:0${p3}.`; // Correct second
                return match;
            }
        );

        const date = new Date(correctedDateTimeString);

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date: ' + correctedDateTimeString);
        }

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