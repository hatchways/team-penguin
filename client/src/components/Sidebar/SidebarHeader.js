import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import {useAuth} from '../../context/auth-context';
import './style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  chatHeaderName: {
    padding: '0 5px',
  },
}));

const SidebarHeader = (props) => {
  const {user, logout} = useAuth();
  const email = user.email;
  const initial = user.email[0].toUpperCase();
  const classes = useStyles();

  const handleLogout = (evt) => {
    logout();
  }

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <Avatar className={classes.purple}>{initial}</Avatar>
        <Typography variant='h5' className={classes.chatHeaderName}>{email}</Typography>
        <Typography variant='p2'>online status todo</Typography>
      </div>
      <div className="headerSpacer" />
      <div className="headerRight">
        <Icon onClick={handleLogout}>more_horiz</Icon>
      </div>
    </div>
  )
}

export default SidebarHeader;