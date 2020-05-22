import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans",
    fontSize: 14,
    h1: {
      // could customize the h1 variant as well
      fontWeight: 600
    },
    button: {
      fontWeight: 600
    }
  },
  palette: {
    primary: { main: "#3A8DFF" }
  },
  overrides: {
  }
});
