import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import InputBase from '@material-ui/core/InputBase';

class MessageInput extends Component {
  state = { 
    msg: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  send = e => {
    if (e.key === 'Enter') {
      this.props.sendMessage(this.state.msg);
      this.setState({
        msg: ''
      });
    }
  }

  render() {
    return (
      <Grid item className={this.props.classes.root}>
        <InputBase 
          name='msg'
          value={this.state.msg}
          onChange={this.onChange}
          onKeyPress={this.send}
          className={this.props.classes.input}
          placeholder='Type something...'
          fullWidth
        />
      </Grid>
    );
  }
}

export default MessageInput;