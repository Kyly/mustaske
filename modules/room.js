var Questions = require('./questions');

function Room (data) {
  this.id             = data.id;
  this.name           = data.name;
  this.questions      = new Questions();
  this.owner          = data.owner;
};

/** Checks to see if the question already exists. Adds the question to the
  * Room's Questions object if it doesn't.
  *
  *   question = Question object
  */
Room.prototype.addQuestion = function(question) {
  if(!this.questions.hasQuestion(question)) {
    this.questions.logQuestion(question);
  }
}

Room.prototype.hasQuestion = function(question) {
  return this.questions.hasQuestion(question);
}
/**TODO
  *   data = {room_id: id, question_id: id, voter_id: id}
  */
Room.prototype.upvoteQuestion = function(data) {
  this.questions.upvoteQuestion(data)
}

/**TODO
  *   data = {room_id: id, question_id: id, voter_id: id}
  */
Room.prototype.downvoteQuestion = function(data) {
  this.questions.downvoteQuestion(data)
}

/**TODO
  *   n = int, number of top voted questions to return
  */
Room.prototype.getTopVoted = function(n) {
  return this.questions.getTopVoted(n);
}

module.exports = Room;
