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
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('join-session', (sessionId,leaveRoom) => {
      socket.leave(leaveRoom);
      socket.join(sessionId);
      socket.emit('session-joined',sessionId);
      // console.log(socket.rooms);
    });

    socket.on('session-created', (data) => {
      sessionUtil.addSession(data);
    });

    socket.on('get-sessions', () => {
        socket.emit('updated-sessions',sessionUtil.sessions);
    });

    socket.on('left-session',(sessionId) => {
      socket.leave(sessionId);
    })

    socket.on('get-projects', (sessionId) => {
      socket.emit('updated-projects',sessionUtil.getProjects(sessionId));
    });

    socket.on('add-project', (sessionId,project) => {
      sessionUtil.addProject(sessionId,project);

      const projectList = sessionUtil.getProjects(sessionId);

      socket.emit('updated-projects',projectList);
      socket.broadcast.to(sessionId).emit('updated-projects',projectList);
    });

    socket.on('vote-added', (sessionId,projectId) => {
      votesUtil.addVote(sessionId,projectId);
      
      const projectList = sessionUtil.getProjects(sessionId);

      socket.emit('updated-projects',projectList);
      socket.broadcast.to(sessionId).emit('updated-projects',projectList);
    });

    socket.on('vote-removed', (sessionId,projectId) => {
      votesUtil.removeVote(sessionId,projectId);

        const projectList = sessionUtil.getProjects(sessionId);
  
        socket.emit('updated-projects',projectList);
        socket.broadcast.to(sessionId).emit('updated-projects',projectList);
    });

    socket.on('session-ended', (sessionId) => {
      socket.emit('session-ended');
      socket.broadcast.to(sessionId).emit('session-ended');
      sessionUtil.removeSession(sessionId);
    });
});

http.listen(port);