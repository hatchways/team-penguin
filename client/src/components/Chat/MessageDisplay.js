import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';

import Message from './Message';
import {useAuth} from '../../context/auth-context';

const MessageDisplay = props => {
  const {user} = useAuth();
  const {messages} = props;

  // console.log('messages', messages);
  // const refs = messages.reduce((acc, value) => {
  //   acc[value._id] = React.createRef();
  //   return acc;
  // }, {});

  const scrollToEnd = () => {
      let lastIdx = messages.length - 1;
      let lastMsg = document.querySelector(`div[ref=${lastIdx}]`);
  //   const lastIdx = messages.length - 1;
      lastMsg.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  // useEffect(() => {
  //   scrollToEnd();
  // }, []);

  const messageList = messages.map((msg, idx) => (
    <Message
      message={msg}
      messageTime={msg.created_on}
      userEmail={msg.author_email}
      key={`${idx}-${msg}`}
      isAuthorUser={msg.author_email === user.email}
      ref={idx}
    />
  ))

  return (
    <div
      style={{backgroundColor: '#fff', padding: '18px', 
      overflow: 'scroll', flexGrow: '1'}}>
      {messageList}
    </div>
)};

export default MessageDisplay;