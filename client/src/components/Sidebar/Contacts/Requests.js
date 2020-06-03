import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




const Requests = props => {
  const entries = props.requests.map(curr => (
    curr.from_user_email 
    ?
    <Grid
      item
      container
      direction='column'
      spacing={1}
      // className={props.classes.entry}
      key={curr.from_user_email}
    >
      <Grid item container>
        <Typography variant='body1'>
          <b>{curr.from_user_email.split('@')[0]}</b> would like to add you as a friend
        </Typography>
      </Grid>

      <Grid item container spacing={2}>
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

    :
    <p>No invitations received </p>
  ));

  return (
    <Grid 
      container
      direction='column'
      spacing = {2}
    >
      <h4 className={props.classes.invitationHeadings}>Invitations Received </h4>
      {entries}
    </Grid>
  );
}

export default Requests;