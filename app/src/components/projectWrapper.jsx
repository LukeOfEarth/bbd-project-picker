import React from 'react';
import Project from './project';

function getProjects(){ //Made this a functional component so it can make use of Recoil Hooks for ease of access to data
    const projects = [
        {
            title:'Project Title',
            desc:'Project Description',
            name:'Project Proposer',
        },
        {
            title:'Project Title',
            desc:'Project Description',
            name:'Project Proposer',
        }
    ];

    return projects;
}

function ProjectsWrapper(){
    
    return ( 
        <section>
            {getProjects().map((project,index) =>
                <Project data={project} key={index}/>
            )}
        </section> 
    );
}
 
export default ProjectsWrapper;