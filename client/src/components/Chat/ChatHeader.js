import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  sectionHeader: {
    height: '100px',
    backgroundColor: '#ccc',
  },
}));

const ChatHeader = props => {
  const {selectedContacts} = props;
  let initial = selectedContacts.length === 1 ? selectedContacts[0].email[0].toUpperCase(): null;
  const classes = useStyles();
  return (
    <Grid
      item
      container
      spacing={3}
      alignItems='center'
      //className={props.classes.root}
      className='sectionHeader'
    >
      {selectedContacts.length === 1 && (
        <Grid item>
          <Avatar className={classes.orange}>{initial}</Avatar>
        </Grid>
      )}
  
      <Grid item>
        <Typography variant='h5'>{selectedContacts.email}</Typography>
      </Grid>
  
    </Grid>
  );
}

export default ChatHeader;