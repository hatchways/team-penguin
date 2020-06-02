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
  const {socket, sendChatMessage} = useSocket();





  console.log('conversationId', conversationId)
  console.log('user email', user)
  if (conversationId && sendChatMessage) {
    sendChatMessage(user, `${user} testing 060220`)
  }

  const [curMessage, setCurMessage] = useState('');

  const messageInputOnChangeHandler = e => {
    setCurMessage(e.target.value)
  };

  const messageInputSubmitHandler = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('TODO')

      //   this.props.sendMessage(curMessage);
    //   setCurMessage('');
    }
  }

  return (
    <div style={{display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between', height: '100vh'}}>
      <Link to="/conversations/5ed67f6a7e0334fa48d92549">Test Chat Link</Link>
      <ChatHeader 
        selectedContacts={selectedContacts}
      />
      <MessageDisplay
        userEmail={user} 
        messages={messages}
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
