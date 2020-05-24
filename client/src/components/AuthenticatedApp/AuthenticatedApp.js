import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat.js';
import { useAuth } from '../../context/auth-context';

const AuthenticatedApp = () => {
    let {logout, user} = useAuth();

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
                    <h1>Username: {user.username}</h1>
                    <button onClick={logout}>test logout
                    </button> 

                </Grid>
            </Grid>

        </div>
    )
}
export default AuthenticatedApp;
