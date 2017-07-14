var socket = io();

socket.on('connect', function(){
  socket.emit('gettingReady', function(){});

});

socket.on('sendRooms', function(rooms){
  // var ol = jQuery('<ol></ol>');
  // rooms.forEach(function(room){
  //   ol.append(jQuery('<li></li>').text(room));
  // });
  // jQuery('#roomList').html(ol);

  var html = '<option selected="selected" value="0">choose a room...</option>';
  rooms.forEach(function(room) {
    html += `<option value="${room}">${room}</option>`;
  });
  html += "<option value='create' id='room-select'>Create a new room</option>";
  jQuery('#selector').html(html);
});
