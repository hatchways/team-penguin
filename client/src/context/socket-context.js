import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext([{}, () => {}])
const socket = io.connect('http://localhost:3001/chat');

function SocketProvider({children}) {
  const [curChatId, setCurChatId] = useState(null);
  const [allChatIds, setAllChatIds] = useState([]);

  const setChatRoom = ({conversationId}) => {
    socket.on('connect', function() {
      // Connected, let's sign-up for to receive messages for this room
      socket.emit('room', conversationId);
   });
  }

  const sendChatMessage = ({from_email, message, conversationId}) => {
    socket.send({message, conversationId});
  }

  const updateCurChatId = (id) => {
    if (id.length) {
      setCurChatId(id);
    }
  }

  const socketShare = {socket, sendChatMessage, curChatId, updateCurChatId, setChatRoom};

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