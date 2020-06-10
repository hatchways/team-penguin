import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '80%',
    marginTop: '1rem',
    display: 'flex'
  }
}));
const Requests = props => {
  const classes = useStyles();

  const entries = props.requests.map(curr => (
    curr.from_user_email 
    ?
    <Grid
      container
      direction='column'
      spacing={1}
      key={curr.from_user_email}
      alignItems='center'
    >
      <Card className={classes.root}>
        <CardContent>
          <Grid item container>
            <Typography variant='body1'>
              <b>{curr.from_user_email.split('@')[0]}</b> would like to add you as a friend
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
        <Grid item container spacing={2}>
          <Grid item>
            <Button 
              variant='contained' 
              color='primary'
              onClick={() => {props.updateContact(curr.from_user_email, 'approve')}}
            >
              Accept
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant='contained' 
              color='secondary'
              onClick={() => {props.updateContact(curr.from_user_email, 'reject')}}
            >
              Decline
            </Button>
          </Grid>
        </Grid>
        </CardActions>
      </Card>
    </Grid>

    :
    <p>No invitations received </p>
  ));

  return (
    <Grid 
      container
      direction='column'
      alignItems='center'
      spacing={2}
    >
      <h4 className={props.classes.invitationHeadings}>Invitations Received </h4>
      {entries}
    </Grid>
  );
}

export default Requests;