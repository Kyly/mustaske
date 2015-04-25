// Room model
// TODO Needs tests
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
exports.Room = Room;
