import React, {useState, useEffect, useCallback } from 'react';
import Suggestion from './suggestionForm';
import Project from './project';
import {useSocket} from '../contexts/socket-provider';

function ProjectsWrapper(){
    const [projects,setProjects] = useState([]);
    const [votes,setVotes] = useState(2);
    const socket = useSocket();

    function addNewProject(project){
        socket.emit('add-project',project);
    }

    useEffect(() => {
        if(socket === undefined) return;

        socket.on('updated-projects',(projects) => {
            setProjects(projects);
        });

        socket.emit('get-projects');

        return () => socket.off('project-updated');
    },[socket,addNewProject]);

    function handleVote(){
        if(votes>0){
            setVotes((votes-1));
            console.log(votes);
            return true;
        } else{
            console.log('no votes left');
            return false;
        }
    }
    
    function handleVoteRemoved(){
        setVotes(votes+1);
        console.log(votes);
    }


    return (
        <>
            {projects.map((project,index) =>
                <Project data={project} key={index} handleVote={handleVote} handleVoteRemoved={handleVoteRemoved}/>
            )}
            <Suggestion addNewProject={addNewProject}></Suggestion>
        </>
    )
}
 
export default ProjectsWrapper;