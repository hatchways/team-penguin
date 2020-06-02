import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Pending = props => {
  const entries = props.pending.map(curr => (
    <Grid 
      item 
      key={curr.to_user_email}
      // className={props.classes.entry}
    >
      <Typography variant='body1'>
        <b>{curr.to_user_email}</b> has received your friend request
      </Typography>
    </Grid>
  ));

  return (
    <Grid
      container
      direction='column'
    >
      {entries}
    </Grid>
  );
}

export default Pending;