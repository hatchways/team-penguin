import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UnauthenticatedSidebar from '../UnauthenticatedSidebar/UnauthenticatedSidebar';
import useForm from '../../custom-hooks/useForm';
import validate from './validateLogin';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useAuth } from '../../context/auth-context';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
    width: '10rem',
    height: '3rem'
  },
  mainContainer : {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  welcomeHeading : {
    fontWeight: theme.typography.fontWeightBold
  },
  textFieldSelectLabel: {
    fontSize: '15px',
  },
  buttonMarginRight : {
    marginLeft: '1rem'
  },
  body2Style : {
    marginBottom: '40px',
    fontSize: '15px'
  },
  routerLink : {
    textDecoration: 'none'
  },
  adornmentStyle: {
    color: theme.palette.primary.main
  }

}));

export default function Login() {
  const classes = useStyles();
  const { handleChange, handleSubmit, formValues, formErrors } = useForm(submit, validate);
  const [errorAlertMsg, setErrorAlertMsg] = useState('');
  const authState = useAuth();
  
  function submit() {
    authState.login(formValues);
  }

  useEffect(() => {
    if(authState.error){
      setErrorAlertMsg(authState.error);
    }
  },[authState]);

  function closeAlertHandler() {
    setErrorAlertMsg('');
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


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
            <Grid container justify='flex-end'>
                  <Grid item>
                    <Typography classes = {{ body2: classes.body2Style }} component="p" variant="body2">
                      Don't have an account? 
                      <Link className={classes.routerLink} to='/signup'>
                      <Button color='primary' classes = {{ root: classes.buttonMarginRight }} variant="outlined" size="large">
                          Create Account
                      </Button>
                      </Link>
                      </Typography>                     
                  </Grid>
            </Grid>
            <div className={classes.paper}>
              <Typography className={classes.welcomeHeading} component="h2" variant="h4">
                Welcome Back!
              </Typography>
              <form onSubmit= { handleSubmit } className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      InputProps = {{ 
                        classes: {root: classes.textFieldSelectLabel} 
                      }}
                      InputLabelProps = {{ 
                        classes: {root: classes.textFieldSelectLabel} 
                      }}
                      value={ formValues.email }
                      onChange = { handleChange }
                      error = { formErrors.email }
                      helperText = { formErrors.email || null }
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
                      InputProps = {{ 
                        endAdornment: <InputAdornment position='end'>
                          <Typography className={classes.adornmentStyle}>
                           Forgot? 
                           </Typography>
                          </InputAdornment>,
                        classes: {root: classes.textFieldSelectLabel}
                      }}
                      InputLabelProps = {{ 
                        classes: {root: classes.textFieldSelectLabel} 
                      }}
                      value={formValues.password}
                      onChange= { handleChange }
                      error = { formErrors.password }
                      helperText= { formErrors.password || null}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
              </form>
              <Snackbar open = {errorAlertMsg.length !== 0} autoHideDuration={5000} onClose = { closeAlertHandler }>
                          <Alert onClose={closeAlertHandler} severity="error">
                            {errorAlertMsg}
                          </Alert>
              </Snackbar>
            </div>
          </Container>
        </Grid>
    </Grid>
</div>
  );
}