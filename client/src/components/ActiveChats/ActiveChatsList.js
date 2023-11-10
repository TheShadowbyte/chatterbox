import {useEffect, useState} from "react";
import {getCurrentUser} from "../../helpers/userHelpers";
import ActiveChatItem from "./ActiveChatItem";

const ActiveChatsList = (props) => {

    const token = localStorage.getItem('token');
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userJson = JSON.parse(rawPayload);

    const [currentUser, setCurrentUser] = useState('');
    const [chats, setChats] = useState([]);

    const getActiveChats = async () => {

        try {
            const response = await fetch(props.server_url + '/api/chats/all/' + userJson.user.id, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            return await response.json();
        } catch (error) {
            console.error('Error during API call', error);
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getActiveChats(); // Replace with your async function
                // Step 3: Set state
                setChats(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Active Chats</h1>

            {chats.map((chat) => (
                <ActiveChatItem key={chat._id} chat_id={chat._id} name={chat.name} correspondents={chat.correspondents} server_url={props.server_url} />
            ))}

        </div>
    );
};

export default ActiveChatsList;