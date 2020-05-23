import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ChatHeader from './ChatHeader';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

const Chat = props => (
  
    <div>
      <h1>main body here this should fill up 2/3</h1>
      test button to check theme primary color
      <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            ></Button>
    </div>
  

);

export default Chat;

//  // <Grid
  //   item
  //   container
  //   sm={9}
  //   direction='row'
  // >
    
    /* <ChatHeader 
      selected={props.selected}
    /> */
    /* <MessageDisplay
      username={props.username} 
      messages={props.messages}
    />
    <MessageInput
      username={props.username}
      sendMessage={props.sendMessage}
    /> */
  // </Grid>