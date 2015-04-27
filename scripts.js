
var socket = io();

$('form').submit(function(){
  var blah = prompt("what room sir?");

    socket.emit('create room', {room: blah});

  socket.emit('chat message', {message: $('#m').val(), room: blah});
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
