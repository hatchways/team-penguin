import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext([{}, () => {}])
const socket = io.connect('http://localhost:3001/chat');

function SocketProvider({children}) {
  const [curChatId, setCurChatId] = useState(null);
  const [allChatIds, setAllChatIds] = useState([]);
  const sendChatMessage = (from_email, message) => {
    socket.send(message);
  }

  const updateCurChatId = (id) => {
    if (id.length) {
      setCurChatId(id);
    }
  }

  const socketShare = {socket, sendChatMessage, curChatId, updateCurChatId};

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