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

  const onSubmit = () => {
    history.push('/session');
  }

  function joinSession(e){    
    const newRoom = e.target.id;
    props.onSessionEntered(newRoom);
    socket.emit('join-session',newRoom);
    history.push('/project?room='+newRoom);
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
                    </tr>
                  )}
                </tbody>
          </Table>
        </Row>
    </Container>
  );
 
}
export default JoinedSession;