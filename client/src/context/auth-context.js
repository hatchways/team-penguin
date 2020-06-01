import React from 'react';
import axios from 'axios';


const sleep = time => new Promise(resolve => setTimeout(resolve, time))

//on session initialization, check for a jwt token,
  //if exists, assume user status success and BE will validate token on first get request
  //if not exists, update so status is error and user will be kicked back to login
const getUser = () => sleep(1000).then(() => ({email: 'elmo'}))
//comment following line to test authenticated
.then(() => null)

const AuthContext = React.createContext([{}, () => {}])
function AuthProvider({children}) {
  const [state, setState] = React.useState({
    status: 'pending',
    error: null,
    user: null
  });

  const logout = () => {
    localStorage.removeItem('authToken');
    setState({status: 'logged out', error: null, user: null})
  }

  const login = async(formValues) => {
    try {
      const res = await axios.post('http://localhost:3001/user/login', formValues);
      if(res.data.token) {
        setState({status:'success', error:null, user: formValues.email});
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('email', res.data.email);
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
    //if token exists set user email to '' 
    
    // const authToken = localStorage.getItem('authToken');
    // if(authToken){
    //   setState({status: 'success', error: null, user: ''})
    //   //(???) let the first api request from authenticated app handle the jwt validation
    // }
    getUser().then(
      user => setState({status: 'success', error: null, user}),
      error => setState({status: 'error', error, user: null}),
    )
  }, [])
  let authState = {...state, logout, login}
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