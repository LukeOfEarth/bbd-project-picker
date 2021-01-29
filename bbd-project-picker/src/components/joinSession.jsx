import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Table,Button, Container,Row} from 'react-bootstrap';
import { useHistory } from "react-router";
import {useSocket} from '../contexts/socket-provider';
import {clearLocalStorage} from '../shared/clear-cache';

function JoinedSession(props) {
  clearLocalStorage();
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
    },[socket,joinSession,props]);
    
    function joinSession(e){
      const newRoom = e.target.id;
  
      props.onSessionEntered(newRoom);
      socket.emit('join-session',newRoom);
      history.push('/project?room='+newRoom);
    }

  const onSubmit = () => {
    history.push('/session');
  }

    return(
      <Container fluid ="md">
          <Row>
        
          <div class="pt-3 text-center">
                      <Fab color="secondary" variant="extended" aria-label="add" onClick={onSubmit}>
                              <AddIcon/>
                              Adding new Session
                      </Fab>
                </div>
            <h3 className="m-4 d-flex justify-content-center">Session-List</h3>
            <div class="row">
               
            </div>
          
            <Table hover>
                  <thead>
                    <tr>
                      <th>Session-List</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map(sessions=>
                      <tr key={sessions.sessionId}>
                      <td>{sessions.sessionName}</td>
                      <td><Button  onClick={(e) => joinSession(e)}variant={sessions.isActive?"success":"secondary"}>Join</Button></td>
                    </tr>
                  )}
                </tbody>
          </Table>
        </Row>
    </Container>
  );
 
}
export default JoinedSession;