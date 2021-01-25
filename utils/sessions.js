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

function addProject(sessionId,project){
    sessions[sessionId].projects.push(project);
}

function removedSession(sessionId){

}


module.exports = {
    addSession,
    removedSession,
    getProjects,
    addProject
}