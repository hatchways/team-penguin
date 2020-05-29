import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ChatHeader from './ChatHeader';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

const Chat = props => {
  const {user, messages, selectedContacts} = props;
  return (
    <React.Fragment>
      <ChatHeader 
        selectedContacts={selectedContacts}
      />
      <MessageDisplay
        username={user.username} 
        messages={messages}
      />
      <MessageInput
        username={user.username}
        sendMessage={props.sendMessage}
      />
    </React.Fragment>
  );
}

export default Chat;
