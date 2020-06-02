import React, {useState, useEffect} from 'react';
import {theme} from "../../themes/theme";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {isEmailValid} from '../../util/helpers';
import { useAuth } from '../../context/auth-context';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    dialogContentTextRoot: {
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      marginBottom: 0,
    },
    dialogActionsRoot: {
      justifyContent: 'center',
      margin: theme.spacing(3),
    },
    btn: {
      fontWeight: '600'
    },
    btnMixedCase: {
      textTransform: 'unset !important',
      fontWeight: '600',
      fontSize: theme.spacing(2),
    },
    btnMixedCaseCenter: {
      textTransform: 'unset !important',
      fontWeight: '600',
      fontSize: theme.spacing(2),
      alignItem: 'center',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.action.disabled,
    },
    btnOverlay: {
      zIndex: '2000',
      position: 'absolute',
      right: theme.spacing(4),
      top: theme.spacing(32.5),
    }
  }));

const dialogTitleStyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  title: {
    color: theme.palette.text.primary,
    align: 'center',
    margin: theme.spacing(3),
    fontWeight: 'bold'
  }
});

const DialogTitle = withStyles(dialogTitleStyles)((props) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div>
        <Typography variant="h5" className={classes.title}
          align="center">
            {children}
        </Typography>
      </div>
    </MuiDialogTitle>
  );
});

export default function InvitationDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('Required');
  const [copyBtnErrorMessage, setCopyBtnErrorMessage] = useState('');
  const [sendRequestErrorMessage, setSendRequestErrorMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [referralId, setReferralId] = useState('');
  const [referralUrl, setReferralUrl] = useState('');
  const classes = useStyles();
  const {user} = useAuth();

  const handleChange = (event) => {
    const {value} = event.target
    setEmail(value.trim());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (ev) => {
    setEmail('');
    setEmailErrorMessage('');
    setSubmitError('');
    setReferralUrl('');
    setCopyBtnErrorMessage('');
    setOpen(false);
  }

  const handleClickCopyBtn = (ev) => {
    ev.preventDefault();
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        if (navigator.clipboard) {
          let url = referralUrl
          navigator.clipboard.writeText(url).then(function() {
          }, function() {
            setCopyBtnErrorMessage('Cannot copy url to the clipboard. Please copy it manually.');
          });  
        }
      }
    });
  }

  const handleSave = (ev) => {
    ev.preventDefault();

    let jwtToken = localStorage.getItem('authToken');
    let toEmailAr = getEmailAr(email);

    if (!email.length) {
      const emptyEmailError = 'Please enter an email.';
      setEmailErrorMessage(emptyEmailError);
    } else if (!emailsAreValid(toEmailAr)) {
      const invalidEmailError = 'Please enter a valid email.';
      setEmailErrorMessage(invalidEmailError);
    } else {
      if (email.indexOf(',') === -1) {
        toEmailAr = [email];
      }

      if (user.length && jwtToken.length) {
        let body = {toEmailAr, referralId};
        fetch(`http://localhost:3001/invitations/user/${user}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${jwtToken}`
          },
          body: JSON.stringify(body)
        })
          .then(resp => {
            setEmail('');
            setOpen(false);
          })
          .catch(err => {
            console.error(err)
          })  
      } else {
        setSendRequestErrorMessage('The request could not be sent because your login seems invalid. Please log out and try again.')
      }
    }
  };

  const emailsAreValid = (emailArray) => {
    return emailArray.every(email => isEmailValid(email) === true);
  }

  const getEmailAr = (emailStr) => {
    let emailAr = emailStr.split(',');
    emailAr = emailAr.map(email => email.trim());
    return emailAr;
  }

  const getReferralUrl = () => {
    return `http://localhost:3001/join/${referralId}`
  }

  useEffect(() => {
    let jwtToken = localStorage.getItem('authToken');
    fetch(`http://localhost:3001/user/${user}/referralId`, {
      method: 'GET',
      headers: {
        'Authorization': `${jwtToken}`
      },
    })
      .then(resp => resp.json())
      .then(json => {
          if (json.referralId) {
            setReferralId(json.referralId);
          }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}
        className={classes.btnMixedCase} >
        + Invite Friends
      </Button>
      <Dialog open={open} onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          Invite Friends to Messenger
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentTextRoot}>
            Send your friends an invite email (comma-separated)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleChange}
            helperText={emailErrorMessage}
            InputLabelProps={{style: {fontSize: 18, color: '#000'}}}
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <DialogContentText className={classes.dialogContentTextRoot}>
            Or share referral link:
          </DialogContentText>
          <TextField
            margin="dense"
            id="referral-url"
            value={getReferralUrl()}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
            helperText={copyBtnErrorMessage}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelRoot
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="primary" 
            variant="contained"
            id="referral-url-btn"
            value={referralUrl}
            onClick={handleClickCopyBtn}
            className={classes.btnOverlay}>
            Copy Link
          </Button>
        </DialogActions>
        <DialogActions className={classes.dialogActionsRoot}>
          <Button onClick={handleSave} color="primary" variant="contained"
            size="large" className={classes.btnMixedCase}>
            Send Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
