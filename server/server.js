const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');


  socket.emit('newMessage', {
    from: 'Jimbo',
    msg: 'Wuss poppin',
    createdAt: 12345
  });

  socket.on('createMessage', (msg)=>{
    console.log('createMessage:', msg);
  });

  socket.on('disconnect', ()=>{
    console.log('Client disconnected from server.');
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
