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
    <div
      style={{backgroundColor: '#fff', padding: '18px', height: 'calc(100vh - 180px'}}
      // className={props.classes.root}
    >
      {messages}
    </div>
)};

export default MessageDisplay;