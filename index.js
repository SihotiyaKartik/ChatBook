const express = require('express');
const app = express();
const socketio = require('socket.io');

const server = app.listen(3000,()=>{
    console.log('serve is running on port 3000');
});

app.use(express.static('public'));
var io = socketio(server);

//Run When client connects
io.on('connection',(socket)=>{

    socket.on()
})
