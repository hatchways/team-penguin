import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext([{}, () => {}]);
function AuthProvider({children}) {
  const [state, setState] = React.useState({
    status: 'logged out',
    error: null,
    user: null
  });

  const [token, setToken] = useState(localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null);
  const [email, setEmail] = useState(localStorage.getItem('email') ? localStorage.getItem('email'): null);
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  //checking for token and email and then accordingly updating the state
  const getUser = () => {
    if(token) {
      setState({status: 'success', error: null, user})
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    localStorage.removeItem('email');
    setEmail(null);
    localStorage.removeItem('user');
    setUser(null);
    setState({status: 'logged out', error: null, user: null})
  }

  const login = async(formValues) => {
    try {
      const res = await axios.post('http://localhost:3001/user/login', formValues);
      if(res.data.token) {
        setState({status:'success', error:null, user: res.data.user});
        localStorage.setItem('authToken', res.data.token);
        setToken(res.data.token);

        localStorage.setItem('email', res.data.email);
        setEmail(res.data.email);

        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
      }
    }
    catch(err) {
      const validationError = err.response.data.validationError || null;
      const missingDataError = err.response.data.missingData || null;
      if(validationError){
        setState({status: 'error', error: validationError, user: null}) 
      }
      else if(missingDataError) {
        setState({status: 'error', error: missingDataError, user: null})
      }
      else {
        console.error(err);
      }
    }
  }

  React.useEffect(() => {
    getUser();
  }, [token, email]);
  
  let authState = {...state, logout, login}

  /**
   * Provider component is the place where you'd pass a prop called value to, 
   * which you can subsequently consume within the Consumer component
   */
  return (
    <AuthContext.Provider value={authState}>
      {state.status === 'pending' ? (
        'Loading...'
      ) : state.status === 'logged out' ? (
        children
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

//this seems simpler method to pass functions from context to consumers
function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context;
}

//is this needed since useAuth is using the context??
function useAuthState() {
  const state = React.useContext(AuthContext)
  const isPending = state.status === 'pending'
  const isError = state.status === 'error'
  const isSuccess = state.status === 'success'
  const isAuthenticated = state.user && isSuccess
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  }
}

export {AuthProvider, useAuth, useAuthState};