import React, {useEffect, useState} from 'react';
import Project from './project';
import Suggestion from './suggestionForm';
import { useSocket } from '../contexts/socket-provider';

function ProjectsWrapper(){ //Made this a functional component so it can make use of Recoil Hooks for ease of access to data
    const socket = useSocket();
    const [votes,setVotes] = useState(2); //This will be set by the admin, but for now it's 2
    const [projects,setProjects] = useState([]);



    // useEffect(() => {
    //     if(socket == null) return;

    //     socket.on('test',(test) => console.log(test));

    //     socket.on('projects-updated', (projects) => {
    //         setProjects(projects);
    //         console.log(projects);
    //     });
    // },[socket]);
    
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

    const addNewProject = (project) => {
        /*setProjects([
            ...projects,
            project]
        );*/
        const addition = {
            project,
            sessionId:0
        }
        socket.emit('test','test');
        socket.emit('add-project',addition);
        console.log('add called',addition);
    }

    return ( 
        <section>
            {projects.map((project,index) =>
                <Project data={project} key={index} handleVote={handleVote} handleVoteRemoved={handleVoteRemoved}/>
            )}
            <Suggestion addNewProject={addNewProject}/>
        </section> 
    );
}
 
export default ProjectsWrapper;