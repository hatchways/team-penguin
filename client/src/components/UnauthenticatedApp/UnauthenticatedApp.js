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
//import UnauthenticatedSidebar from '../UnauthenticatedSidebar/UnauthenticatedSidebar';
// import UnauthenticatedMain from '../UnauthenticatedMain/UnauthenticatedMain.js';

const UnauthenticatedApp = () => {
  return (
    <div>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </MuiThemeProvider>
    </div>
  )
}

export default UnauthenticatedApp

/*
        <div>
            <Grid container spacing={3}>
                <Grid
                    item xs={4}
                    direction='row'
                >
                    <UnauthenticatedSidebar/>
                </Grid>

                <Grid
                    item xs={8}
                    direction='row' >
                    <UnauthenticatedMain/>
                </Grid>
            </Grid>
        </div>
    )

*/