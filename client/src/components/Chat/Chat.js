import React, {useEffect, useState} from 'react';
import { useParams, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ChatHeader from './ChatHeader';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import {useAuth} from '../../context/auth-context';
import {useSocket} from '../../context/socket-context';

const MAX_MESSAGE_LENGTHS = {
  'english': 200,
  'french': 200,
  'spanish': 200,
  'mandarin': 66,
  'hindi': 66
};

const Chat = props => {
  let { conversationId } = useParams();
  const {user} = useAuth();
  const {language} = user;
  const userEmail = user.email;
  const {socket, sendChatMessage, getMessage, setChatRoom} = useSocket();

  const [curMessage, setCurMessage] = useState('');
  const [postedMessages, setPostedMessages] = useState([]);
  const [chatUserEmails, setChatUserEmails] = useState([]);
  const [messageInputError, setMessageInputError] = useState('');
  const [friendLanguage, setFriendLanguage] = useState('');
  const [languageError, setLanguageError] = useState('');
  const [showMsgInOriginalLanguage, setShowMsgInOriginalLanguage] = useState(true);

  const handleLanguageToggle = () => {
    setShowMsgInOriginalLanguage(!showMsgInOriginalLanguage);
  }

  //socket client listener for server broadcasts
  if (socket && conversationId) {
    socket.on(conversationId, (data) => {
      setPostedMessages(postedMessages.concat([data.message]));
    })
  }

  const messageInputOnChangeHandler = e => {
    let {value} = e.target;
    let maxLength = MAX_MESSAGE_LENGTHS[language];
    if (value.length <= maxLength) {
      setCurMessage(e.target.value);
    } else {
      setCurMessage(e.target.value.slice(0, maxLength - 1))
      let error = `The max message length is ${maxLength}.`;
      setMessageInputError(error);
    }
  };

  const messageInputSubmitHandler = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let message = {
        author_id: user.id,
        author_email: user.email,
        original_message: curMessage,
        language,
        created_on: Date.now(),
        translations: {}
      };
      sendChatMessage({from_email: user.email,
        message,
        conversationId,
        userEmails: chatUserEmails,
        friendLanguage
      });
      setPostedMessages(postedMessages.concat([message]));
      setCurMessage('');
      setMessageInputError('');
    }
  }

  const getFriendEmail = () => {
    let friend = chatUserEmails.filter(email => email !== user.email);
    return friend;
  }

  const switchTranslations = isChecked => {
    setShowMsgInOriginalLanguage(isChecked);
  }

  useEffect(() => {
    setPostedMessages([]);
    let jwtToken = localStorage.getItem('authToken');
    if (conversationId) {
      fetch(`http://localhost:3001/conversations/${conversationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        }
      })
        .then(resp => resp.json())
        .then(json => {
          if (json.messages && json.messages.length) {
            setPostedMessages(json.messages);
          }
          if (json.user_emails && json.user_emails.length) {
            setChatUserEmails(json.user_emails);
            //make api call to get friend language by email
            let friendEmail = json.user_emails[0] === userEmail ? json.user_emails[1]: json.user_emails[0];
            fetch(`http://localhost:3001/user/${friendEmail}/language`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${jwtToken}`
              }
            })
            .then(resp => resp.json())
            .then(json => {
              if (json.language) {
                setFriendLanguage(json.language);
              } else {
                setLanguageError(`Could not get the friend's language. Chat translations may not work.`)
              }
            })
            .catch(err => console.error('Could not get language.', err))
          }
        })
        .catch(err => console.error('Could not find existing conversation.', err))
    }
  }, [conversationId]);

  if (!conversationId) {
    return (
      <div style={{display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between', height: '100vh'}}>
        <ChatHeader 
          switchTranslations={switchTranslations}
          friendEmails={[]}
        />
        <div className="spacer">
        <Typography variant='p1'>No conversations have been started yet. Click on a contact to start chatting.</Typography>
        </div>
      </div>
    )
  }

  return (
    <div style={{display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between', height: '100vh'}}>
      <ChatHeader 
        handleLanguageToggle = {handleLanguageToggle}
        showMsgInOriginalLanguage = {showMsgInOriginalLanguage}
        friendEmails={getFriendEmail()}
      />
      <MessageDisplay
        showMsgInOriginalLanguage = {showMsgInOriginalLanguage}
        userEmail={user.email} 
        messages={postedMessages}
      />
      <MessageInput
        userEmail={user}
        messageInputOnChangeHandler={messageInputOnChangeHandler}
        messageInputSubmitHandler={messageInputSubmitHandler}
        curMessage={curMessage}
        error={messageInputError}
      />
    </div>
  );
}

export default Chat;
