import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Icon from '@material-ui/core/Icon';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import {useAuth} from '../../context/auth-context';

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
    flexBasis: '70px',
    flexShrink: '0',
    backgroundColor: '#fff',
    marginBottom: '5px',
    padding: '18px',
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const ChatHeader = props => {
  const {selectedContacts} = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedC: true,
  });
  const {user, logout} = useAuth();
  let initial;
  let email;
  if (selectedContacts.length === 1) {
    initial = selectedContacts[0].email[0].toUpperCase();
    email = selectedContacts[0].email;
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleLogout = (evt) => {
    logout();
  }

  return (
    <Grid
      item
      container
      spacing={0}
      direction="row"
      alignItems='center'
      className={classes.sectionHeader}
    >
      {selectedContacts.length === 1 && (
        <React.Fragment>
          <Grid item>
            <Avatar className={classes.orange}>{initial}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant='h5'>{email}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5'>online status todo</Typography>
          </Grid>
          <Grid item>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Off</Grid>
                <Grid item>
                  <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item>
            <Icon onClick={handleLogout}>more_horiz</Icon>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}

export default ChatHeader;