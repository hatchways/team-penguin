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
import { makeStyles } from '@material-ui/core/styles';

//REMOVE
const testToUid = '5ec815fdfd43011d98648662';
const testFromUid = '5ec816abfd43011d98648663';

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
    },
    btnMixedCase: {
      textTransform: 'unset !important'
    },
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
    //TODO
    let jwtToken = '';
    let emailStr = email;
    let emailAr = [];
    //clean up email field string
    if (emailStr.indexOf(',') > -1) {
      emailAr = getEmailAr(email.trim());
    } else {
      emailAr.push(email.trim());
    }

    //build body to make post request to BE

    let body = {emailAr, to_user_id: `${testToUid}`};
    //make post request
    fetch(`http://localhost:3001/invitations/user/${testFromUid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'//,
        //'Authorization': `Bearer ${jwtToken}`
      },
      body: JSON.stringify(body)
    })
    setOpen(false);
  };

  const getEmailAr = (emailStr) => {
    let emailAr = emailStr.split(',');
    emailAr = emailAr.map(email => email.trim());
    return emailAr;
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

  //        contentstyle={{width: "100%", maxWidth: "none"}}>
  //maxWidth="large"
  return (
    <div>
      <Button color="primary" onClick={handleClickOpen} className={classes.btnMixedCase}>
        + Invite Friends
      </Button>
      <Dialog open={open} onClose={handleClose} 
        aria-labelledby="form-dialog-title" >
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
            helperText="Separate multiple emails with a comma."
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
          <Button onClick={handleClose} color="primary" variant="contained"
            className={classes.btnMixedCase} size="lg">
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
