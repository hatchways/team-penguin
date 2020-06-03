import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import InvitationDialog from '../../Invitations/InvitationDialog';
import {useAuth} from '../../../context/auth-context';

const Friends = props => {
  const {user} = useAuth();

  const contactClickHandler = (contactEmail) => {
    let jwtToken = localStorage.getItem('authToken');
    let emailsAr = [contactEmail, user.email];
    let body = {emailsAr};

    if (jwtToken.length && emailsAr.length) {
      //call API to either create a conversation (or find existing) and get back conversation id
      fetch('http://localhost:3001/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        },
        body: JSON.stringify(body)
      })
        .then(resp => console.log('resp', resp))
        .catch(err => console.error(err));
    }
  }

  const entries = (selected, select) => props.friends.map(curr => (
    <Grid
      container
      spacing={3}
      alignItems='center'
  //     // className={
  //     //   selected === curr.username 
  //     //   ? props.classes.friend + ' ' + props.classes.selected 
  //     //   : props.classes.friend
  //     // }
      key={curr}
      onClick={(ev) => contactClickHandler(curr)}
      //() => {select(curr.index)}
    >
  {/* 
  //     <Grid item>
  //       {curr.image ? (
  //         <Avatar 
  //           alt='avatar' 
  //           src={(curr.image.data.data, curr.image.contentType)} 
  //           //className={props.classes.avatar} 
  //         />
  //       ) : (
  //         <Avatar 
  //           alt='avatar' 
  //           //className={props.classes.avatar}
  //         >
            
  //         </Avatar>
  //       )}
  //     </Grid>*/}
      <Grid item>
        <Typography variant='h5'>{curr.split('@')[0]}</Typography>
      </Grid>
    </Grid>
  ));

  return (
    <Grid 
      container
      direction='column'
    >
      <Grid item >
        <InvitationDialog />
      </Grid>
      {entries(props.selected, props.selectContact)}
    </Grid>
  );
}

export default Friends;