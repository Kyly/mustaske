/**
 * Questions model and member funtions.
 */

var Heap = require('heap');

function Questions(){
  this.questionHash = {};      // All quesitons
  this.upVotedQuestions = [];  // Refrence to question that have been upvoted
  this.orderedQuestions = [];  // Most recent --> Oldest questions

}

/**
 * Adds question to orderd and hashed question list.
 *
 * Input: Question
 * Return: none
 */
Questions.prototype.addQuestion = function(question) {
  this.orderedQuestions.unshift(question);
  this.questionHash[question.id] = question;

}

/**
 * Upvotes a question in the repository. If question does not
 * exist then nothing is done.
 *
 * Input: data = {question_id: id, voter_id: id}
 * Return: none
 */
Questions.prototype.upVoteQuestion = function(data) {
  if (this.hasQuestion(data.question_id)) {
    var question = this.questionHash[data.question_id];

    if (this.upVotedQuestions.indexOf(question) === -1) {
        this.upVotedQuestions.push(question);
    }

    question.upVote(data.voter_id);
  }
}

/**
 * Downvotes a question in the repository. If question does not
 * exist then nothing is done.
 *
 * Input: data = {question_id: id, voter_id: id}
 * Return: none
 */
Questions.prototype.downVoteQuestion = function(data) {
  if (this.hasQuestion(data.question_id)) {
    var question = this.questionHash[data.question_id];
    var voteResult = question.downVote(data.voter_id);
    // Checks if voted down to zero
    if (voteResult <= 0 && this.upVotedQuestions.indexOf(quesiton) !== -1) {
      var index = this.upVotedQuestions.indexOf(quesiton);

      // Remove quesiton from upvoted
      this.upVotedQuestions.splice(index, 1);
    }
  }
}

/**
 * Checks if function exists in question hash table.
 *
 * Input: Question id
 * Return: True if question exists
 */
Questions.prototype.hasQuestion = function(id) {
  return id in this.questionHash;
}

/**
 * Returns a range of top voted question. Will return
 * all questions by defualt.
 *
 * Input: Number of quesitons.
 * Return: Array of questions.
 */
Questions.prototype.getTopVoted = function(n) {
  // Default check
  n = typeof n !== 'undefined' ?  n : n = this.upVotedQuestions.length;

  return Heap.nlargest(this.upVotedQuestions, n, function(a, b) {
    return a.score - b.score;
  });
}

/**
 * Returns 0 to n most recent questions. Returns all by default.
 *
 * Input: Number of quesitons.
 * Return: Array of questions.
 */
Questions.prototype.getQuestions = function(n) {
  // Default check
  if (typeof n === 'undefined') {
    return this.orderedQuestions;
  }

  return this.orderedQuestions.slice(0,n);
}

module.exports = Questions;
