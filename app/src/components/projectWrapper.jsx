import React, {useState} from 'react';
import Project from './project';
import Suggestion from './suggestionForm';

function ProjectsWrapper(){ //Made this a functional component so it can make use of Recoil Hooks for ease of access to data
    const [votes,setVotes] = useState(2); //This will be set by the admin, but for now it's 2
    const [projects,setProjects] = useState([]);
    
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

    function addNewProject(project){
        setProjects([
            ...projects,
            project]
        );
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