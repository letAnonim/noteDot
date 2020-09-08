const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 5432
io.on('connection', socket=>{
    console.log('a user was connected!!')
    socket.on('chat message', msg=>{
        console.log(msg);
        io.emit('chat message', msg)
    })
})

server.listen(port, ()=>{
    console.log('server is running on port:'+ port)
})