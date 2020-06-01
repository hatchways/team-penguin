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

  //className={this.props.classes.root}
  render() {
    return (
      <InputBase 
        name='msg'
        value={this.state.msg}
        onChange={this.onChange}
        onKeyPress={this.send}
        //className={this.props.classes.input}
        style={{backgroundColor: '#fff', padding: '18px', height: '75px'}}
        placeholder='Type something...'
        fullWidth
      />
    );
  }
}

export default MessageInput;