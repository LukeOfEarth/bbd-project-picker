const sessionUtil = require('./utils/sessions');
const votesUtil = require('./utils/votes');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://https://bbd-project-picker.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})};

io.on('connection', (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('join-session', (sessionId) => {
      socket.join(sessionId);
      socket.emit('session-joined',sessionId);
    });

    socket.on('session-created', (data) => {
      sessionUtil.addSession(data);
    });

    socket.on('get-sessions', () => {
        socket.emit('updated-sessions',sessionUtil.sessions);
    });

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