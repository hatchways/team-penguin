import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import UnauthenticatedSidebar from '../UnauthenticatedSidebar/UnauthenticatedSidebar';
import UnauthenticatedMain from '../UnauthenticatedMain/UnauthenticatedMain.js';

const UnauthenticatedApp = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid
                    item xs={4}
                    direction='row'
                >
                    <UnauthenticatedSidebar/>
                </Grid>

                <Grid
                    item xs={8}
                    direction='row' >
                    <UnauthenticatedMain/>
                </Grid>
            </Grid>
        </div>
    )
}
export default UnauthenticatedApp
