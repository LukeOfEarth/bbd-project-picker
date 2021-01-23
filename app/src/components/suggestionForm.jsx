import React, { Component } from 'react';
import '../styles/suggestion.css';

class Suggestion extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    state = { 
        title:'',
        description:''
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.state.title || !this.state.description){
            alert('Error: Fields cannot be empty');
            return;
        }

        const newProject = {
            title:this.state.title,
            desc:this.state.description,
            name:'Project Proposer'
        }

        this.props.addNewProject(newProject);

        document.getElementById('form-input').value = '';
        document.getElementById('form-text').value = '';
    }

    handleChange = (event) => {
        const {name,value} = event.target;
        this.setState({
            [name]:value
        });
    }

    render() { 
        return (
            <section className='suggestion-form'>
                <h2>Propose a Project</h2>
                <form>
                    <div className='form-input'>
                        <label className='form-label'>Project Title</label>
                        <input id='form-input' type='text' name='title' onChange={this.handleChange}>
                        
                        </input>
                    </div>
                    <div className='form-input'>
                        <label className='form-label'>Project Description</label>
                        <textarea id='form-text' type='textarea' name='description' onChange={this.handleChange}>
                        
                        </textarea>
                    </div>
                    <button className='form-button' onClick={this.handleSubmit}>Submit</button>
                </form>
            </section> 
        );
    }
}
 
export default Suggestion;