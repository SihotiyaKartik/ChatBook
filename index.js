const express = require('express');
const app = express();
const socketio = require('socket.io');
const {formatMessage,formatJoin} = require('./utils/message');

const{  userJoin,
        userLeave,
        getCurrentUser,
        getRoomUsers
    } = require('./utils/users')


    const server = app.listen(3000,()=>{
        console.log('server is running on port 3000');
    });
app.use(express.static('public'));
const io = socketio(server);

//Run When client connects
io.on('connection',socket=>{

    //when user joined room
    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(username,room,socket.id);
        socket.join(user.room);


        socket.emit('smallMessage',formatJoin(`Welcome ${user.username} to the chat`));

        socket.broadcast.to(user.room).emit('smallMessage',formatJoin(`${user.username} joined`));

        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        });

    });

    //when user sends message
    socket.on('chatMessage',msg=>{
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message',formatMessage(user.username,msg));
    });

    //when user disconnects
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('smallMessage',formatJoin(`${user.username} left`));
            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)
            });
        }
    });

});

