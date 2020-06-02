import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ChatHeader from './ChatHeader';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

const Chat = props => {
  const {user, messages, selectedContacts} = props;
  return (
    <div style={{display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between', height: '100vh'}}>
      <ChatHeader 
        selectedContacts={selectedContacts}
      />
      <MessageDisplay
        username={user} 
        messages={messages}
      />
      <MessageInput
        username={user}
        sendMessage={props.sendMessage}
      />
    </div>
  );
}

export default Chat;
