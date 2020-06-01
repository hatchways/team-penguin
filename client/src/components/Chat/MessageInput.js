import React, { Component, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const MessageInput = (props) => {
  const classes = useStyles();
  const [msg, setMsg] = useState('Type something');

  const onChange = e => {
    setMsg(e.target.value)
  };

  const send = e => {
    // if (e.key === 'Enter') {
    //   this.props.sendMessage(this.state.msg);
    //   setMsg('');
    // }
  }

    return (
      <form className={classes.root} style={{backgroundColor: '#fff', padding: '18px',
        flexBasis: '50px', flexShrink: '0' }}>
        <TextField name='msg'
          value={msg}
          onChange={onChange}
          onKeyPress={send}
          fullWidth 
          margin="normal"
          variant="filled"
          className={classes.textField}
        />
      </form>
    );
}

export default MessageInput;