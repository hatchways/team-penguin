import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import './style.css';

const messageBubbleStyle = {
  height: '28px',
  border: '1px solid #fff',
  backgroundColor: '#00f',
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',
  borderBottomLeftRadius: '8px',
  color: '#fff',
  padding: '8px 16px 0 16px',
  background: 'linear-gradient(0.4turn,#2962ff, #82b1ff)'
}

const Message = props => {
  return (
    <div style={{display: 'flex', flexFlow: 'row nowrap', justifyItems: 'left', alignItems: 'flex-start', margin: '18px 0'}}>
      <Avatar>S</Avatar>
      <div style={{display: 'flex', flexFlow: 'column nowrap', marginLeft: '8px'}}>
        <Typography variant='body1'>12:05</Typography>
        <div style={messageBubbleStyle}>test message body</div>
      </div>
    </div>
  )
};

export default Message;