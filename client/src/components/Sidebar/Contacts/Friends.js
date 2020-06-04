import React, {useState, useEffect} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import userPlaceholderImg from '../../../assets/user-placeholder.png';
import InvitationDialog from '../../Invitations/InvitationDialog';
import {useAuth} from '../../../context/auth-context';

const Friends = props => {
  const {user} = useAuth();
  const [conversationId, setConversationId] = useState(null)
  let history = useHistory();

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
        .then(resp => resp.json())
        .then(json => {
          if (json.conversationId) {
            setConversationId(json.conversationId);
          }
        })
        .catch(err => console.error(err));
    }
  }

  const entries = (selected, select) => props.friends.map(curr => (
    <Grid
      item
      container
      spacing={2}
      key={curr}
      onClick={(ev) => contactClickHandler(curr)}
      //() => {select(curr.index)}
    >
      <Grid item>
        <Avatar src={userPlaceholderImg} alt="" />
      </Grid>
      <Grid item>       
        <Typography variant='h6'>{curr.split('@')[0]}</Typography>
      </Grid>
    </Grid>
  ));

  if (conversationId) {
    return (<Redirect to={`/conversations/${conversationId}`} />)
  }

  return (
    <Grid 
      container
      direction='column'
      justify='center'
      spacing={2}
    >
      <Grid item >
        <InvitationDialog />
      </Grid>
      {entries(props.selected, props.selectContact)}
    </Grid>
  );
}

export default Friends;