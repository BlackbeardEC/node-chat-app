var socket = io();

socket.on('connect', function(){
  console.log('Connected to server.');

  socket.emit('createMessage', {
    from: 'Him',
    text: 'Hey creating a new message...'
  });

});

socket.on('disconnect', function(){
  console.log('Disconnected from server.');
});


socket.on('newMessage', function(msg){
  console.log('New message:', msg);
});
