import React, {useEffect, useState} from "react";

const MessagesList = (props) => {

    const [messages, setMessages] = useState([]);
    const [correspondents, setCorrespondents] = useState({});



    const getMessages = async () => {

        try {
            const response = await fetch(props.server_url + '/api/messages/get/' + props.chat_id, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ chat_id: props.chat_id }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error during API call', error);
        }

    };

    // const fetchData = async () => {
    //
    //     let result = await getMessages();
    //     setMessages(result);
    //
    // };
    //
    // fetchData();
    // console.log(messages);



    // useEffect(() => {
    //
    //     const fetchData = async () => {
    //         try {
    //             let result = await getMessages();
    //             setMessages(result);
    //
    //
    //
    //             // let messagesWithUsername = [];
    //             // for (let i = 0; i < correspondents.length; i++) {
    //             //     for (let j = 0; j < messages.length; j++) {
    //             //         if (correspondents[i].id === messages[j].sender) {
    //             //             messagesWithUsername.push({
    //             //                 sender: correspondents[i].username,
    //             //                 content: messages[j].content
    //             //             });
    //             //         }
    //             //     }
    //             // }
    //
    //             // setMessages(messagesWithUsername);
    //             //
    //             // console.log(messagesWithUsername);
    //
    //             // for (let i = 0; i < correspondents.length; i++) {
    //             //     if (correspondents[Object.keys(correspondents)[i]].username === messages[i].sender) {
    //             //         messages[i].sender = correspondents[Object.keys(correspondents)[i]].username;
    //             //     }
    //             // }
    //
    //             // if (props.correspondents.length > 0) {
    //             //     setCorrespondents(props.correspondents);
    //             //     console.log(correspondents);
    //             // }
    //         } catch (error) {
    //             console.error('Error fetching messages:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, [correspondents]);

    useEffect(() => {
        setCorrespondents(props.correspondents);
    }, []);



    return (
        <div>
            <h2>Messages List</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <p>{message.sender}</p>
                        <p>{message.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessagesList;