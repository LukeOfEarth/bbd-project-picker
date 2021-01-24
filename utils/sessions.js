const sessions = []

function getProjects(sessionId){
    return sessions[i];
}

function addProject(sessionId,project){
    sessions[sessionId].push(project);
}

module.exports = {
    addProject,
    getProjects
}