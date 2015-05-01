var logMax = 5; // Small for testing

function QuestionRepo(){
  this.questionLog = {};
}

// /**
//  * Add room to chat log if room is not already in chat.
//  * If room already exits then returns false.
//  */
// QuestionRepo.prototype.addRoom = function(room_id) {
//   // Check if room already exists
//   if (this.hasRoom(room_id))
//     return false;
//   else {
//     this.questionLog[room_id] = ['Welcome! New room created with room id: ' + room_id];
//     return true;
//   }
// }

/**
 * Adds message to end of list. If log if full then the least
 * voted list is removed.
 *
 * If room does not exist then exception is thrown.
 */
QuestionRepo.prototype.logQuestion = function(room_id, data) {
    if (this.hasRoom(room_id)) {
      var roomlog = this.questionLog[room_id];

      // Remove least voted msg
      if (roomlog.length > logMax)
        roomlog.shift();

      roomlog.unshift(data);
    }
    else
      throw "Room does not exists!";
}

QuestionRepo.prototype.upvoteMessage = function(data) {

}

QuestionRepo.prototype.downvoteMessage = function(data) {

}



/**
 * This alows us to move a chat up or down in a list
 * Example code: [1, 2, 3].move(0, 1) gives [2, 1, 3].
 */
Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
}

module.exports = QuestionRepo;
