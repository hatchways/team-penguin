import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {theme} from "../../themes/theme";
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat.js';
import { useAuth } from '../../context/auth-context';
import "../../index.css";

const messages = [
    {id: '0', body: 'test msg 1'},
    {id: '1', body: 'test msg 2'},
    {id: '2', body: 'test msg 3'}
];
//selectedContact should probably be an array to handle group convos too
const selectedContact = {username: 'test selected contact'};

const divStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
  height: '100vh',
  padding: '18px',
}

const AuthenticatedApp = () => {
    let {logout, user} = useAuth();

    return (
        <div className="app-authenticated">
            <MuiThemeProvider theme={theme}>
                <Grid container 
                    spacing={3} direction='row' 
                    >
                    <Grid item xs={4} style={divStyle}>
                        <Sidebar/>
                    </Grid>

                    <Grid item xs={8}>
                        {/* <Chat messages={messages} user={user} selectedContact={selectedContact} /> */}
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        </div>
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