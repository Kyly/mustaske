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
  this.rooms = new Rooms();
}

/**
 * This is what gets called when a client initially connects to the server
 * @param socket = Socket IO object
 */
Controller.prototype.initialConnect = function(socket) {
  //here to handle the intitial connection to the server
}

/**
 * This gets called when a client disconnects from the server by way of
 * either closing the page in their browser or some unforseen connection problem
 */
Controller.prototype.disconnect = function(socket) {
  //here to handle when a user disconnects
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
Controller.prototype.joinRoom = function(io, socket, roomID) {
  if(this.rooms.hasRoom(roomID)) {
    if (!this.rooms.isBanned({user_id: socket.id, room_id: roomID})) {
      var returnData = this.rooms.joinRoom(roomID);
      socket.join(roomID);
      socket.emit('join room', returnData);
    }
  }
  socket.emit('join room', false);
}

/**
 * This handles the flow of data when a 'create room' emit is received by
 * the server
 *
 * @param socket: Socket IO object
 * @param roomName: name of new room
 * @return {room_name: String, room_id: String, user_id: String}
 */
 Controller.prototype.createRoom = function(io, socket, roomName) {
   var createData = {room_name: roomName, user_id: socket.id};
   var returnData = this.rooms.createRoom(createData);
   socket.join(returnData.room_id);
   socket.emit('create room', returnData);
 }

/**
 * This handles the flow of data when a 'leave room' emit is received by
 * the server
 *
 * @param socket: IO object
 * @param roomId: id of room to leave
 * @return  true if room exists
 *          or false if room does not exist
 */
Controller.prototype.leaveRoom = function(io, socket, roomID) {
  if(this.rooms.hasRoom(roomID)) {
    //Check if the socket leaving the room is the owner
    //If it is, delete the room and kick everyone
    if(this.rooms.isOwner({user_id: socket.id, room_id: roomID})) {
      io.sockets.in(roomID).emit('leave room');
      this.rooms.closeRoom({user_id: socket.id, room_id: roomID});
    }

    socket.leave(roomID);
    socket.emit('leave room');
  }
  else
    socket.emit('leave room');
}

  /**
   * This handles closing a specified room
   *
   * @param socket : Socket IO object
   * @param question {room_id : String, question_text : String}
   * @return {question_id: String, question_text: String}
   */
  Controller.prototype.newQuestion = function(io, socket, question) {
    var data = {
      room_id: question.room_id,
      question_text: question.question_text,
      asker_id: socket.id
      };
    var returnData = this.rooms.addQuestion(data);
    io.sockets.in(question.room_id).emit('new question', returnData);
  }

  /**
   * This handles upvoting specific questions in specific rooms
   * @param socket : Socket IO object
   * @param data = {room_id: String, question_id: String}
   * @return TODO
   */
  Controller.prototype.upvoteQuestion = function(io, socket, data) {
    var questionData = {room_id: data.room_id, question_id: data.question_id,
       voter_id: socket.id};
    var returnData = this.rooms.upvoteQuestion(questionData);
    io.sockets.in(data.room_id).emit('upvote question', returnData);
  }

  /**
   * This handles downvoting specific qustions in specific rooms
   * @param socket : Socket IO object
   * @param data : {room_id: String, question_id: String}
   * @return TODO
   */
  Controller.prototype.downvoteQuestion = function(io, socket, data) {
    var questionData = {room_id: data.room_id, question_id: data.question_id, voter_id: socket.id};
    var returnData = this.rooms.downvoteQuestion(questionData);
    io.sockets.in(data.room_id).emit('downvote question', returnData);
  }

  /**
   * This handles dismissing of questions by the owner of a room
   * @param socket : Socket IO object
   * @param data : {room_id: String, question_id: String}
   */
  Controller.prototype.dismissQuestion = function(io, socket, data) {
    var dismissData = {
      room_id:     data.room_id,
      question_id: data.question_id,
      user_id:     socket.id
    };
    var returnData = this.rooms.deleteQuestion(dismissData);
    if (returnData != false) { //question was deleted
      io.sockets.in(data.room_id).emit('dismiss question', data.question_id);
    }
  }

  /**
   * This handles returning an array filled with the top n questions based on score
   * @param socket : Socket IO object
   * @param {room_id: String, num_questions : int}
   * @return array of the top (num_questions) questions
   */
  Controller.prototype.topQuestions = function(io, socket, data) {
    var returnData = this.rooms.getTopVoted(data);
    io.sockets.in(data.room_id).emit('top questions', returnData);
  }

  /**
   * This handles returning an array filled with all of the questions in the
   * room
   * @param socket : Socket IO object
   * @param roomID : String
   * @return array of all the questions in the room
   */
  Controller.prototype.allQuestions = function(io, socket, roomID) {
    var returnData = this.rooms.getTopVoted({room_id: roomID});
    io.sockets.in(roomID).emit('top questions', returnData);
  }

  /**
   * Calls warnUser in rooms, bans user if they have already been warned
   * @param socket : Socket IO object
   * @param data = {room_id: String, question_id: String}
   */
  Controller.prototype.warnUser = function(io, socket, data) {
    var warnData = {
      user_id:     socket.id,
      question_id: data.question_id,
      room_id:     data.room_id
    };

    var returnData = this.rooms.warnUser(warnData);

    if (returnData != false) {
      if (returnData.user_banned)
        io.to(returnData.user_id).emit('ban user');
      else
        io.to(returnData.user_id).emit('warn user');
    }
  }

  /**
   * Calls banUser in rooms
   * @param socket : Socket IO object
   * @param roomID : String
   */
  Controller.prototype.banUser = function(io, socket, data) {
    var warnData = {
      user_id:     socket.id,
      question_id: data.question_id,
      room_id:     data.room_id
    };

    var returnData = this.rooms.banUser(warnData);

    if (returnData != false)
        io.to(returnData.user_id).emit('ban user');
  }

  /**
   * This handles voting on option in the poll
   * @param socket : Socket IO object
   * @param data = {room_id: String, option: String, voter_id: String}
   */
  Controller.prototype.votePoll = function(io, socket, data) {
    var voteData = {room_id: data.room_id, option: data.option, voter_id: socket.id};
    var returnData = this.rooms.vote(voteData);

    if (returnData != false)
      io.sockets.in(data.room_id).emit('vote poll', returnData);
  }

  /**
   * This handles voting on option in the poll
   * @param socket: Socket IO object
   * @param data = {room_id: String, user_id: String, active: Boolean}
   */
  Controller.prototype.setActivePoll = function(io, socket, data) {
    var activeData = {room_id: data.room_id, user_id: socket.id, active: data.active};
    var returnData = this.rooms.setActive(activeData);

    if (returnData.changed) { //poll active state has changed
      if (returnData.active)
        io.sockets.in(data.room_id).emit('start poll');
      else //stopping
        io.sockets.in(data.room_id).emit('stop poll');

    }
  }

module.exports = Controller;
