const sessionUtil = require('./utils/sessions');

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
  });
});

http.listen(port);