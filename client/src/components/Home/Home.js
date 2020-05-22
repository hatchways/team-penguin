import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';

class Home extends Component {
    render() {
        return (
            <div>
                <Grid container spacing={3}>
                <Grid
                    item xs={4}
                    //sm={3}
                    direction='row'
                    //className={props.classes.root}
                >
                    <Sidebar/>
                </Grid>

                <Grid
                    item xs={8}
                    direction='row' >
                    <Chat/>
                </Grid>

                </Grid>
            </div>
        )
    }
}
export default Home
