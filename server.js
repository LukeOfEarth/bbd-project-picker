const sessionUtil = require('./utils/sessions');
const votesUtil = require('./utils/votes');

const express = require('express');
const app = express();
const port = 5000;
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

sessionUtil.addSession({
  id:0
});

console.log(sessionUtil.sessions);

io.on('connection', (socket) => {

    socket.on('get-projects', () => {
        socket.emit('updated-projects',sessionUtil.getProjects(0));
    });

    socket.on('add-project', (project) => {

      sessionUtil.addProject(0,project);

      const projectList = sessionUtil.getProjects(0);

      socket.emit('updated-projects',projectList);
      socket.broadcast.emit('updated-projects',projectList);
      console.log('project added');
      console.log(sessionUtil.sessions);
    });

    socket.on('vote-added', (sessionId,projectId) => {
      console.log('vote called:'+sessionId+':'+projectId);
      console.log(votesUtil.addVote(sessionId,projectId));
      /*
      const projectList = sessionUtil.getProjects(sessionId);

      socket.emit('updated-projects',projectList);
      socket.broadcast.emit('updated-projects',projectList);
      console.log('vote added');
      */
    });

    socket.on('vote-removed', (sessionId,projectId) => {
      console.log('vote remove called:');
      /*
      votesUtil.removeVote(sessionId,projectId);

      const projectList = sessionUtil.getProjects(sessionId);

      socket.emit('updated-projects',projectList);
      socket.broadcast.emit('updated-projects',projectList);
      console.log('vote removed');
      */
    });
});

http.listen(port);