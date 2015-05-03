// Room model
// TODO Needs tests
var Questions = require('./questions');
var Room = require('./room');

function Rooms() {
  this.rooms = {}  // Hash containing chat repositories
}


/**
 * data = {room_id: id, owner: id, name: string}
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
 */
Rooms.prototype.hasRoom = function (room_id) {
  return (room_id in this.rooms);
}

/**
 * Deletes a chat log.
 */
Rooms.prototype.purgeRoom = function(room_id) {
  delete this.rooms[room_id];
}

/**
 * Call upvoteQuestion on room
 *
 * data = {room_id: id, question_id: id, voter_id: id}
 */
Rooms.prototype.upvoteQuestion = function(data) {
  // TODO Sanity check: Check if room exist
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  this.rooms[data.room_id].upvoteQuestion(data);
}

/**
 * data = {room_id: id, question_id: id, voter_id: id}
 */
Rooms.prototype.downvoteQuestion = function(data) {
  // TODO Sanity Check: Check if room exist
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  this.rooms[data.room_id].downvoteQuestion(data);
}

/**
 * Expects data = {room_id: id, question: Question}
 */
Rooms.prototype.logQuestion = function (data) {
  this.rooms[data.room_id].addQuestion(data.question);
}

module.exports = Rooms;
