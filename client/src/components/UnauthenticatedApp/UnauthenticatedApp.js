import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {theme} from "../../themes/theme";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const UnauthenticatedApp = () => {
  return (
    <div>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route path="/join/:referralId" component={Signup} />
        </Switch>
      </Router>
    </MuiThemeProvider>
    </div>
  )
}

export default UnauthenticatedApp
