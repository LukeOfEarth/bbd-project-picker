import React, { Component } from 'react';
import '../styles/startSession.css';

class StartSession extends Component {
    constructor(props){
      super(props);
      this.state = {
        data: {},
        errors: {}
      }
    }

    handleValidation(){
      let data = this.state.data;
      let errors = {};
      let formIsValid = true;
  
      //session_Name
      if(!data["sessionName"]){
        formIsValid = false;
        errors["sessionName"] = "Please enter a session name";
      }
  
      if(typeof data["sessionName"] !== "undefined"){
        if(!data["sessionName"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["sessionName"] = "Only letters";
        }      	
      }  
      
      if(!data["numberOfPeople"]){
        formIsValid = false;
        errors["numberOfPeople"] = "Please enter a numberOfPeople";
      }

      if(!data["numberOfTeams"]){
        formIsValid = false;
        errors["numberOfTeams"] = "Please enter a numberOfTeams";
      }

      if(!data["numberOfVotes"]){
        formIsValid = false;
        errors["numberOfVotes"] = "Please enter a numberOfVotes";
      }
      this.setState({errors: errors});
      return formIsValid;
    }

    handleChange(datas, e) {
      let data = this.state.data;
      data[datas] = e.target.value;
      this.setState({
        data
      });
    }

    onCreateSession = (event) => {
      event.preventDefault();
      if(this.handleValidation()){
        alert('Project picker Session created');
        this.props.history.push('/session');
      }else{
        alert("Form has errors.")
      }
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
                            ref='sessionName'
                            onChange= {this.handleChange.bind(this, "sessionName")}
                            value={this.state.data["sessionName"]}
                          />
                          <span className="error">{this.state.errors["sessionName"]}</span>
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
                            ref='numberOfPeople'
                            onChange= {this.handleChange.bind(this, "numberOfPeople")}
                          />
                          <span className="error">{this.state.errors["numberOfPeople"]}</span>

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
                            ref='numberOfTeams'
                            onChange= {this.handleChange.bind(this, "numberOfTeams")}
                          />
                          <span className="error">{this.state.errors["numberOfTeams"]}</span>
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
                            ref='numberOfVotes'
                            onChange= {this.handleChange.bind(this, "numberOfVotes")}
                          />
                          <span className="error">{this.state.errors["numberOfVotes"]}</span>
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