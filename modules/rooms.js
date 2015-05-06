/**
 * Rooms Model
 * TODO file header
 */

var Questions = require('./questions');
var Room = require('./room');
var uuid = require('node-uuid');

function Rooms() {
  this.rooms = {};  // Hash containing room objects
}

/**
 * Trys to create a new room. Generates a uuid, creates a room objects,
 * and stores reference in rooms hash.
 *
 * @param data = { owner_id : Socket id, room_name : String}
 * @return {room_id: uuid, room_name: String, owner_id: Socket id}
 *         or {}
 */
Rooms.prototype.createRoom = function(data) {
  var uniqueID = uuid.v1();
  var roomData = {room_id: uniqueID, room_name: data.room_name,
    owner: data.owner_id};
  //var newRoom = new Room(roomData);
  this.rooms[uniqueID] = new Room(roomData);
  return roomData;
}

/**
 * @param roomId = String
 * @return data = {name : string,room_id : string, questions : array,
 *    top_questions : array}
 */
Rooms.prototype.joinRoom = function(roomId) {
  var room = this.rooms[roomId];
  var roomData = {room_name: room.name, room_id: room.id,
    questions: room.getQuestions(), top_questions: room.getTopVoted(5)};
  return roomData;
}

/**
 * @param data = {room_id: id, owner: id, name: string}
 */
Rooms.prototype.addRoom = function(data) {

  // Create new chatrepo for room if does not exist
  if (this.hasRoom(data.room_id))
    return false;

  // Create new room with question repository
  this.rooms[data.room_id] = new Room({id: data.room_id, owner: data.owner,
    name: data.name});
  return true;
}

/**
 * Simple boolean returns true if room is in chat
 *
 * @param room_id = String
 * @return True if room exists
 */
Rooms.prototype.hasRoom = function (room_id) {
  return (room_id in this.rooms);
}

/**
 * Deletes a room.
 *
 * @param data = {owner_id: String, room_id: String}
 * @return true if caller is owner and room exists
 */
Rooms.prototype.closeRoom = function(room_id) {
  // Check if room exists
  if (!this.hasRoom(room_id))
    throw "Room does not exist!";

  delete this.rooms[room_id];
}

/**
 * Delgates to room. @see room.js
 *
 * @param data = {room_id: id, user_id: id}
 * @return number of warnings user has
 */
Rooms.prototype.warnUser = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  return this.rooms[data.room_id].warnUser(data.user_id);
}

/**
 * Delgates to room. @see room.js
 *
 * @param data = {room_id: id, user_id: id}
 * @return true if user succesfully banned
 */
Rooms.prototype.banUser = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  return this.rooms[data.room_id].banUser(data.user_id);
}

/**
 * Delgates to room. @see room.js
 *
 * @param data = {room_id: id, user_id: id}
 * @return true if user is banned
 */
Rooms.prototype.isBanned = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  return this.rooms[data.room_id].isBanned(data.user_id);
}

/**
 * Delgates to room. @see room.js
 *
 * @param data = {room_id: id, question_text: String, asker_id: String}
 * @return newly created quesiton object
 */
Rooms.prototype.addQuestion = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  return this.rooms[data.room_id].addQuestion(data.question);
}

/**
 * Delgates to room. @see room.js
 *
 * @param data = {room_id: id, question_id: id}
 * @return true if succesfully deleted, else false
 */
Rooms.prototype.deleteQuestion = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  return this.rooms[data.room_id].deleteQuestion(data.question_id);
}

/**
 * Delgates to room. @see room.js
 *
 * @param data = {room_id: id, num_questions: int}
 * @return list of room objects
 */
Rooms.prototype.getTopVoted = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  return this.rooms[data.room_id].getTopVoted(data.num_questions);
}

/**
 * Call upvoteQuestion on room
 *
 * data = {room_id: id, question_id: id, voter_id: id}
 */
Rooms.prototype.upVoteQuestion = function(data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  this.rooms[data.room_id].upVoteQuestion(data);
}

/**
 * data = {room_id: id, question_id: id, voter_id: id}
 */
Rooms.prototype.downVoteQuestion = function(data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  this.rooms[data.room_id].downVoteQuestion(data);
}

module.exports = Rooms;
