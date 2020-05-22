import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Message = props => (
  <Grid item className={props.classes.root}>
    <div className={props.classes.message}>
      <Typography variant='body1'>{props.message.body}</Typography>
    </div>
  </Grid>
);

export default Message;