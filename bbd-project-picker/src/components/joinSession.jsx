import React, { useEffect, useState } from 'react';

import {Table,Button, Container,Row} from 'react-bootstrap';
import { useHistory } from "react-router";

import {useSocket} from '../contexts/socket-provider';

function JoinedSession(props) {

  const history = useHistory();

  const [sessions, setSessions] = useState([]);

  const socket = useSocket();

  useEffect(() => {
    if(socket === undefined) return;

    socket.on('updated-sessions', (sessions) => {
      setSessions(sessions);
    })

    socket.on('session-joined', (sessionId) => {
      props.onSessionEntered(sessionId);
    });

    socket.emit('get-sessions');

    return () => {
      socket.off('updated-sessions');
      socket.off('session-joined');
    }
},[socket,joinSession]); 
  
  const handleActive =(sessionId) => {
    const index = sessions.findIndex((session) => session.sessionId === sessionId);
    const updateSession=sessions.slice(index,index+1)[0];
    updateSession.isActive = !updateSession.isActive;
    let newSessionArray = [...sessions];
    newSessionArray[index]=updateSession;
    setSessions({
         sessionArray: newSessionArray
    });
  }

  const onSubmit = () => {
    history.push('/session');
  }

  function joinSession(e){
    props.onSessionEntered(e.target.id);
    console.log(e.target.id);
    localStorage.setItem('old-room',localStorage.getItem('room'));
    localStorage.setItem('room',e.target.id);
    socket.emit('join-session',e.target.id,localStorage.getItem('old-room'));
  }

    return(
      <Container fluid ="md">
          <Row>
            <h3 className="m-4 d-flex justify-content-center">Session-List</h3>
            <button type='button' onClick={onSubmit}>Create a session</button>
            <Table hover>
                  <thead>
                    <tr>
                      <th>Session-List</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map(session=>
                      <tr key={session.sessionId}>
                      <td>{session.sessionName}</td>
                      <td><Button variant={session.isActive?"success":"secondary"} id={session.id} onClick={joinSession}>Join</Button></td>
                      {/* <td><Button variant={sessions.isActive?"success":"danger"} onClick={() => handleActive(sessions.sessionId)}>{sessions.isActive?'Active':'Inactive'}</Button></td> */}
                    </tr>
                      )}
                  </tbody>
            </Table>
          </Row>
      </Container>
    );
           
}
export default JoinedSession;