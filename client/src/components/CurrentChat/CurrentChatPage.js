import {getCurrentUser} from "../../helpers/userHelpers";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import MessagesList from "./MessagesList";
import ChatForm from "./ChatForm";

const CurrentChatPage = (props) => {

    // get info about the chat from the URL /chat/:chatId from the server /api/chats/:chatId
    const [chat, setChat] = useState([]);
    const [correspondents, setCorrespondents] = useState({});

    // get chatId from URL /chat/:chatId
    let params = useParams();
    let chatId = params.chatId;

    const getChat = async () => {

            try {
                const response = await fetch(props.server_url + '/api/chats/' + chatId, {
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
                const result = await getChat();
                setChat(result);
                let correspondentUsers = {};
                for (let i = 0; i < result.correspondents.length; i++) {
                    correspondentUsers[result.correspondents[i]] = await getCurrentUser(props.server_url, result.correspondents[i]);
                }
                setCorrespondents(correspondentUsers);
            } catch (error) {
                console.error('Error fetching chat:', error);
            }
        };

        fetchData();
        console.log(correspondents);
    }, []);


    return (
        <div>
            <h2>Current Chat Page</h2>
            <h3>{chat.name}</h3>
            <MessagesList server_url={props.server_url} chat_id={chatId} correspondents={correspondents} />
            <ChatForm server_url={props.server_url} chat_id={chatId} />
        </div>
    );

};

export default CurrentChatPage;