import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans"',
    fontSize: 12,
    h1: {
      fontWeight: 600
      // could customize the h1 variant as well
    },
    // btn: {
    //   fontWeight: 600
    // }
  },
  palette: {
    primary: { main: "#3A8DFF" }
    
  }
});
