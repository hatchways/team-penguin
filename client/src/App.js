import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";
import {theme} from "./themes/theme";
import AuthenticatedApp from "./components/AuthenticatedApp/AuthenticatedApp";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <div>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route path="/authenticated" component={AuthenticatedApp} />
        </Switch>
      </Router>
    </MuiThemeProvider>
    </div>
  );
}

export default App;
