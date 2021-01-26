let sessions = [];

function addSession(sessionInfo){
    sessions.push({
        ...sessionInfo,
        projects:[]
    });
}

function getProjects(sessionId){
    return sessions[sessionId].projects;
}

function getProject(sessionId,projectId){
    return 'getProject called:'+sessionId+':'+projectId;
   // return sessions[sessionId].projects[projectId];
}

function addProject(sessionId,project){
    let newId = sessions[sessionId].length;

    if(newId === undefined) newId = 0;

    const newProject = {
        ...project,
        projectId:newId,
        votes:0
    }

    sessions[sessionId].projects.push(newProject);
}

function updateProject(sessionId,projectId,project){
    return 'update called:' +sessionId+':'+projectId+':'+project;
    /*for(let s in sessions){
        if(sessions[s].id === sessionId){
            for(let p in sessions[s].projects){
                if(projects[p].projectId === projectId){
                    projects[p] = project;
                }
            }
        }
    }*/
}

function removeSession(sessionId){

}


module.exports = {
    sessions,
    addSession,
    removeSession,
    getProjects,
    getProject,
    updateProject,
    addProject
}