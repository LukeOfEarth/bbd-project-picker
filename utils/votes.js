const sessionUtil = require('./sessions');

function addVote(sessionId,projectId){
    let project = sessionUtil.getProject(sessionId,projectId);
    project.votes++;
    sessionUtil.updateProject(sessionId,projectId,project);
}

function removeVote(sessionId,projectId){
    let project = sessionUtil.getProject(sessionId,projectId);
    project.votes--;
    sessionUtil.updateProject(sessionId,projectId,project);
}

module.exports = {
    addVote,
    removeVote
}