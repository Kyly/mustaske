/**
 * TODO file header...
 */

var Chat = function(socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function(room, text) {
  var message = {
    room: room,
    text: text
  };
  this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function(newRoom) {
  this.socket.emit('join room', newRoom);
};

Chat.prototype.createRoom = function(newRoom) {
  this.socket.emit('create room', newRoom);
};

Chat.prototype.processCommand = function(currentRoom, command) {
  var words = command.split(' ')
    , command = words[0].substring(1, words[0].length).toLowerCase()
    , message = false;

  switch(command) {
    case 'join':
      words.shift();
      var newRoom = words.join(' ');
      this.changeRoom(newRoom);
      break;

    case 'create':
      words.shift();
      var newRoom = words.join(' ');
      this.createRoom(newRoom);
      break;

    case 'nick':
      words.shift();
      var name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      break;

    case 'q':
      words.shift();
      var question = words.join(' ');
      this.socket.emit('new question', question);
      break;

    default:
      message = 'Unrecognized command.';
      break;
  }

  return message;
};
