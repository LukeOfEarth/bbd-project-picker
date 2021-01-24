import React from 'react';

import {Table,Button, Container,Row} from 'react-bootstrap';

class JoinedSession extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive:'true',
      join:'true',
      sessionArray:[
        {
          sessionId:'1',
          sessionName:'Session-A',
          isActive:true
        },
        {
          sessionId:'2',
          sessionName:'Session-B',
          isActive:false
        }
    ]
    }
  }
  
  handleActive =(sessionId) => {
    const index = this.state.sessionArray.findIndex((session) => session.sessionId === sessionId);
    const updateSession=this.state.sessionArray.slice(index,index+1)[0];
    updateSession.isActive = !updateSession.isActive;
    let newSessionArray = [...this.state.sessionArray];
    newSessionArray[index]=updateSession;
    this.setState({
         sessionArray: newSessionArray
    });
  }

  render() {
    return(
      <Container fluid ="md">
          <Row>
            <h3 className="m-4 d-flex justify-content-center">Session-List</h3>
            <Table hover>
                  <thead>
                    <tr>
                      <th>Session-List</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.sessionArray.map(session=>
                      <tr key={session.sessionId}>
                      <td>{session.sessionName}</td>
                      <td><Button variant={session.isActive?"success":"secondary"}>Join</Button></td>
                      <td><Button variant={session.isActive?"success":"danger"} onClick={() => this.handleActive(session.sessionId)}>{session.isActive?'Active':'Inactive'}</Button></td>
                    </tr>
                      )}
                  </tbody>
            </Table>
          </Row>
      </Container>
    );
  }             
}
export default JoinedSession;