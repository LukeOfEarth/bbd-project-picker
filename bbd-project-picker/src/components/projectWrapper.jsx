import React, {useState, useEffect } from 'react';
import Suggestion from './suggestionForm';
import {Button} from 'react-bootstrap';
import Project from './project';
import Finalist from './finalist';
import '../styles/suggestion.css';


import {useSocket} from '../contexts/socket-provider';
import {Link} from 'react-router-dom';

function ProjectsWrapper(props){
    const [sessionId,setSessionId] = useState(props.sessionId);
    const [sessionInfo, setSessionInfo] = useState({});
    const [projects,setProjects] = useState([]);
    const [votes,setVotes] = useState(2);
    const [sessionActive,setSessionActive] = useState(true);
    const [finalProjects,setFinalProjects] = useState([]);
    const [maxFinalists,setMaxFinalists] = useState(2);
    const socket = useSocket();

    function addNewProject(project){
        socket.emit('add-project',sessionId,project);
    }

    useEffect(() => {
        if(socket === undefined) return;

        socket.on('updated-projects',(projects) => {
            setProjects(projects);
        });

        socket.on('updated-session',(session) => {
            setSessionInfo(session);
        });

        socket.on('session-ended',() => {
            let tempProjects = projects;
            tempProjects.sort(({votes:a},{votes:b}) => b-a);
            const finalists = tempProjects.slice(0,maxFinalists);
            setFinalProjects(finalists);
            setSessionActive(false);
        });

        if(sessionActive){
            socket.emit('get-projects',sessionId);
        }

        return () => {
            socket.off('updated-projects');
            socket.off('updated-session');
            socket.off('session-ended');
        }

    },[socket,addNewProject,maxFinalists,projects]);

    function handleVote(projectId){
        if(votes>0){
            setVotes((votes-1));
            console.log(votes);

            socket.emit('vote-added',sessionId,projectId);
            return true;
        } else{
            console.log('no votes left');
            return false;
        }
    }
    
    function handleVoteRemoved(projectId){
        setVotes(votes+1);
        socket.emit('vote-removed',sessionId,projectId);
    }

    if(sessionActive){
        if(projects === null){
            return(
                <h2>You are not in a live session! Please <Link to="/list">join a session</Link></h2>
            )
        }else{
            return (
                <>
                    {projects.map((project,index) =>
                        <Project maxVotes={votes} data={project} key={index} handleVote={handleVote} handleVoteRemoved={handleVoteRemoved}/>
                    )}
                    <Suggestion addNewProject={addNewProject}></Suggestion>
                    <div className="endsession">
                    <Button type="button" className="btn-danger" onClick={() => socket.emit('session-ended')}>End Session</Button>
                    </div>
                </>
            )
        }
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