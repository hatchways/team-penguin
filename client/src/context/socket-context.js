import React from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext([{}, () => {}])
const socket = io.connect('http://localhost:3001/chat');

function SocketProvider({children}) {

  const sendChatMessage = (from_email, message) => {
    socket.on('chat', (data) => {
      console.log(data);
      socket.emit(from_email, { my: message });
    });
    socket.send({from_email, message});
  }

  const socketShare = {socket, sendChatMessage};

  return (
    <SocketContext.Provider value={socketShare}>
      {children}
    </SocketContext.Provider>
  )
}

function useSocket() {
  const context = React.useContext(SocketContext)
  if (context === undefined) {
    throw new Error(`useSocket must be used within a SocketProvider`)
  }
  return context;
}

export {SocketProvider, useSocket};