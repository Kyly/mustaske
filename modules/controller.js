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
  this.rooms     = new Rooms();
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
    var returnData = this.rooms.joinRoom(roomID);
    socket.join(roomID);
    socket.emit('join room', returnData);
  }
  else
    socket.emit('join room', false);
}

/**
 * This handles the flow of data when a 'create room' emit is received by
 * the server
 *
 * @param socket: Socket IO object
 * @param roomName: name of new room
 * @return {room_name: String, room_id: String, owner_id: String}
 */
 Controller.prototype.createRoom = function(io, socket, roomName) {
   var createData = {room_name: roomName, owner_id: socket.id};
   var returnData = this.rooms.createRoom(createData);
   socket.join(returnData.room_id);
   socket.emit('create room', returnData);
 }

 /**
  * This handles the flow of data when a 'close room' emit is received by
  * the server
  *
  * @param socket: Socket IO object
  * @param roomId: UUID of room to be closed
  * @return true if room closes, else false
  */
  Controller.prototype.closeRoom = function(io, socket, roomId) {
    var returnData = rooms.closeRoom({owner_id: socket.id, room_id: roomId})
    io.sockets.in(roomId).emit('close room', returnData);
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
   * @return TODO
   */
  Controller.prototype.dismissQuestion = function(io, socket, data) {
    var questionData = {room_id: data.room_id, question_id: data.question_id, owner_id: socket.id};
    var returnData = this.rooms.deleteQuestion(questionData);
    io.sockets.in(data.room_id).emit('dismiss question', returnData);
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
   * TODO
   */
  Controller.prototype.warnUser = function(io, socket, data) {
    var warnData = {owner_id: socket.id, question_id: data.question_id,
      room_id: data.room_id};
    var returnData = this.rooms.warnUser(warnData);
    io.sockets.in(data.room_id).emit('warn user', returnData);
  }

  /**
   * This handles voting on option in the poll
   * @param socket : Socket IO object
   * @param data = {room_id: String, option: String, voter_id: String}
   */
  Controller.prototype.votePoll = function(io, socket, data) {
    var voteData = {room_id: data.room_id, option: data.option, voter_id: socket.id};
    var returnData = this.rooms.vote({room_id: data.room_id, option: data.option, voter_id: socket.id});

    if (returnData.prev_vote !== returnData.cur_vote)
      io.sockets.in(data.room_id).emit('vote poll', returnData);
  }


module.exports = Controller;
