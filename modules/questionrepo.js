var logMax = 5; // Small for testing
var Heap = require('heap');

function QuestionRepo(){
  this.questionLog = {};

  // this.minHeap = new Heap(function(a, b) {
  //   return b.score - a.score;
  // });

  this.maxHeap = new Heap(function(a, b) {
    return b.score - a.score;
  });
}

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

/**
 * Upvotes a question in the repository
 */
QuestionRepo.prototype.upvoteQuestion = function(data) {

  // Find index of question to be upvoted
  var questionIndex = maxHeap.nodes.indexOf(data.id);

  // If question does not exist in max heap add it
  if (questionIndex === -1) {
    var question = questionLog[data.id];
    question.upvote(data.voter);
    maxHeap.push(question);
  }

  else {
      // Upvote question in place
      var result = maxHeap.nodes[questionIndex].upvote(data.voter);
      // If question was upvoted then reorder heap
      if (result)
        maxHeap.heapify();
  }
}

QuestionRepo.prototype.downvoteQuestion = function(data) {

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
