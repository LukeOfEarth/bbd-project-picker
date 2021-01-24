import React, { Component } from 'react';
import '../styles/startSession.css';

class StartSession extends Component {
    constructor(props){
      super(props);
      this.state = {
        data: {
          sessionName: '',
          numberOfPeople: '',
          numberOfTeams: '',
          numberOfVotes: ''
        },
        errors: {}
      }
    }
    onChange = (e) => {
      this.setState({
        data:  {...this.state.data, [e.target.name]: e.target.value}
        
      })
    }

    onCreateSession = (event) => {
      const errors = this.validate(this.state.data);
      this.setState({errors})
      event.preventDefault();
      alert('Project picker Session created');
      // this.props.history.push('/session');



    }
    validate = (data) => {
      const errors = {};
      if(!data.sessionName) errors.sessionName = '* Please enter session Name';
      if(!data.numberOfPeople) errors.numberOfPeople = '* Please enter Number of people';
      if(!data.numberOfTeams) errors.numberOfTeams = '* please enter number of teams';
      if(!data.numberOfVotes) errors.numberOfVotes = '* Please enter number of votes';
    }

    onClick = () => {
      this.props.history.push('/');
    };

    render() { 

        return ( 
            <div className='start_session'>
              <div className='sub_start_session'>
                <div className='session_header'>
                  create a New Session
                </div>
                <form autoComplete='off' className='main_form' onSubmit={this.onCreateSession}>

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
                            onChange= {this.onChange}
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
                            onChange= {this.onChange}
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
                            onChange= {this.onChange}
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
                            onChange= {this.onChange}
                            required
                          />
                    </div>
                    <div className='main_header button_inline'>
                      <button className='btn_sub' type="submit">Create</button>
                      <button className='btn_sub' id='inActive' type="cancel" onClick= {this.onClick}>Cancel</button>
                    </div>
                </form>
             </div>
            </div>
        );
    }
}
 
export default StartSession;