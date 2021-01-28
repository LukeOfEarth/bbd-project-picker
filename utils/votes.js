const sessionUtil = require('./sessions');

let userVotes = [];

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

function addUserVote(user,projectId){
    for(let u in userVotes){
        if(userVotes[u].user === user){
            userVotes[u].votes.push(projectId);
        }
    }
}

module.exports = {
    addVote,
    removeVote
}