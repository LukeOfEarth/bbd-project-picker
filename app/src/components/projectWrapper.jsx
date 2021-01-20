import React, {useState} from 'react';
import Project from './project';

function ProjectsWrapper(){ //Made this a functional component so it can make use of Recoil Hooks for ease of access to data
    const [votes,setVotes] = useState(2); //This will be set by the admin, but for now it's 2

    function getProjects(){
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
            },
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
        <section>
            {getProjects().map((project,index) =>
                <Project data={project} key={index} handleVote={handleVote} handleVoteRemoved={handleVoteRemoved}/>
            )}
        </section> 
    );
}
 
export default ProjectsWrapper;