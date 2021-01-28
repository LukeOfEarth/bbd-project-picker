import React, { useState } from 'react';
import '../styles/startSession.css';
import { useHistory } from "react-router";
import {useSocket} from '../contexts/socket-provider';
import {clearLocalStorage} from '../shared/clear-cache';
 
function StartSession() {

  clearLocalStorage();

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
        numberOfTeams: ''
      }
    });
    
    history.push('/list');
  }

  return ( 
      <div className='start_session'>
        <div className='sub_start_session'>
          <div className='session_header'>
            Create a New Session
          </div>
          <form autoComplete='off' className='main_form' onSubmit={onCreateSession}>

              <div className='main_header'>
                  <label htmlFor="session_input">
                    Session Name
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
                <label htmlFor="teams_input">
                  Number of Teams
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
              <div className='main_header button_inline'>
                <button className='btn_sub' type="submit">Create</button>
                <button className='btn_sub' id='inActive' type="cancel" onClick= {onCreateSession}>Cancel</button>
              </div>
          </form>
        </div>
      </div>
  );
}
 
export default StartSession;