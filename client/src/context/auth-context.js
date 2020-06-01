import React, { useState } from 'react';
import axios from 'axios';


/**
 * createContext creates an object with 2 components: a Provider and Consumer
 *  to pass props within a Context, you must use both the Provider and the Consumer component.
 */
const AuthContext = React.createContext([{}, () => {}]);
function AuthProvider({children}) {
  const [state, setState] = React.useState({
    status: 'pending',
    error: null,
    user: null
  });

  const [token, setToken] = useState(localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null);
  const [email, setEmail] = useState(localStorage.getItem('email') ? localStorage.getItem('email'): null)

  //checking for token and email and then accordingly updating the state
  const getUser = () => {
    if(token) {
      setState({status: 'logged in', error: null, user: email})
    }
    else {
      setState({status: 'logged out', error: null, user: null})
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    localStorage.removeItem('email');
    setEmail(null);
    setState({status: 'logged out', error: null, user: null})
  }

  const login = async(formValues) => {
    try {
      const res = await axios.post('http://localhost:3001/user/login', formValues);
      if(res.data.token) {
        setState({status:'success', error:null, user: formValues.email});
        localStorage.setItem('authToken', res.data.token);
        setToken(res.data.token);

        localStorage.setItem('email', res.data.email);
        setEmail(res.data.email);
      }
    }
    catch(err) {
      err.response.data.validationError 
      ? 
      setState({status: 'error', error: err.response.data.validationError, user: null}) 
      : 
      console.error(err);
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
  console.log(authState);
  return (
    <AuthContext.Provider value={authState}>
      {state.status === 'pending' ? (
        'Loading...'
      ) : state.status === 'error' ? (
        <div>
          Oh no
          <div>
            <pre>{state.error}</pre>
          </div>
        </div>
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