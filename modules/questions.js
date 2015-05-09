/**
 * Questions model and member funtions.
 */

var Heap     = require('heap');
var uuid     = require('node-uuid');
var Question = require('./question');

function Questions() {
  this.questionHash = {};      // All questions
  this.upVotedQuestions = [];  // Reference to questions that have been upvoted
  this.orderedQuestions = [];  // Most recent --> Oldest questions
}

/**
 * Adds question to orderd and hashed question list.
 *
 * @param data = {room_id: id, question_text: String, asker_id: String}
 * @return newly created fucntion
 */
Questions.prototype.addQuestion = function(data) {
  var newData = {id: uuid.v1(), asker_id: data.asker_id, 
                 question_text: data.question_text};

  var question = new Question(newData);

  this.orderedQuestions.unshift(question);
  this.questionHash[question.id] = question;

  return question;
}

/**
 * Upvotes a question in the repository. If question does not
 * exist then nothing is done.
 *
 * @param data = {question_id: id, voter_id: id}
 * @return none
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
 * @param data = {question_id: id, voter_id: id}
 * @return none
 */
Questions.prototype.downVoteQuestion = function(data) {
  if (this.hasQuestion(data.question_id)) {
    var question = this.questionHash[data.question_id];
    var voteResult = question.downVote(data.voter_id);
    // Checks if voted down to zero
    if (voteResult <= 0 && this.upVotedQuestions.indexOf(quesiton) !== -1) {
      var index = this.upVotedQuestions.indexOf(quesiton);

      // Remove question from upvoted
      this.upVotedQuestions.splice(index, 1);
    }
  }
}

/**
 * Checks if function exists in question hash table.
 *
 * @param Question id
 * @return True if question exists
 */
Questions.prototype.hasQuestion = function(id) {
  return (id in this.questionHash);
}

/**
 * Returns a range of top voted question. Will return
 * all questions by defualt.
 *
 * @param Number of quesitons.
 * @return Array of questions.
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
 * @param Number of quesitons.
 * @return Array of questions.
 */
Questions.prototype.getQuestions = function(n) {
  // Default check
  if (typeof n === 'undefined') {
    return this.orderedQuestions;
  }

  return this.orderedQuestions.slice(0,n);
}

/**
 * Delete the question from the question heap, 
 * upVotedQuestion array, and ordered question array.
 * 
 * @param Id of the question
 * @return empty object if question does not exist
 */
Questions.prototype.deleteQuestion = function(questionID) {
	//Return empty object if question does not exist
	if (typeof this.questionHash[questionID] === undefined || typeof this.upVotedQuestions[questionID] === undefined || typeof this.orderedQuestions[questionID] === undefined)
		return {};
		
	//Remove question from question heap, upvotedQuestion array, and ordered question array
	delete this.questionHash[questionID];
	this.upVotedQuestions.splice(questionID, 1);
	this.orderedQuestions.splice(questionID, 1);
}

module.exports = Questions;