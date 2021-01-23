const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');

const server = http.createServer(app);
const io = socket(server);

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

app.listen(3001, () => {
    console.log('Server running on port 3001');
});