import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import {Theme} from "./themes/Theme";
import LandingPage from "./pages/Landing";
import InvitationDialog from "./components/Invitations/InvitationDialog";


function App() {
  return (
    <div>
    <MuiThemeProvider Theme={Theme}>
      <BrowserRouter>
        <Route path="/Home" component={Home} />
        <Route path="/" component={LandingPage} />
        <Route path="/invitation_dialog" component={InvitationDialog} />
      </BrowserRouter>
    </MuiThemeProvider>
    </div>
  );
}

export default App;
