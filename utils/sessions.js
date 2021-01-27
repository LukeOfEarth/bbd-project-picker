let sessions = [];

function addSession(sessionInfo){
    let newId;
    if(sessions.length){
        newId = sessions.length;
    }else{
        newId = 0;
    }

    sessions.push({
        ...sessionInfo,
        projects:[],
        id: newId,
        isActive: 'true',
        join: 'true'
    });


}

function getProjects(sessionId){
    return sessions[sessionId].projects;
}

function getProject(sessionId,projectId){
    return sessions[sessionId].projects[projectId];
}

function addProject(sessionId,project){
    
    let newId;

    if(sessions[sessionId].projects.length){
        newId = sessions[sessionId].projects.length;
    }else{
        newId = 0;
    }

    const newProject = {
        ...project,
        projectId:newId,
        votes:0
    }

    sessions[sessionId].projects.push(newProject);
}

function updateProject(sessionId,projectId,project){
    sessions[sessionId].projects[projectId] = project;
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