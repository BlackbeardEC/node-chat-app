const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');



  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Room Name required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUsers(params.room));
    // socket.leave('The office fans');

    // io.emit emits to every single connected user
    // socket.broadcast.emit sends to everyone in server except current user
    // socket.emit emits specifically to one user

    //io.to('The Office Fans').emit - takes room name exactly as provided
    // socket.broadcast.to('The Office Fans').emit

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined this chat.`));

    callback();
  });

  socket.on('createMessage', (msg, callback)=>{
    if(msg.text.length <= 0){
      return
    }
    console.log('createMessage:', msg);

    io.emit('newMessage', generateMessage(msg.from, msg.text));
    callback();

  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', ()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUsers(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
