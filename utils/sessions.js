let sessions = [];

function getSession(sessionId){
    let session;

    for(let s in sessions){
        if(sessions[s].id === sessionId){
            session = sessions[s];
        }
    }

    return session;
}

function addSession(sessionInfo){
    let newId;
    if(sessions.length){
        newId = sessions.length;
        //TODO: Fix this so it sets to current highest index +1
    }else{
        newId = 0;
    }

    sessions.push({
        ...sessionInfo,
        projects:[],
        id: newId,
        isActive: 'true',
        join: 'true'
        //TODO: Fix this so it uses actual boolean values
    });
}

function getProjects(sessionId){
    try{
        return sessions[sessionId].projects;
    } catch{
        return null;
    }
}

function getProject(sessionId,projectId){
    try{
        return sessions[sessionId].projects[projectId];
    } catch{
        return null;
    }
}

function addProject(sessionId,project){
    
    let newId;

    if(sessions[sessionId].projects.length){
        newId = sessions[sessionId].projects.length;
        //TODO: Fix this so it sets to current highest index +1
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

    try{
        sessions[sessionId].projects[projectId] = project;
    } catch{
        return;
    }
}

function removeSession(sessionId){
    const removed = sessions.filter(session => session.id === sessionId);
    sessions.splice(removed,1);
}


module.exports = {
    sessions,
    getSession,
    addSession,
    removeSession,
    getProjects,
    getProject,
    updateProject,
    addProject
}