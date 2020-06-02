import React from 'react';
import Grid from '@material-ui/core/Grid';

import Message from './Message';

const MessageDisplay = props => {
  //REMOVE
  const user = 'test100@t.com';

  const messages = props.messages.map(curr => (
    <Message 
      message={curr} 
      userEmail={props.userEmail}
      key={curr.id}
      isAuthorUser={curr.author_email === user}
    />
  ))

  return (
    <div
      style={{backgroundColor: '#fff', padding: '18px', 
        overflow: 'scroll', flexGrow: '1'}}
    >
      {messages}
    </div>
)};

export default MessageDisplay;