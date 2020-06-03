import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




const Requests = props => {
  const entries = props.requests.map(curr => (
    <Grid
      item
      container
      direction='column'
      spacing={1}
      // className={props.classes.entry}
      key={curr.from_user_email}
    >
      <Grid item>
        <Typography variant='body1' align='center'>
          <b>{curr.from_user_email}</b> would like to add you as a friend
        </Typography>
      </Grid>

      <Grid item container justify='center' spacing={2}>
        <Grid item>
          <Button 
            variant='contained' 
            color='primary'
            // onClick={() => {props.updateContact(curr.username, 'accept')}}
          >
            Accept
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant='contained' 
            color='secondary'
            // onClick={() => {props.updateContact(curr.username, 'reject')}}
          >
            Decline
          </Button>
        </Grid>
      </Grid>
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

export default Requests;