import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import {Redirect} from 'react-router-dom'; 
import UnauthenticatedSidebar from '../UnauthenticatedSidebar/UnauthenticatedSidebar';
import useForm from '../../custom-hooks/useForm';
import validate from './validateSignup';

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
  formControl: {
    width: '100%',
    marginTop: theme.spacing(3)
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
  createAccountHeading : {
    fontWeight: theme.typography.fontWeightBold
  },
  selectEmpty: {
    marginTop: theme.spacing(3),
  },
  selectRoot: {
    fontSize: '20px',
  },
  textFieldSelectLabel: {
    fontSize: '15px',
  },
  selectTopPadding: {
    paddingTop: '10px'
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
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const { handleChange, handleSubmit, formValues, formErrors  } = useForm(submit, validate);
  const [successAlertMsg, setSuccessAlertMsg] = useState(false);
  const [errorAlertMsg, setErrorAlertMsg] = useState(false);
  const [redirect, setRedirect] = useState(null);

  async function submit() {
    if (!props.match.params.referralId) {
      try{
        const resp = await axios.post('http://localhost:3001/user/register', formValues);
        setSuccessAlertMsg(true);
        setRedirect('/login');
      }
      catch(err){
        err.response.data.email ? setErrorAlertMsg(true) : console.error(err.response);
      }  
    }
    if (props.match.params.referralId) {
      const {referralId} = props.match.params;
      try{
        const resp = await axios.post('http://localhost:3001/user/register/referral', {...formValues, referralId});
        setSuccessAlertMsg(true);
        setRedirect('/login');
      }
      catch(err){
        err.response.data.email ? setErrorAlertMsg(true) : console.error(err.response);
      }
    }
  }

  function closeAlertHandler() {
    setSuccessAlertMsg(false);
    setErrorAlertMsg(false);
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    redirect
    ?
    <Redirect to={redirect} />
    :
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
                  
              <Container  className={classes.mainContainer} component="main" maxWidth="xs">
                <CssBaseline />
                <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography classes = {{ body2: classes.body2Style }} component="p" variant="body2">
                          Already have an account? 
                          <Link className={classes.routerLink} to='/login'>
                          <Button color='primary' classes = {{ root: classes.buttonMarginRight }} variant="outlined" size="large">
                                Login
                          </Button>
                          </Link>
                          </Typography>                     
                      </Grid>
                </Grid>
                <div className={classes.paper}>
                  <Typography className={classes.createAccountHeading} component="h2" variant="h4">
                    Create an account
                  </Typography>
                  <form onSubmit={ handleSubmit } className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          type="email"
                          InputProps = {{ 
                            classes: {root: classes.textFieldSelectLabel} 
                          }}
                          InputLabelProps = {{ 
                            classes: {root: classes.textFieldSelectLabel} 
                          }}
                          value={formValues.email}
                          onChange = { handleChange }
                          error = { formErrors.email }
                          helperText= { formErrors.email || null} 
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
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          autoComplete="current-password"
                          InputProps = {{ 
                            classes: {root: classes.textFieldSelectLabel} 
                          }}
                          InputLabelProps = {{ 
                            classes: {root: classes.textFieldSelectLabel} 
                          }}
                          value={formValues.confirmPassword}
                          onChange = { handleChange }
                          error = { formErrors.confirmPassword }
                          helperText= { formErrors.confirmPassword || null}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                          <InputLabel classes = {{ root: classes.selectRoot }} shrink id="demo-simple-select-placeholder-label-label">
                            Select Primary Language
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={formValues.language}
                            onChange={handleChange}
                            className={classes.selectEmpty}
                            classes = {{ select: classes.selectTopPadding}}
                            name="language"
                          >
                            <MenuItem value='english'> English </MenuItem> 
                            <MenuItem value='mandarin'>Mandarin</MenuItem>
                            <MenuItem value='french'>French</MenuItem>
                            <MenuItem value='hindi'>Hindi</MenuItem>
                            <MenuItem value='spanish'>Spanish</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Create
                    </Button>
                  </form>
                  <Snackbar open = {successAlertMsg} autoHideDuration={3000} onClose = { closeAlertHandler }>
                          <Alert onClose={closeAlertHandler} severity="success">
                            Sign Up Successful! Redirecting to Login Page
                          </Alert>
                  </Snackbar>

                  <Snackbar open = {errorAlertMsg} autoHideDuration={5000} onClose = { closeAlertHandler }>
                          <Alert onClose={closeAlertHandler} severity="error">
                            Email already exists!
                          </Alert>
                  </Snackbar>
                </div>
              </Container>
            </Grid>
        </Grid>

    </div>
  );
}