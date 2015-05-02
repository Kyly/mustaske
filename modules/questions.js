var Heap = require('heap');

function Questions(){
  this.questions = {};
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
QuestionRepo.prototype.logQuestion = function(question) {
  this.orderedQuestions.unshift(question);
  this.questionRepo[data.question.id] = question;
}

/**
 * Upvotes a question in the repository
 *
 * data = {question: Question, voter: id}
 */
QuestionRepo.prototype.upvoteQuestion = function(data) {

  // If question does not exist in max heap add it
  if (!this.hasQuestion(data.quesiton)) {
    var question = questionRepo[data.question.id];
    question.upvote(data.voter);
  }

  else {
      var question = questionRepo[data.question.id];
      var upvoted = question.upvote(data.voter);
  }
}

/**
 * data = {question: Question, voter: id}
 */
QuestionRepo.prototype.downvoteQuestion = function(data) {
  // If question does not nothing is done
  if (this.hasQuestion(data.quesiton)) {
    var question = questionRepo[data.question.id];
    var upvoted = question.upvote(data.voter);
  }
}

/*
 *
 */
QuestionRepo.prototype.hasQuestion = function(question) {
  return question.id in this.questionRepo;
}

QuestionRepo.prototype.getTopVoted = function(n) {
  return Heap.nlargest(this.orderedQuestions, n, function(a, b) {
    return b.score - a.score;
  });
}

QuestionRepo.prototype.getQuestions = function(n) {
  return this.orderedQuestions.slice(0,n+1);
}

module.exports = QuestionRepo;
