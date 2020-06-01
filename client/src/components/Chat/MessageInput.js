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
    width: '25ch',
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

  //className={this.props.classes.root}
    return (
      <form className={classes.root} style={{backgroundColor: '#fff', padding: '18px 18px 30px 18px',
        height: '50px', position: 'fixed', bottom: '0', width: '66%'}}>
        <TextField name='msg'
          value={msg}
          onChange={onChange}
          onKeyPress={send}
          margin="normal"
          variant="filled"
          className={classes.textField}
          style={{width: '93%'}}
          //fullWidth 
        />
      </form>
    );
}

export default MessageInput;