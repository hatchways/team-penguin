import React from 'react';

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

//on session initialization, check for a jwt token,
  //if exists, assume user status success and BE will validate token on first get request
  //if not exists, update so status is error and user will be kicked back to login
const getUser = () => sleep(1000).then(() => ({username: 'elmo'}))
 .then(() => null)

const AuthContext = React.createContext()
function AuthProvider({children}) {
  const [state, setState] = React.useState({
    status: 'pending',
    error: null,
    user: null,
  })
  React.useEffect(() => {
    getUser().then(
      user => setState({status: 'success', error: null, user}),
      error => setState({status: 'error', error, user: null}),
    )
  }, [])

  return (
    <AuthContext.Provider value={state}>
      {state.status === 'pending' ? (
        'Loading...'
      ) : state.status === 'error' ? (
        <div>
          Oh no
          <div>
            <pre>{state.error.message}</pre>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
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

export {AuthProvider, useAuthState};