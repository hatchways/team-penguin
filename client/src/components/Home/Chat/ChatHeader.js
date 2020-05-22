import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';






const ChatHeader = props => (
  <Grid
    item
    container
    spacing={3}
    alignItems='center'
    className={props.classes.root}
  >
    <Grid item>
      {props.selected.image ? (
        <Avatar
          alt='avatar'
          src={(props.selected.image.data.data, props.selected.image.contentType)}
          className={props.classes.avatar}
        />
      ) : (
        <Avatar alt='avatar' className={props.classes.avatar}>
         
        </Avatar>
      )}
    </Grid>

    <Grid item>
      <Typography variant='h4'>{props.selected.username}</Typography>
    </Grid>

  </Grid>
);

export default ChatHeader;