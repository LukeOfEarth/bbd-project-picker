import React, { Component } from 'react';
import '../styles/project.css';
import {FaThumbsUp} from 'react-icons/fa';
const classNames = require('classnames');

class Project extends Component {
    constructor(props){
        super(props);
        this.state = {
            projectId:this.props.data.projectId, 
            votedFor:localStorage.getItem('votes') ? localStorage.getItem('votes').includes(this.props.data.projectId) : false
        }
    }

    setVote = () => {
        this.setState({votedFor:(!this.state.votedFor)});

        if(this.state.votedFor){
            this.props.handleVoteRemoved(this.state.projectId);
            
            let votes = localStorage.getItem('votes');

            if(Array.isArray(votes)){
                votes.splice(votes.indexOf(this.state.projectId),1);
            } else{
                votes = '';
            }

            localStorage.setItem('votes',votes);

        } else{
            this.props.handleVote(this.state.projectId);
            let votes = localStorage.getItem('votes');

            if(Array.isArray(votes)){
                votes.push(this.state.projectId);
            } else{
                votes = [votes,this.state.projectId];
            }

            localStorage.setItem('votes',votes);
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