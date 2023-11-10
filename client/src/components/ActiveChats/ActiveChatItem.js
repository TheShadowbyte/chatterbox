import {getCurrentUser} from "../../helpers/userHelpers";
import {useEffect, useState} from "react";

const ActiveChatItem = (props) => {

    const token = localStorage.getItem('token');
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userJson = JSON.parse(rawPayload);

    const [correspondents, setCorrespondents] = useState([]);

    // console.log(userJson.user.id);

    // Loop through props.correspondents and create a list of usernames that are not the current user
    const otherUsers = props.correspondents.filter((correspondent) => correspondent !== userJson.user.id);

    useEffect(() => {

        otherUsers.map((otherUser) => {
            getCurrentUser(props.server_url, otherUser).then((user) => {
                setCorrespondents([...correspondents, user.username]);
            });
        });

    }, []);

    console.log(correspondents);



    return (
        <div>
            {/*<h2>{props.name}</h2>*/}
            <h3>
                Chat with {correspondents.map((correspondent) => (
                    <a href={`/chat/${props.chat_id}`}><span>{correspondent}</span></a>
                ))}
            </h3>
        </div>
    );

};

export default ActiveChatItem;