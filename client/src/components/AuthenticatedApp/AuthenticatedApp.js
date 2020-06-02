import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {theme} from "../../themes/theme";
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import { useAuth } from '../../context/auth-context';

const messages = [
    {id: '0', body: 'test msg 1'},
    {id: '1', body: 'test msg 2'},
    {id: '2', body: 'test msg 3'}
];

//selectedContact should probably be an array to handle group convos too
const selectedContacts = [{email: 'friend'}];
//[{email: 'friend1'}, {email: 'friend2'}, {email: 'friend2'}]

const appStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.04)'
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: '0',
    },
  },
}));

const AuthenticatedApp = () => {
  //let {logout, user} = useAuth();
  //REPLACE
  let user = 'test100@t.com';
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container 
        spacing={0} direction='row' 
        className={classes.root}>
        <Grid item xs={12} sm={4} style={appStyle}>
          <Sidebar/>
        </Grid>
        <Grid item xs={12} sm={8} style={appStyle}>
          <Chat messages={messages} user={user} selectedContacts={selectedContacts} />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}

export default AuthenticatedApp;

/*
    <h1>Username: {user.username}</h1>
    <button onClick={logout}>test logout
    </button> 
*/
/*
shared state, user and/or contacts
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Chat} />
          <Route exact path="/conversations" component={Chat} />
        </Switch>
      </Router>
    </MuiThemeProvider>
*/