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
 *
 */
Questions.prototype.logQuestion = function(question) {
  this.orderedQuestions.unshift(question);
  this.questionHash[question.id] = question;
}

/**
 * Upvotes a question in the repository
 *
 * data = {question_id: id, voter: id}
 */
Questions.prototype.upvoteQuestion = function(data) {

  // If question does not exist in max heap add it
  if (!this.hasQuestion(data.quesiton)) {
    var question = questionHash[data.question_id];
    question.upvote(data.voter);
  }

  else {
      var question = questionHash[data.question_id];
      var upvoted = question.upvote(data.voter);
  }
}

/**
 * data = {question: id, voter: id}
 */
Questions.prototype.downvoteQuestion = function(data) {
  // If question does not nothing is done
  if (this.hasQuestion(data.quesiton)) {
    var question = questionHash[data.question_id];
    var upvoted = question.upvote(data.voter);
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
    return b.score - a.score;
  });
}

Questions.prototype.getQuestions = function(n) {
  return this.orderedQuestions.slice(0,n+1);
}

module.exports = Questions;
