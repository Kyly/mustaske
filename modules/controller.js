/**
  * This Controller, will handl all the logic after an emit is received. All
  * Business Layer modules included must be required here to work properly.
  */

/**
  * Put all the requires for modules here.
  */
var Rooms     = require('./rooms');

function Controller () {
  this.guestNumber  = 1;
  this.nickNames    = {};
  this.namesUsed    = [];
  this.nameIndex;
  this.roomsList    = new Rooms();
}

Controller.prototype.initialConnect = function(socket) {
  socket.join('Lobby');
  socket.emit('joinResult', {room: 'Lobby'})

  var name = 'Guest' + this.guestNumber;
  this.nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name: name
  });

  this.namesUsed.push(name);
  this.guestNumber += 1;
}

Controller.prototype.disconnect = function(socket) {
  nameIndex = this.namesUsed.indexOf(this.nickNames[socket.id]);
  delete this.namesUsed[nameIndex];
  delete this.nickNames[socket.id];
}

Controller.prototype.nameAttempt = function(socket, name) {
  if (name.indexOf('Guest') == 0) {
    socket.emit('nameResult', {
      success: false,
      message: 'Names cannot begin with "Guest".'
    });
  } else {
    if (this.namesUsed.indexOf(name) == -1) {
      this.namesUsed.push(name);
      this.nickNames[socket.id] = name;
      socket.emit('nameResult', {
        success: true,
        name: name
      });
    } else {
      socket.emit('nameResult', {
        success: false,
        message: 'That name is already in use.'
      });
    }
  }
}

Controller.prototype.join = function(socket, room) {
  socket.leave(room.previousRoom);
  socket.join(room.newRoom);
  socket.emit('joinResult', {room: room.newRoom});
}

Controller.prototype.message = function(socket, message) {
  //console.log(io);
  socket.broadcast.to(message.room).emit('message', {
    text: this.nickNames[socket.id] + ': ' + message.text
  });
}

Controller.prototype.rooms = function(socket, io) {
  var allRooms = []
  for(var room in io.sockets.adapter.rooms){
      if(room !== socket.id) {
        allRooms.push(room);
      }
  }

  // console.log(io.sockets.adapter.rooms);
  socket.emit('all rooms', allRooms);
}

Controller.prototype.askQuestion = function(socket, question) {
  console.log(question.text);
}

module.exports = Controller;
