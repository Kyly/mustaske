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
function Controller() {
  this.guestNumber = 1;
  this.nickNames = {};
  this.namesUsed = [];
  this.nameIndex;
  this.roomsObj = new Rooms();  // TODO change to rooms once we are done with demo
}

/**
 * This is what gets called when a client initially connects to the server
 */
Controller.prototype.initialConnect = function (socket) {
  var newRoomId = this.createRoom(socket, 'Lobby').room_id;
  socket.join(newRoomId);
  socket.emit('join room', this.roomsObj.joinRoom(newRoomId))

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
 * This gets called when a client disconnects from the server by way of
 * either closing the page in their browser or some unforseen connection problem
 */
Controller.prototype.disconnect = function (socket) {
  nameIndex = this.namesUsed.indexOf(this.nickNames[socket.id]);
  delete this.namesUsed[nameIndex];
  delete this.nickNames[socket.id];
}

/**
 * This handles the flow of data when a 'join room' emit is received by
 * the server
 *
 * @param socket: IO object
 * @param roomId: id of room to join
 * @return {room_name: String, top_questions: Array,
 *             questions: Array, room_id: id}
 *          or false if room does not exist
 */
Controller.prototype.joinRoom = function (socket, roomId) {
  //socket.leave(roomId.previousRoom);

  if (this.roomsObj.hasRoom(roomId)) {
    socket.join(roomId);
    //console.log('Join: ' + roomId);
    socket.emit('join room', this.roomsObj.joinRoom(roomId));
  }

  else {
    socket.emit('join room', false);
  }

}

/**
 * This handles the flow of data when a 'create room' emit is received by
 * the server
 *
 * @param socket: Socket IO object
 * @param roomName: name of new room
 * @return Room name and room id
 */
Controller.prototype.createRoom = function (socket, roomName) {

  //console.log('Create room called!');
  var createData = {room_name: roomName, owner_id: socket.id};
  var returnData = this.roomsObj.createRoom(createData);
  //console.log(this.roomsObj);
  socket.join(returnData.room_id);
  socket.emit('create room', {
    room_name: returnData.room_name,
    room_id: returnData.room_id
  });
  return {room_name: returnData.room_name, room_id: returnData.room_id};
}

/**
 * This handles the flow of data when a 'close room' emit is received by
 * the server
 *
 * @param socket: Socket IO object
 * @param roomId: UUID of room to be closed
 * @return true if room closes, else false
 */
Controller.prototype.closeRoom = function (socket, roomId) {
  socket.emit('close room', rooms.closeRoom({
    owner_id: socket.id,
    room_id: roomId
  }));
}

/**
 * This handles closing a specified room
 *
 * @param socket : Socket IO object
 * @param question {room_id : String, question_text : String}
 */
Controller.prototype.newQuestion = function (socket, question) {
  var data = {
    room_id: question.room_id,
    question_text: question.questionText,
    asker_id: socket.id
  };
  socket.emit('new question', roomsObj(data));
}

/**
 * This handles upvoting specific questions in specific rooms
 * @param socket : Socket IO object
 * @param data = {room_id: String, question_id}
 */
Controller.prototype.upvoteQuestion = function (socket, data) {
  var questionData = {
    room_id: data.room_id,
    question_id: data.question_id,
    voter_id: socket.id
  };
  socket.emit('upvote question', roomsObj(questionData));
}

/**
 * TODO function headers...
 */
Controller.prototype.downvoteQuestion = function (socket, questionId) {
  //TODO function body
}

/**
 * TODO function headers...
 */
Controller.prototype.dismissQuestion = function (socket, questionId) {
  //TODO function body
}

/**
 * TODO function headers...
 */
Controller.prototype.topQuestions = function (socket, n) {
  //TODO function body
}

/**
 * TODO function headers...
 */
Controller.prototype.allQuestions = function (socket) {
  //TODO function body
}

//below is used in the chat demo and shouldn't be used in actual app
//******************************************************************

/**
 * TODO function headers...
 */
Controller.prototype.nameAttempt = function (socket, name) {
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
Controller.prototype.message = function (socket, message) {
  //console.log(io);
  socket.broadcast.to(message.room).emit('message', {
    text: this.nickNames[socket.id] + ': ' + message.text + ' ' + socket.id
  });
}

/**
 * TODO function headers...
 */
Controller.prototype.rooms = function (socket, io) {
  var allRooms = []
  for (var room in io.sockets.adapter.rooms) {
    if (room !== socket.id) {
      allRooms.push(room);
    }
  }

  //console.log(io.sockets.adapter.rooms);
  socket.emit('all rooms', allRooms);
}


module.exports = Controller;
