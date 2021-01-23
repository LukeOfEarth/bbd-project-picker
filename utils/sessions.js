const sessions = []

function addProject(sessionId,project){
    sessions[sessionId].push(project);
}

module.exports = {
    addProject
}