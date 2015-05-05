/**
 * This Controller will handle all the logic after an emit is received. All
 * Business Layer modules included must be required here to work properly. All
 * functions written here MUST take a reference to the calling 'socket' or else
 * the function will have no idea where to send the data back to.
 */

/**
 * Put all the requires for modules here.
 */
var Rooms = require('./rooms');

/**
 * Put all variables that are needed 'globally' by the server here.
 * More than likely, this will just be the Rooms() instance.
 */
function Controller () {
  this.guestNumber  = 1;
  this.nickNames    = {};
  this.namesUsed    = [];
  this.nameIndex;
  this.roomsObj     = new Rooms();  // TODO change to room once we are done with demo
}

/**
 * TODO function headers...
 */
Controller.prototype.initialConnect = function(socket) {
  socket.join('Lobby');
  socket.emit('join room', {room: 'Lobby'})

  var name = 'Guest' + this.guestNumber;
  this.nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name: name
  });

  this.namesUsed.push(name);
  this.guestNumber += 1;
}

/**
 * TODO function headers...
 */
Controller.prototype.disconnect = function(socket) {
  nameIndex = this.namesUsed.indexOf(this.nickNames[socket.id]);
  delete this.namesUsed[nameIndex];
  delete this.nickNames[socket.id];
}

/**
 * @param socket: IO object
 * @param roomId: id of room to join
 * @return {room_name: String, top_questions: Array,
 *             questions: Array, room_id: id}
 *          or false if room does not exist
 */
Controller.prototype.joinRoom = function(socket, roomId) {
  socket.leave(roomId.previousRoom);

  // TODO Check if room exist
  socket.join(roomId.newRoom);
  socket.emit('join room', {roomId: roomId.newRoom});
}

/**
 * @param socket: Socket IO object
 * @param roomName: name of new room
 * @return Room name and room id
 */
 Controller.prototype.createRoom = function(socket, roomName) {
   //TODO function body
 }

 /**
  * TODO function headers...
  * @param socket: Socket IO object
  * @param roomId: UUID of room to be closed
  * @return true if room closes, else false
  */
  Controller.prototype.closeRoom = function(socket, roomId) {
    //TODO function body
    // TODO check if room exists
  }

  /**
   * TODO function headers...
   */
  Controller.prototype.newQuestion = function(socket, question) {
    //TODO function body
  }

  /**
   * TODO function headers...
   */
  Controller.prototype.upvoteQuestion = function(socket, questionId) {
    //TODO function body
  }

  /**
   * TODO function headers...
   */
  Controller.prototype.downvoteQuestion = function(socket, questionId) {
    //TODO function body
  }

  /**
   * TODO function headers...
   */
  Controller.prototype.dismissQuestion = function(socket, questionId) {
    //TODO function body
  }

  /**
   * TODO function headers...
   */
  Controller.prototype.topQuestions = function(socket, n) {
    //TODO function body
  }

  /**
   * TODO function headers...
   */
  Controller.prototype.allQuestions = function(socket) {
    //TODO function body
  }

//below is used in the chat demo and shouldn't be used in actual app
//******************************************************************

  /**
   * TODO function headers...
   */
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

/**
 * TODO function headers...
 */
Controller.prototype.message = function(socket, message) {
  //console.log(io);
  socket.broadcast.to(message.room).emit('message', {
    text: this.nickNames[socket.id] + ': ' + message.text + ' ' + socket.id
  });
}

/**
 * TODO function headers...
 */
Controller.prototype.rooms = function(socket, io) {
  var allRooms = []
  for(var room in io.sockets.adapter.rooms){
      if(room !== socket.id) {
        allRooms.push(room);
      }
  }

  console.log(io.sockets.adapter.rooms);
  socket.emit('all rooms', allRooms);
}


module.exports = Controller;
