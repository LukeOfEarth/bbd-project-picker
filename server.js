const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

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
    console.log('Well you better go catch it');
});