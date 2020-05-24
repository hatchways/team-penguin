import React from 'react';
import {useAuthState} from '../../context/auth-context';
import AuthenticatedApp from '../AuthenticatedApp/AuthenticatedApp';
import UnauthenticatedApp from '../UnauthenticatedApp/UnauthenticatedApp';

function Home() {
  const {user} = useAuthState()
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default Home;
