import React from 'react';
import Grid from '@material-ui/core/Grid';

import Message from './Message';
import {useAuth} from '../../context/auth-context';

const MessageDisplay = props => {
  const {user} = useAuth();

  const messages = props.messages.map((msg, idx) => (
    <Message
      message={msg}
      messageTime={msg.created_on}
      userEmail={msg.author_email}
      key={`${idx}-${msg}`}
      isAuthorUser={msg.author_email === user.email}
    />
  ))

  return (
    <div
      style={{backgroundColor: '#fff', padding: '18px', 
      overflow: 'scroll', flexGrow: '1'}}>
      {messages}
    </div>
)};

export default MessageDisplay;