import {useEffect, useState} from "react";
import {getCurrentUser} from "../helpers/userHelpers";

const ChatNew = (props) => {

    const token = localStorage.getItem('token');
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userJson = JSON.parse(rawPayload);

    const [currentUser, setCurrentUser] = useState('');
    const [correspondents, setCorrespondents] = useState([]);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const createNewChat = async (correspondents, message) => {

        console.log('server_url: ' + props.server_url);

        try {

            const payload = JSON.stringify({ correspondents, message });

            if (payload.length > 0) {
                const response = await fetch(props.server_url + '/api/chats/new', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: payload,
                });
                return await response.json();
            }
            else {
                alert('Error: correspondent and message must be provided');
            }

        } catch (error) {
            console.error('Error during API call', error);
        }

    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleStartNewChat = async (event) => {

        event.preventDefault();

        try {

            getCurrentUser(props.server_url, userJson.user.id).then((user) => {
                setCurrentUser(user.username);
                setCorrespondents([user.username]);
            }).then(() => {
                if (username && !correspondents.includes(username)) {
                    setCorrespondents(prevCorrespondents => {
                        const updatedCorrespondents = [...prevCorrespondents, username];
                        setCorrespondents(updatedCorrespondents);
                    });
                }
                setMessage(message);
            });

        } catch (error) {
            // If there's an error during fetch, handle it here (e.g., show an error message)
            console.error('Error during API call', error);
        }

    };

    useEffect(() => {

        if (correspondents.length > 1 && message.length > 0 && currentUser.length > 0) {
            createNewChat(correspondents, message).then((chat) => {
                // console.log(chat);
                window.location.href = '/chat/' + chat._id;
            });
        }
    }, [currentUser]);

    return (
        <div>
            <h1>New Chat</h1>
            <form className="chat-new-form-container" onSubmit={handleStartNewChat}>
                <label htmlFor="username">User</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter a correspondent's username"
                />
                <label htmlFor="message">Message</label>
                <input
                    type="text"
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Enter a message"
                />
                <button type="submit">Start Chat</button>
            </form>
        </div>
    );
};

export default ChatNew;