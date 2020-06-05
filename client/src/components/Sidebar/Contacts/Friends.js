import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import userPlaceholderImg from '../../../assets/user-placeholder.png';
import InvitationDialog from '../../Invitations/InvitationDialog';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';


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
      <Grid item>
        <TextField id="filled-search" placeholder="Search" type="search" variant="filled" margin="normal" InputProps={{ 
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