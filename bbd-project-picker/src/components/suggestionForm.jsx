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
        this.setState({title:'',description:''});
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
                <h2 className="pb-4">Propose a Project</h2>
                <form>
                    <div className='form-group form-group row form-input'>
                        <label className="form-label col-sm-2 col-form-label">Project Title</label>
                        <input className="form-control" id='form-input' type='text' name='title' onChange={this.handleChange}>
                        
                        </input>
                    </div>
                    <div className='form-group form-group row form-input'>
                        <label className='form-label col-sm-2 col-form-label'>Project Description</label>
                        <textarea className="form-control col-sm-10" id='form-text' type='textarea' name='description' onChange={this.handleChange}>
                        
                        </textarea>
                    </div>
                    <button className='form-button'  onClick={this.handleSubmit}>Submit</button>
                </form>
            </section> 
        );
    }
}
 
export default Suggestion;