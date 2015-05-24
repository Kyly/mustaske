/**
 * Rooms Model
 * TODO file header
 */

var Questions = require('./questions');
var Room = require('./room');
var hri = require('human-readable-ids').hri;

function Rooms() {
  this.rooms = {};  // Hash containing room objects
}

/**
 * Generates a uuid, creates a room object, and stores
 * reference in rooms hash.
 *
 * @param data = {owner_id: Socket id, room_name: String}
 * @return {room_id: String, room_name: String, owner_id: String}
 */
Rooms.prototype.createRoom = function (data) {

  var uniqueID = hri.random();

  //make sure uniqueID is unique
  while (this.hasRoom(uniqueID))
    uniqueID = hri.random();

  //create new room and add it to rooms
  data.room_id = uniqueID;
  this.rooms[uniqueID] = new Room({room_id: uniqueID, owner_id: data.owner_id,
    room_name: data.room_name});

  room = this.rooms[uniqueID];

  return {room_id: room.id, room_name: room.name, owner_id: room.owner};
}

/**
 * Called when user joins a room, returns room name, room id, all questions,
 * and top questions
 *
 * @param roomID = String
 * @return data = {room_name: string, room_id: string, questions: array,
 *    top_questions: array}
 */
Rooms.prototype.joinRoom = function (roomID) {
  // Check if room exists
  if (!this.hasRoom(roomID))
    return false;

  var room = this.rooms[roomID];
  var roomData = {
    room_name: room.name, room_id: room.id,
    questions: room.getQuestions(),
    top_questions: room.getTopVoted(5)
  };

  return roomData;
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
Rooms.prototype.closeRoom = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  if (!this.isOwner({user_id: data.owner_id, room_id: data.room_id}))
    return false;

  delete this.rooms[data.room_id];

  return true;
}
/** Checks to see if given user is owner of given room
 *
 * @param data = {user_id: String, room_id: String}
 * @return true if owner
 */
Rooms.prototype.isOwner = function(data) {
  if (!this.hasRoom(data.room_id))
    return false;

  return (this.rooms[data.room_id].owner === data.user_id);
}

/**
 * Delegates to room. @see room.js
 *
 * @param data = {room_id: String, owner_id: String, question_id: String}
 * @return {user_banned: Bool, question_id: String}
 */
Rooms.prototype.warnUser = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  return this.rooms[data.room_id].warnUser(data);
}

/**
 * Delegates to room. @see room.js
 *
 * @param data = {room_id: String, user_id: String}
 * @return true if user succesfully banned
 */
Rooms.prototype.banUser = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  return this.rooms[data.room_id].banUser(data.user_id);
}

/**
 * Delegates to room. @see room.js
 *
 * @param data = {room_id: String, user_id: String}
 * @return true if user is banned
 */
Rooms.prototype.isBanned = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  return this.rooms[data.room_id].isBanned(data.user_id);
}

/**
 * Delegates to room. @see room.js
 *
 * @param data = {room_id: String, question_text: String, asker_id: String}
 * @return newly created quesiton object
 */
Rooms.prototype.addQuestion = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  return this.rooms[data.room_id].addQuestion(data);
}

/**
 * Delegates to room. @see room.js
 *
 * @param data = {room_id: String, question_id: String, owner_id: String}
 * @return true if succesfully deleted, else false
 */
Rooms.prototype.deleteQuestion = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  return this.rooms[data.room_id].deleteQuestion(data);
}

/**
 * Delegates to room. @see room.js
 *
 * @param data = {room_id: String, num_questions: int}
 * @return list of room objects
 */
Rooms.prototype.getTopVoted = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;
  return this.rooms[data.room_id].getTopVoted(data.num_questions);
}

/**
 * Call upvoteQuestion on room
 *
 * @param data = {room_id: String, question_id: String, voter_id: String}
 */
Rooms.prototype.upvoteQuestion = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  return this.rooms[data.room_id].upvoteQuestion(data);
}

/**
 * @paramd ata = {room_id: String, question_id: String, voter_id: String}
 */
Rooms.prototype.downvoteQuestion = function (data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  return this.rooms[data.room_id].downvoteQuestion(data);
}

/**
 * Delegates to poll. @see poll.js
 *
 * @param {room_id: String, voter_id: String, option: String}
 * @return {poll_id: String, voter_id: String, prev_vote: String, cur_vote: String, num_votes: int}
 */
Rooms.prototype.vote = function(data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  return this.rooms[data.room_id].vote(data)
}

/**
 * Delegates to poll. @see poll.js
 *
 * @param data = {room_id: String, user_id: String, active: Boolean}
 * @return {starting: Boolean, stopping: Boolean}
 */
Rooms.prototype.setActive = function(data) {
  // Check if room exists
  if (!this.hasRoom(data.room_id))
    return false;

  if (!this.isOwner(data))
    return false;

  return this.rooms[data.room_id].setActive(data.active);
}

module.exports = Rooms;
