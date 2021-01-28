import React from 'react';
import ProjectWrapper from './projectWrapper'
import queryString from 'query-string';
import {useLocation} from 'react-router-dom';

function Room(){
    const {search} = useLocation();
    const {room} = queryString.parse(search);

    return(
        <ProjectWrapper sessionId={room}/>
    )
}

export default Room;