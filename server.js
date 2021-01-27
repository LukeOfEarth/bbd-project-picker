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

io.on('connection', (socket) => {
    console.log('new connection')
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('join-session', (sessionId,leaveRoom) => {
      console.log('join session',sessionId,leaveRoom);
      socket.leave(leaveRoom);
      socket.join(sessionId);
      socket.emit('session-joined',sessionId);
      console.log(socket.rooms);
    });

    console.log(socket.rooms);

    socket.on('session-created', (data) => {
      sessionUtil.addSession(data);
    });

    socket.on('get-sessions', () => {
        socket.emit('updated-sessions',sessionUtil.sessions);
    });

    socket.on('get-projects', () => {
       // socket.emit('updated-projects',sessionUtil.getProjects(0));
    });

    socket.on('add-project', (project) => {

      sessionUtil.addProject(0,project);

      const projectList = sessionUtil.getProjects(0);

      socket.emit('updated-projects',projectList);
      socket.broadcast.emit('updated-projects',projectList);
    });

    socket.on('vote-added', (sessionId,projectId) => {
      votesUtil.addVote(sessionId,projectId);
      
      const projectList = sessionUtil.getProjects(sessionId);

      socket.emit('updated-projects',projectList);
      socket.broadcast.emit('updated-projects',projectList);
    });

    socket.on('vote-removed', (sessionId,projectId) => {
      votesUtil.removeVote(sessionId,projectId);

      const projectList = sessionUtil.getProjects(sessionId);

      socket.emit('updated-projects',projectList);
      socket.broadcast.emit('updated-projects',projectList);
    });

    socket.on('session-ended', () => {
      socket.emit('session-ended');
      socket.broadcast.emit('session-ended');
    });
});

http.listen(port);