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
      style={{backgroundColor: '#fff', padding: '18px', minHeight: 'calc(100vh - 170px)',
        overflow: 'scroll'}}
    >
      {messages}
    </div>
)};

export default MessageDisplay;