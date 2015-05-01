// Room model
// TODO Needs tests
var QuestionRepo = require('./')

function Rooms() {
  this.chatrepos = {}  // Hash containing chat repositories
}


Rooms.prototype.addRoom(socket, data) {

  // Create new chatrepo for room if does not exist
  if (data.room in this.chatrepos)
    return false;

  this.chatrepos[data.room] = new Chat

}
Room = {
  createRoom: function(socket, data){

    //TODO sanity check
  	// subscribe the client to the room
    // Manager level
  	socket.join(data.room);
  },

  joinRoom: function(socket, data){

    //TODO sanity check
    // joins a room if it doesn't exist
    //Manager Level
    socket.join(data.room);
  }
};

/**
 * Simple boolean returns true if room is in chat
 */
ChatRepo.prototype.hasRoom = function (room_id) {
  return (room_id in this.questionLog);
}

/**
 * Deletes a chat log
 */
ChatRepo.prototype.purgeRoom = function(room_id) {
    delete this.questionLog[room_id];
}

exports.Room = Room;
