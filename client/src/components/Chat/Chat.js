import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ChatHeader from './ChatHeader';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

const Chat = props => {
  //const {user, messages, selectedContact} = props;
  return (
    <Grid
     item
     container
     sm={9}
     direction='row'
    >
      <h1>placeholder chat</h1>
      {/* <ChatHeader 
        selectedContact={selectedContact}
      />
      <MessageDisplay
        username={user.username} 
        messages={messages}
      />
      <MessageInput
        username={user.username}
        sendMessage={props.sendMessage}
      /> */}
    </Grid>  
  );
}

export default Chat;
