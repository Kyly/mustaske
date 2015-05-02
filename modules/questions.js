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
 * data = {quesiton: Question}
 */
Questions.prototype.logQuestion = function(question) {
  this.orderedQuestions.unshift(question);
  this.questionHash[data.question.id] = question;
}

/**
 * Upvotes a question in the repository
 *
 * data = {question: Question, voter: id}
 */
Questions.prototype.upvoteQuestion = function(data) {

  // If question does not exist in max heap add it
  if (!this.hasQuestion(data.quesiton)) {
    var question = questionHash[data.question.id];
    question.upvote(data.voter);
  }

  else {
      var question = questionHash[data.question.id];
      var upvoted = question.upvote(data.voter);
  }
}

/**
 * data = {question: Question, voter: id}
 */
Questions.prototype.downvoteQuestion = function(data) {
  // If question does not nothing is done
  if (this.hasQuestion(data.quesiton)) {
    var question = questionHash[data.question.id];
    var upvoted = question.upvote(data.voter);
  }
}

/*
 *
 */
Questions.prototype.hasQuestion = function(question) {
  return question.id in this.Questions;
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
