import React, { Component } from 'react'

import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';

class Home extends Component {
    render() {
        return (
    
         <div>
                <Sidebar/>
                <Chat/>
            </div>
        )
    }
}

export default Home

