/**
 * TODO file header
 */

var Heap = require('heap');

function Questions(){
  this.questionHash = {};
  this.orderedQuestions = [];

}

/**
 * Adds message to end of list. If log if full then the least
 * voted list is removed.
 *
 * If room does not exist then exception is thrown.
 * question is a Question Object
 */
Questions.prototype.logQuestion = function(question) {
  this.orderedQuestions.unshift(question);
  this.questionHash[question.id] = question;
}

/**
 * Upvotes a question in the repository
 *
 * data = {question_id: id, voter_id: id}
 */
Questions.prototype.upvoteQuestion = function(data) {

  // If question does not exist in max heap add it
  if (!this.hasQuestion(data.question_id)) {
    var question = questionHash[data.question_id];
    question.upvote(data.voter_id);
  }

  else {
      var question = questionHash[data.question_id];
      var upvoted = question.upvote(data.voter_id);
  }
}

/**
 * data = {question_id: id, voter: id}
 */
Questions.prototype.downvoteQuestion = function(data) {
  // If question does not nothing is done
  if (this.hasQuestion(data.question_id)) {
    var question = questionHash[data.question_id];
    var upvoted = question.upvote(data.voter_id);
  }
}

/**
 * TODO
 */
Questions.prototype.hasQuestion = function(question) {
  return question.id in this.questionHash;
}

Questions.prototype.getTopVoted = function(n) {
  return Heap.nlargest(this.orderedQuestions, n, function(a, b) {
    return a.score - b.score;
  });
}

Questions.prototype.getQuestions = function(n) {
  return this.orderedQuestions.slice(0,n);
}

module.exports = Questions;
