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
  const {messageInputOnChangeHandler, messageInputSubmitHandler, curMessage, error} = props;

    return (
      <form className={classes.root} autocomplete="off"
        style={{backgroundColor: '#fff', padding: '18px',
        flexBasis: '50px', flexShrink: '0' }}>
        <TextField name='msg'
          error={error.length}
          value={curMessage}
          onChange={messageInputOnChangeHandler}
          onKeyPress={messageInputSubmitHandler}
          placeholder="Type something"
          fullWidth 
          margin="normal"
          variant="filled"
          className={classes.textField}
          helperText={error}
        />
      </form>
    );
}

export default MessageInput;