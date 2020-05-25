import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Message = props => (
  // className={props.classes.root}
  <Grid item >
    {/*className={props.classes.message} */}
    <div >
      <Typography variant='body1'>{props.message.body}</Typography>
    </div>
  </Grid>
);

export default Message;