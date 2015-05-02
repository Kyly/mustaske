// Room model
// TODO Needs tests
var QuestionRepo = require('./questionrepo');

function Rooms() {
  this.questionrepos = {}  // Hash containing chat repositories
}


Rooms.prototype.addRoom = function(room_id, data) {

  // Create new chatrepo for room if does not exist
  if (this.hasRoom(data.room))
    return false;

  // Create new room with question repository
  this.questionrepos[data.room] = {owner: data.owner, questions: new QuestionRepo()};
  return true;
}

/**
 * Simple boolean returns true if room is in chat
 */
Rooms.prototype.hasRoom = function (room_id) {
  return (room_id in this.questionrepos);
}

/**
 * Deletes a chat log
 */
Rooms.prototype.purgeRoom = function(room_id) {
  delete this.questionrepos[room_id];
}

/**
 * Call upvoteQuestion on room
 */
Rooms.prototype.upvoteQuestion = function(room_id, data) {
  // TODO Sanity check: Check if room exist
  if (!this.hasRoom(room_id))
    throw "Room does not exist!";

  this.questionrepos[room_id].upvoteQuestion(data);
}

Rooms.prototype.downvoteQuestion = function(room_id, data) {
  // TODO Sanity Check: Check if room exist
  if (!this.hasRoom(room_id))
    throw "Room does not exist!";

  this.questionrepos[room_id].downvoteQuestion(data);
}

module.exports = Rooms;
