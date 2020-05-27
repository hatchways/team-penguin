import React, {useEffect} from 'react';
import socketIOClient from "socket.io-client";
import Home from './components/Home/Home';
import './App.css';
import {AuthProvider} from './context/auth-context';

function App() {

  useEffect(() => {
    const socket = socketIOClient();
    
  }, [])
  return (
    <AuthProvider>
      <div>
        <Home />
      </div>
    </AuthProvider>
  )
}

export default App;
