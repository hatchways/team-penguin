import React from 'react';
import Home from './components/Home/Home';
import './App.css';
import {AuthProvider} from './context/auth-context';

function App() {
  return (
    <AuthProvider>
      <div>
        <Home />
      </div>
    </AuthProvider>
  )
}

export default App;
