import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import UnauthenticatedSidebar from '../UnauthenticatedSidebar/UnauthenticatedSidebar';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mainContainer : {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  createAccountHeading : {
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [language, setLanguague] = React.useState('');
  const handleChange = (event) => {
    setLanguague(event.target.value);
  };

  return (
    <div>
        <Grid container>
            <Grid
                item xs={4}
                direction='row'
            >
                <UnauthenticatedSidebar/>
            </Grid>

            <Grid
                item xs={8}
                direction='row' >
              <Container className={classes.mainContainer} component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Typography className={classes.createAccountHeading} component="h2" variant="h4">
                    Create an account
                  </Typography>
                  <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          inputProps={{style: {fontSize: 15}}}
                          InputLabelProps={{style: {fontSize: 15}}}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          inputProps={{style: {fontSize: 15}}}
                          InputLabelProps={{style: {fontSize: 15}}}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Select Primary Language
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={language}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                          >
                            <MenuItem value="">
                              English
                            </MenuItem> 
                            <MenuItem value={10}>Mandarin</MenuItem>
                            <MenuItem value={20}>French</MenuItem>
                            <MenuItem value={30}>Hindi</MenuItem>
                            <MenuItem value={40}>Spanish</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Create
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link href="#" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Container>
            </Grid>
        </Grid>
    </div>








  );
}