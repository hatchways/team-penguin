import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useParams, Link } from "react-router-dom";

import ChatHeader from './ChatHeader';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import {useAuth} from '../../context/auth-context';
import {useSocket} from '../../context/socket-context';
//import {sendChatMessage} from '../../util/socketClientHelpers';

const Chat = props => {
  const {messages, selectedContacts} = props;
  let { conversationId } = useParams();
  const {user} = useAuth();
  console.log('user', user);
  const {socket, sendChatMessage} = useSocket();

  const [curMessage, setCurMessage] = useState('');
  const [postedMessages, setPostedMessages] = useState([]);
  const messageInputOnChangeHandler = e => {
    setCurMessage(e.target.value)
  };

  const messageInputSubmitHandler = e => {
    if (e.key === 'Enter') {
      let message = {
        author_id: user.id,
        author_email: user.email,
        original_message: curMessage,
        language: user.language,
        translations: {}
      };
      e.preventDefault();
      sendChatMessage(user, `${user}: ${curMessage}`);
      setPostedMessages(postedMessages.concat([message]));
      //setCurMessage('');
    }
  }

  return (
    <div style={{display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between', height: '100vh'}}>
      <Link to="/conversations/5ed67f6a7e0334fa48d92549">Test Chat Link</Link>
      <ChatHeader 
        selectedContacts={selectedContacts}
      />
      <MessageDisplay
        userEmail={user.email} 
        messages={postedMessages}
      />
      <MessageInput
        userEmail={user}
        //sendMessage={props.sendMessage}
        messageInputOnChangeHandler={messageInputOnChangeHandler}
        messageInputSubmitHandler={messageInputSubmitHandler}
        curMessage={curMessage}
      />
    </div>
  );
}

export default Chat;
