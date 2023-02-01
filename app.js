const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/index" , (req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
})

app.get("/chat" , (req,res)=>{
    res.sendFile(__dirname + '/public/chat.html');
})

module.exports = app;
