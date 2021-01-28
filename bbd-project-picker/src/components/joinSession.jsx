import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Table,Button, Container,Row} from 'react-bootstrap';
import { useHistory } from "react-router";

import {useSocket} from '../contexts/socket-provider';


function JoinedSession() {

  const history = useHistory();

  const [sessions, setSessions] = useState([]);

  const socket = useSocket();

  useEffect(() => {
    if(socket === undefined) return;
    socket.on('updated-sessions', (sessions) => {
      setSessions(sessions);
    })
    socket.emit('get-sessions');

    return () => socket.off('updated-sessions');
},[socket]); 
  
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
                      <td><Button variant={sessions.isActive?"success":"secondary"}>Join</Button></td>
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