import React from 'react';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import userPlaceholderImg from '../../../assets/user-placeholder.png';
import InvitationDialog from '../../Invitations/InvitationDialog';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import {useAuth} from '../../../context/auth-context';

const Friends = props => {
  const {user} = useAuth();
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
            history.push(`/conversations/${json.conversationId}`);
          }
        })
        .catch(err => console.error(err));
    }
  }

  const entries = () => props.friends.map(curr => (
    <Grid
      item
      container
      spacing={2}
      key={curr}
      onClick={(ev) => contactClickHandler(curr)}
    >
      <Grid item>
        <Avatar src={userPlaceholderImg} alt="" />
      </Grid>
      <Grid item>       
        <Typography variant='h6'>{curr.split('@')[0]}</Typography>
      </Grid>
    </Grid>
  ));

  return (
    <Grid 
      container
      direction='column'
      justify='center'
      spacing={2}
    >
      <Grid item>
        <TextField id="filled-search" placeholder="Search" type="search" variant="filled" margin="normal" onChange={props.search} border={0} fullWidth InputProps={{ 
          startAdornment: (<InputAdornment position="start"><SearchIcon/></InputAdornment>)
        }}/>
      </Grid>
      <Grid item >
        <InvitationDialog loadPendingInvites={props.loadPendingInvites} />
      </Grid>
      {entries(props.selected, props.selectContact)}
    </Grid>
  );
}

export default Friends;