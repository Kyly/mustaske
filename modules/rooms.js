// Room model
// TODO Needs tests
var QuestionRepo = require('./questionrepo');

function Rooms() {
  this.questionrepos = {}  // Hash containing chat repositories
}


Rooms.prototype.addRoom = function(data) {

  // Create new chatrepo for room if does not exist
  if (this.hasRoom(data.room_id))
    return false;

  // Create new room with question repository
  this.questionrepos[data.room_id] = {owner: data.owner, questions: new QuestionRepo()};
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
Rooms.prototype.upvoteQuestion = function(data) {
  // TODO Sanity check: Check if room exist
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  this.questionrepos[data.room_id].upvoteQuestion(data);
}

Rooms.prototype.downvoteQuestion = function(data) {
  // TODO Sanity Check: Check if room exist
  if (!this.hasRoom(data.room_id))
    throw "Room does not exist!";

  this.questionrepos[data.room_id].downvoteQuestion(data);
}

/**
 * Expects data = {room: id, question: Question}
 */
Rooms.prototype.logQuestion = function (data) {
  this.questionrepos[data.room_id].logQuestion(data);
}

module.exports = Rooms;
