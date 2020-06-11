import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import classNames from 'classnames';

import './style.css';
import {getPrettyTime} from '../../util/helpers';
import {useAuth} from '../../context/auth-context';

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  }
}));

const Message = props => {
  const {message, userEmail, messageTime, ref} = props;
  const {user} = useAuth();
  const {language} = user;
  const classes = useStyles();
  var msgClass = classNames({
    messageBubble: true,
    'messageBubbleFriend': !props.isAuthorUser,
    'messageBubbleUser': props.isAuthorUser
  });

  const getUserInitial = () => {
    if (userEmail && userEmail.length) {
      return userEmail[0].toUpperCase();
    }
    return '';
  }

  if (!props.isAuthorUser) {
    const translation = message.translations ? message.translations[language] : '';

    return (
      <div ref={ref} style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '18px 0'}}>
        <Avatar className={classes.orange}>{getUserInitial()}</Avatar>
        <div style={{display: 'flex', flexFlow: 'column nowrap', marginLeft: '8px'}}>
          <Typography variant='body1' className="messageAuthorTime">{userEmail} {getPrettyTime(messageTime)}</Typography>
          <div className={msgClass}>{translation}</div>
        </div>
      </div>
    )  
  } else {
    return (
      <div ref={ref} style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'flex-end', alignItems: 'flex-end', margin: '18px 0'}}>
        <div style={{display: 'flex', flexFlow: 'column nowrap', marginLeft: '8px', alignItems: 'flex-end'}}>
          <Typography variant='body1' className="messageAuthorTime">{getPrettyTime(messageTime)}</Typography>
          <div className={msgClass}>{props.message.original_message}</div>
        </div>
      </div>
    )  
  }

};

export default Message;