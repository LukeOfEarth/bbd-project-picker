const sessionUtil = require('./sessions');

function addVote(sessionId,projectId){
    return sessionUtil.getProject(sessionUtil,projectId);
    /*
    let project = sessionUtil.getProject(sessionUtil,projectId);
    project.votes++;
    sessionUtil.updateProject(sessionId,projectId,project);
    */
}

function removeVote(sessionId,projectId){
    let project = sessionUtil.getProject(sessionUtil,projectId);
    project.votes--;
    sessionUtil.updateProject(sessionId,projectId,project);
}

module.exports = {
    addVote,
    removeVote
}