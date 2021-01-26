import React, { Component } from 'react';
import '../styles/project.css';

class Finalist extends Component{
    render(){      
        return(
            <article className='project-panel'>
                <div className='project-main'>
                    <h1 className='project-title'>{this.props.data.title}</h1>
                    <p className='project-desc'>{this.props.data.desc}</p>
                </div>
                <div className='project-meta'>
                    <h2 className='name'>{this.props.data.name}</h2>
                </div>
            </article>
        )
    }
}

export default Finalist;