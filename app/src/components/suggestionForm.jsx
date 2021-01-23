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

        const newProject = {
            title:this.state.title,
            desc:this.state.description,
            name:'Project Proposer'
        }

        this.props.addNewProject(newProject)
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
                        <input type='text' name='title' onChange={this.handleChange}>
                        
                        </input>
                    </div>
                    <div className='form-input'>
                        <label className='form-label'>Project Description</label>
                        <textarea type='textarea' name='description' onChange={this.handleChange}>
                        
                        </textarea>
                    </div>
                    <button className='form-button' onClick={this.handleSubmit}>Submit</button>
                </form>
            </section> 
        );
    }
}
 
export default Suggestion;