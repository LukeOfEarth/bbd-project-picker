import React, { Component } from 'react';
import '../styles/project.css';
import {FaThumbsUp} from 'react-icons/fa';
const classNames = require('classnames');

class Project extends Component {
    constructor(props){
        super(props);
        this.state = { 
            votedFor:false,
        }
    }

    setVote = () => {
        this.setState({votedFor:(!this.state.votedFor)});

        if(this.state.votedFor){
            this.props.handleVoteRemoved(this.props.data.projectId);
        } else{
            this.props.handleVote(this.props.data.projectId);
        }
    }

    render() { 
        let btnClasses = classNames({
            'vote':true,
            'voted-for':this.state.votedFor
        });

        return ( 
            <article className='project-panel'>
                <div className='project-main'>
                    <h1 className='project-title'>{this.props.data.title}</h1>
                    <p className='project-desc'>{this.props.data.desc}</p>
                </div>
                <div className='project-meta'>
                    <h2 className='name'>{this.props.data.name}</h2>
                    <button className={btnClasses} onClick={this.setVote}><FaThumbsUp className='icon'></FaThumbsUp></button>
                </div>
            </article>
        );
    }
}
 
export default Project;