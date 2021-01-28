import React, { useState } from 'react';
import '../styles/startSession.css';
import { useHistory } from "react-router";
import {useSocket} from '../contexts/socket-provider';
 
function StartSession() {

  const history = useHistory();
  const [data, setData] = useState({ });

  const socket = useSocket();


  const onChange = (e) => {
    setData({
        ...data, [e.target.name]: e.target.value 
    })
  }

  const onCreateSession = (event) => {
    event.preventDefault();
    socket.emit('session-created', data);
    setData({
      data: {
        sessionName: '',
        numberOfPeople: '',
        numberOfTeams: '',
        numberOfVotes: ''
      }
    });
    
    history.push('/');

  }

  const onClick = () => {
    history.push('/');
  };


  return ( 
      <div className='start_session'>
        <div className='sub_start_session'>
          <div className='session_header'>
            create a New Session
          </div>
          <form autoComplete='off' className='main_form' onSubmit={onCreateSession}>

              <div className='main_header'>
                  <label htmlFor="session_input">
                    session Name *
                  </label>
                    <input
                      type='text'
                      className='form_session'
                      id='session_id'
                      placeholder='Enter session name'
                      name='sessionName'
                      onChange= {onChange}
                      required
                    />
                </div>

                <div className='main_header'>
                  <label htmlFor="num_input">
                    Number of people *
                  </label>
                    <input
                      type='number'
                      className='form_session'
                      id='num_id'
                      placeholder='Enter Number of People'
                      name='numberOfPeople'
                      onChange= {onChange}
                      required
                    />
                </div>

                <div className='main_header'>
                  <label htmlFor="teams_input">
                    Number of Teams *
                  </label>
                    <input 
                      type='number'
                      className='form_session'
                      id='teams_id'
                      placeholder='Enter Number of Teams'
                      name='numberOfTeams'
                      onChange= {onChange}
                      required
                    />
                </div>

                <div className='main_header'>
                  <label htmlFor="vote_input">
                    Number of Votes *
                  </label>
                    <input
                      type='number'
                      className='form_session'
                      id='vote_id'
                      placeholder='Enter Number Of Votes'
                      name='numberOfVotes'
                      onChange= {onChange}
                      required
                    />
              </div>
              <div className='main_header button_inline'>
                <button className='btn_sub' type="submit">Create</button>
                <button className='btn_sub' id='inActive' type="cancel" onClick= {onClick}>Cancel</button>
              </div>
          </form>
        </div>
      </div>
  );
}
 
export default StartSession;