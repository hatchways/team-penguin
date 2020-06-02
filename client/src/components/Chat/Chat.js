import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ChatHeader from './ChatHeader';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

const Chat = props => {
  const {user, messages, selectedContacts} = props;
  const [curMessage, setCurMessage] = useState('');

  const messageInputOnChangeHandler = e => {
    setCurMessage(e.target.value)
  };

  const messageInputSubmitHandler = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('TODO')

      //   this.props.sendMessage(curMessage);
    //   setCurMessage('');
    }
  }

  return (
    <div style={{display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between', height: '100vh'}}>
      <ChatHeader 
        selectedContacts={selectedContacts}
      />
      <MessageDisplay
        userEmail={user} 
        messages={messages}
      />
      <MessageInput
        userEmail={user}
        //sendMessage={props.sendMessage}
        messageInputOnChangeHandler={messageInputOnChangeHandler}
        messageInputSubmitHandler={messageInputSubmitHandler}
        curMessage={curMessage}
      />
    </div>
  );
}

export default Chat;
