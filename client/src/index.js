import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';

import {sendChatMessage} from './util/socketClientHelpers';

const socket = io.connect('http://localhost:3001/chat');
sendChatMessage(socket, 'test90@t.com', 'testing 060220')

// socket.on('chat', (data) => {
//   console.log(data);
//   socket.emit('my other event', { my: 'chat' });
// });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
