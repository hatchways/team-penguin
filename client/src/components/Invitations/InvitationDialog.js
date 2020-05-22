import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        }
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    dialogContent: {
      width: '80%'
    }
  }));

export default function InvitationDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [referralUrl, setReferralUrl] = React.useState('http://www.messenger.com/join/123456');
  const classes = useStyles();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  //handle submit form
  const handleClose = (ev) => {
    ev.preventDefault();
    //build body to make post request to BE
    let body = {email};
    //make post request
    setOpen(false);
  };

  const getEmailAr = () => {
    let emailAr = [];

  }

  const handleClickCopyBtn = (ev) => {
    ev.preventDefault();
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        if (navigator.clipboard) {
          let url = referralUrl
          navigator.clipboard.writeText(url).then(function() {
          }, function() {
            console.log('Cannot copy url to the clipboard. Please copy it manually.')
            /* clipboard write failed */
          });  
        }
      }
    });

  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        + Invite Friends
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Invite Friends to Messenger</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Send your friends an invite email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <DialogContentText>
            Or share referral link:
          </DialogContentText>
          <TextField
            margin="dense"
            id="referral-url"
            value={referralUrl}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} 
            size="small"
            color="primary" 
            variant="contained"
            id="referral-url-btn"
            value={referralUrl}
            onClick={handleClickCopyBtn}
            >
            Copy Link
          </Button>
        </DialogActions>

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Send Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/*
<TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            variant="filled"
            InputProps={{
                readOnly: true,
              }}
            fullWidth
          />
          */
