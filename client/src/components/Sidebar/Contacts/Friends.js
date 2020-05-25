import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import InvitationDialog from '../../Invitations/InvitationDialog';


const Friends = props => {
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
      key={curr.username}
      onClick={() => {select(curr.index)}}
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
        <Typography variant='h5'>{curr.username}</Typography>
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