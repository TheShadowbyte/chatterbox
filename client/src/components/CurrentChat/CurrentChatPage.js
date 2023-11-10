import {getCurrentUser} from "../../helpers/userHelpers";
import {useEffect, useState, useRef} from "react";
import { useParams } from 'react-router-dom';
import MessagesList from "./MessagesList";
import ChatForm from "./ChatForm";

const CurrentChatPage = (props) => {

    if (!localStorage.getItem('token')) {
        window.location.href = '/login';
    }
    const token = localStorage.getItem('token');
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userJson = JSON.parse(rawPayload);

    const [chat, setChat] = useState([]);
    const [correspondents, setCorrespondents] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [senderUsername, setSenderUsername] = useState('');

    const webSocket = useRef(null);

    let params = useParams();
    let chatId = params.chatId;
    let heartBeatTimeout;

    // fetch chat
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

    // fetch messages
    const getMessages = async () => {

        try {
            const response = await fetch(props.server_url + '/api/messages/get/' + chatId, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            return await response.json();
        } catch (error) {
            console.error('Error during API call', error);
        }

    };


    // WebSocket
    useEffect(() => {

        if (!webSocket.current) {
            webSocket.current = new WebSocket('ws://localhost:8088');
        }

        webSocket.current.onopen = () => {
            console.log('WebSocket Connected');
            let fetchUser = async () => {
                let senderUsername = await getCurrentUser(props.server_url, userJson.user.id);
                setSenderUsername(senderUsername.username);
            };
            fetchUser().catch((error) => {
                console.error('Error:', error);
            });
        };

        webSocket.current.onmessage = (event) => {

            console.log('New message received:', event.data);

            if (typeof event.data === 'string') {
                console.log(event.data);
            }
            else if (event.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = function() {
                    console.log(JSON.parse(reader.result));
                    // setNewMessage(JSON.parse(reader.result));
                    setMessages(prevMessages => [...prevMessages, JSON.parse(reader.result)]);
                };
                reader.readAsText(event.data);
            }

        };

        webSocket.current.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        webSocket.current.onclose = () => {
            console.log('WebSocket Disconnected');
        };

    }, [newMessage]);

    // getChat() call and set correspondents
    useEffect(() => {

        const fetchData = async () => {
            try {
                const chatResponse = await getChat();
                setChat(chatResponse);
                let correspondentUsers = [];
                for (let i = 0; i < chatResponse.correspondents.length; i++) {
                    let user = await getCurrentUser(props.server_url, chatResponse.correspondents[i]);
                    correspondentUsers.push(user);
                }
                setCorrespondents(correspondentUsers);
            } catch (error) {
                console.error('Error fetching chat:', error);
            }
        };

        fetchData().catch((error) => {
            console.error('Error:', error);
        });

    }, []);

    // getMessages() call and set messages
    useEffect(() => {

        const fetchData = async () => {
            try {
                const messagesResponse = await getMessages();
                let messagesWithUsernames = [];
                for (let j = 0; j < messagesResponse.length; j++) {
                    for (let i = 0; i < correspondents.length; i++) {
                        if (correspondents[i].id === messagesResponse[j].sender) {
                            messagesWithUsernames.push({
                                id: messagesResponse[j]._id,
                                sender: correspondents[i].username,
                                content: messagesResponse[j].content,
                                sentAt: messagesResponse[j].sentAt
                            });
                        }
                    }
                }
                messagesWithUsernames.sort((a, b) => (a.sentAt > b.sentAt) ? 1 : -1);
                setMessages(messagesWithUsernames);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }

        };

        fetchData().catch((error) => {
            console.error('Error:', error);
        });

    }, [correspondents]);

    const sendMessage = (message) => {
        if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {

            let pollingId = '';
            let possibleChars = 'abcdef0123456789';
            for (let i = 0; i < 24; i++) {
                pollingId += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            }

            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let milliseconds = date.getMilliseconds();
            let sentAt = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds + 'Z';

            const jsonMessage = {
                id: pollingId,
                sender: senderUsername,
                content: message,
                sentAt: sentAt
            };

            webSocket.current.send(JSON.stringify(jsonMessage));
            // setMessages(prevMessages => [...prevMessages, jsonMessage]);
        }
    };

    return (
        <div>
            <MessagesList
                server_url={props.server_url}
                chat_id={chatId}
                correspondents={correspondents}
                latest_messages={messages}
                local_user={senderUsername}
            />
            <ChatForm
                server_url={props.server_url}
                chat_id={chatId}
                sendMessage={sendMessage}
            />
        </div>
    );

};

export default CurrentChatPage;