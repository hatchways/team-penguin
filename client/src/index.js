import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001/chat');
socket.on('chat', (data) => {
  console.log(data);
  socket.emit('my other event', { my: 'chat' });
});
socket.on('hi', (data) => {
  console.log(data);
});

// const socketChat = io.connect('http://localhost:3001/chat');
// socketChat.connected('news', (data) => {
//   console.log(data);
//   socket.emit('only for chat', { my: 'chat' });
// })

// const socket2 = io('/chat');
// socket2.emit('my other event', { hi: 'chat' });
// socket2.on('news', (data) => {
//   console.log(data);
// });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
