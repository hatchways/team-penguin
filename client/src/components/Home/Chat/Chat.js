import React from 'react';
import Grid from '@material-ui/core/Grid';

import ChatHeader from './ChatHeader';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

const Chat = props => (
  <Grid
    item
    container
    sm={9}
    direction='column'
  >
    <ChatHeader 
      selected={props.selected}
    />
    <MessageDisplay
      username={props.username} 
      messages={props.messages}
    />
    <MessageInput
      username={props.username}
      sendMessage={props.sendMessage}
    />
  </Grid>
);

export default Chat;