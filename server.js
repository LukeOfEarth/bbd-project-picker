const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');

const {addProject, getProjects} = require('./utils/sessions');

const server = http.createServer(app);
const io = socket(3001);

dotenv.config();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const mDB = mongoose.connection;

mDB.on('error', (err) => {
    console.log(err);
})

mDB.once('open',() => {
    console.log('connected to mongoDB');
});

/* server.listen(3001, () => {
    console.log('Server running on port 3001');
});*/

io.on('connection', (socket) => {
    const id = socket.handshake.query.id;
    console.log('new connection',id);

    io.on('test', () => {
        console.log('test');
    });

    socket.on('add-project',addition => {
        console.log('project received');
        addProject(addition.sessionId,addition.project);
        const projects = getProjects(sessionId);
        socket.emit('projects-updated',projects);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});