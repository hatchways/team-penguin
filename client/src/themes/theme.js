import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans"',
    fontSize: 12,
    h1: {
      fontWeight: 600
    },
    h5: {
      fontWeight: "bold"
    },
    h6: {
      fontWeight: "bold"
    }
  },
  palette: {
    primary: { main: "#3A8DFF" }
  }
});
