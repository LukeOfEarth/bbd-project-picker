import React, {useState, useEffect, useCallback } from 'react';
import Suggestion from './suggestionForm';
import Project from './project';
import Finalist from './finalist';
import {useSocket} from '../contexts/socket-provider';
import {useRecoilValue} from 'recoil';
// import { session_id } from '../shared/global-state';

function ProjectsWrapper(props){
    const [sessionId,setSessionId] = useState(props.session_id);
    const [projects,setProjects] = useState([]);
    const [votes,setVotes] = useState(2);
    const [sessionActive,setSessionActive] = useState(true);
    const [finalProjects,setFinalProjects] = useState([]);
    const [maxFinalists,setMaxFinalists] = useState(2);
    const socket = useSocket();
    // const socket_id = useRecoilValue(session_id)

    function addNewProject(project){
        socket.emit('add-project',project);
    }

    useEffect(() => {
        if(socket === undefined) return;
        console.log(sessionId);

        socket.on('updated-projects',(projects) => {
            setProjects(projects);
        });

        socket.on('session-ended',() => {
            let tempProjects = projects;
            tempProjects.sort(({votes:a},{votes:b}) => b-a);
            const finalists = tempProjects.slice(0,maxFinalists);
            setFinalProjects(finalists);
            setSessionActive(false);
        });

        socket.emit('get-projects');

        return () => socket.off('project-updated');
    },[socket,addNewProject]);

    function handleVote(projectId){
        if(votes>0){
            setVotes((votes-1));
            console.log(votes);

            socket.emit('vote-added',0,projectId);
            return true;
        } else{
            console.log('no votes left');
            return false;
        }
    }
    
    function handleVoteRemoved(projectId){
        setVotes(votes+1);
        console.log(votes);

        socket.emit('vote-removed',0,projectId);
    }

    if(sessionActive){
        return (
            <>
                {projects.map((project,index) =>
                    <Project data={project} key={index} handleVote={handleVote} handleVoteRemoved={handleVoteRemoved}/>
                )}
                {console.log(sessionId)}
                <Suggestion addNewProject={addNewProject}></Suggestion>
                <button onClick={() => socket.emit('session-ended')}>End Session</button>
            </>
        )
    } else{
        return (
            <>
                <h2>Winning Projects</h2>
                {finalProjects.map((project,index) =>
                    <Finalist data={project} key={index} handleVote={handleVote} handleVoteRemoved={handleVoteRemoved}/>
                )}
            </>
        )
    }

}
 
export default ProjectsWrapper;