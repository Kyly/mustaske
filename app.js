var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./modules/room');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(data){
    console.log('message: ' + data.message);
  });
});

io.sockets.on('connection', function(socket){

  socket.on('chat message', function(data){
    socket.broadcast.to(data.room).emit('chat message', data.message + data.room + socket.id);
  });

  socket.on('create room', function(data){
    Room.createRoom(socket, data);
    //console.log(data.room);
  });

});



http.listen(process.env.PORT || 3000, function(){
  var port = 3000;
  if (process.env.PORT)
    port = process.env.PORT;

  console.log('listening on *: ' + port);
});
