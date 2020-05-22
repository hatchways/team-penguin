import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";import Home from "./components/Home/Home";
import {Theme} from "./themes/Theme";
import AuthenticatedApp from "./components/AuthenticatedApp/AuthenticatedApp";
import UnauthenticatedApp from "./components/UnauthenticatedApp/UnauthenticatedApp";


function App() {
  return (
    <div>
    <MuiThemeProvider Theme={Theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={UnauthenticatedApp} />
          <Route path="/authenticated" component={AuthenticatedApp} />
        </Switch>
      </Router>
    </MuiThemeProvider>
    </div>
  );
}

export default App;
