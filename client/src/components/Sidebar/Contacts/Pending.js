import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '80%',
    marginTop: '0.5rem',
  }
}));

const Pending = props => {
  const classes = useStyles();

  const entries = props.pending.map(curr => (
    curr.from_user_email
    ?
    <Card className={classes.root}>
      <CardContent>
        <Grid 
          item 
          key={curr.to_user_email}
        >
          <Typography variant='body1'>
            <b>{curr.to_user_email.split('@')[0]}</b> has received your friend request
          </Typography>
        </Grid>
      </CardContent>
    </Card>
    :
    <p>No pending invitations</p>
  ));

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
    >
      <h4 className={props.classes.invitationHeadings}>Invitations Pending</h4>
      {entries}
    </Grid>
  );
}

export default Pending;