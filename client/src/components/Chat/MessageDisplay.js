import React from 'react';
import Grid from '@material-ui/core/Grid';

import Message from './Message';

const MessageDisplay = props => {
  const messages = props.messages.map(curr => (
    <Message 
      message={curr} 
      username={props.username}
      key={curr.id}
    />
  ))

  return (
    <Grid
      item
      container
      direction='column'
      // className={props.classes.root}
    >
      <br /><br /><br /><br /><br /><br />
      {messages}
    </Grid>
)};

export default MessageDisplay;