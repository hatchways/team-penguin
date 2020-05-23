import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat.js';
import { useAuthState} from '../../context/auth-context';

const AuthenticatedApp = () => {
    let authState = useAuthState()
    console.log('authState', authState)

    return (
        <div>
                    <Grid container spacing={3}>
                        <Grid
                            item xs={4}
                            direction='row'
                        >
                            <Sidebar/>
                        </Grid>

                        <Grid
                            item xs={8}
                            direction='row' >
                            <Chat />
                            <h1>Username: {authState.user.username}</h1>

                        </Grid>
                    </Grid>
        </div>
    )
}
export default AuthenticatedApp;
