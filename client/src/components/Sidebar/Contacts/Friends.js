import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import userPlaceholderImg from '../../../assets/user-placeholder.png';
import InvitationDialog from '../../Invitations/InvitationDialog';

const Friends = props => {
  const entries = (selected, select) => props.friends.map(curr => (
    <Grid
      item
      container
      spacing={2}
      key={curr}
      onClick={() => {select(curr.index)}}
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
      <Grid item >
        <InvitationDialog />
      </Grid>
      {entries(props.selected, props.selectContact)}
    </Grid>
  );
}

export default Friends;