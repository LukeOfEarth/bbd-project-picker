import React, { Component } from 'react';
import {SocketContext,SocketProvider} from '../contexts/socket-provider';

class Session extends Component {
    constructor(props){
        super(props);
    }

    state = {  }

    render() {
        // const {socket} = this.context
        console.log(this.context)
        return ( <>{}</> );
    }
}

Session.contextType = SocketContext;
 
export default Session;