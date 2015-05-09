/**
 * TODO file header
 */

var Questions = require('./questions');

function Room (data) {
  this.id             = data.room_id;
  this.name           = data.room_name;
  this.questions      = new Questions();
  this.owner          = data.owner_id;
};

/** Checks to see if the question already exists. Adds the question to the
  * Room's Questions object if it doesn't.
  *
  * @param data = {room_id: id, question_text: String, asker_id: String}
  * @return newly created question
  */
Room.prototype.addQuestion = function(data) {
  return this.questions.addQuestion(data);
}

Room.prototype.hasQuestion = function(questionId) {
  return this.questions.hasQuestion(questionId);
}
/**TODO
  *   data = {room_id: id, question_id: id, voter_id: id}
  */
Room.prototype.upvoteQuestion = function(data) {
  this.questions.upvoteQuestion(data);
}

/**TODO
  *   data = {room_id: id, question_id: id, voter_id: id}
  */
Room.prototype.downvoteQuestion = function(data) {
  this.questions.downvoteQuestion(data);
}

/**TODO
  *   n = int, number of top voted questions to return
  */
Room.prototype.getTopVoted = function(n) {
  return this.questions.getTopVoted(n);
}

/**TODO
 * returns all questions
 */
 Room.prototype.getQuestions = function() {
   return this.questions.getQuestions();
 }

module.exports = Room;
