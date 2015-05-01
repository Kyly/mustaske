// Room model
// TODO Needs tests
var QuestionRepo = require('./questionrepo');

function Rooms() {
  this.questionrepos = {}  // Hash containing chat repositories
}


Rooms.prototype.addRoom = function(data) {

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

module.exports = Rooms;
