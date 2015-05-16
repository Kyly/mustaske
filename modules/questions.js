/**
 * Questions model and member funtions.
 */

var Heap     = require('heap');
var Question = require('./question');
var uuid     = require('node-uuid');
var marked   = require('marked');

function Questions() {
  this.questionHash     = {};  // All questions
  this.upVotedQuestions = [];  // Reference to questions that have been upvoted
  this.orderedQuestions = [];  // Most recent --> Oldest questions

  // Set up for markdown filter
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });
}

/**
 * Adds question to ordered and hashed question list.
 *
 * @param data = {room_id: id, question_text: String, asker_id: String}
 * @return {question_id: String, question_text: String}
 */
Questions.prototype.addQuestion = function (data) {
  var question = new Question({
      question_id: uuid.v1(),
      asker_id: data.asker_id,
      question_text: marked(data.question_text)
    }
  )

  this.orderedQuestions.unshift(question);
  this.questionHash[question.question_id] = question;

  return {question_id: question.question_id, question_text: question.question_text};
}

/**
 * Upvotes a question in the repository. If question does not
 * exist then nothing is done.
 *
 * @param data = {question_id: id, voter_id: id}
 * @return none
 */
Questions.prototype.upVoteQuestion = function (data) {
  var retval = false;

  if (this.hasQuestion(data.question_id)) {
    var question = this.questionHash[data.question_id];
    var prevScore = question.score;
    retval = question.upVote(data);
    this.placeOrRemoveUpvoted(question,prevScore);
  }
  
  return retval;
}

/**
 * Downvotes a question in the repository. If question does not
 * exist then nothing is done.
 *
 * @param data = {question_id: id, voter_id: id}
 * @return none
 */
Questions.prototype.downVoteQuestion = function (data) {
  var retval = false;

  if (this.hasQuestion(data.question_id)) {
    var question = this.questionHash[data.question_id];
    var prevScore = question.score;
    retval = question.downVote(data);
    this.placeOrRemoveUpvoted(question,prevScore);
  }
  
  return retval;
}

/**
 * Checks if function exists in question hash table.
 *
 * @param Question id
 * @return boolean if question exists
 */
Questions.prototype.hasQuestion = function(id) {
  return (id in this.questionHash);
}

/**
 * Returns a range of top voted question. Will return
 * all questions by default.
 *
 * @param Number of questions.
 * @return Array of questions.
 */
Questions.prototype.getTopVoted = function (n) {

  // Default check
  n = typeof n !== 'undefined' ? n : this.upVotedQuestions.length;

  return Heap.nlargest(this.upVotedQuestions, n, function (a, b) {
    return a.score - b.score;
  });
}

/**
 * Returns 0 to n most recent questions. Returns all by default.
 *
 * @param Number of questions.
 * @return Array of questions.
 */
Questions.prototype.getQuestions = function (n) {
  // Default check
  if (typeof n === 'undefined') {
    return this.orderedQuestions;
  }

  return this.orderedQuestions.slice(0, n);
}

/**
 * Delete the question from the question heap,
 * upVotedQuestion array, and ordered question array.
 *
 * @param Id of the question
 * @return empty object if question does not exist
 */
Questions.prototype.deleteQuestion = function (questionID) {

  //Get reference to question from the questionHash
  var question = this.questionHash[questionID];

  //Return empty object if question does not exist
  if (!question)
    return false;

  //Find index of question in upVotedQuestion array
  var upVoted = this.upVotedQuestions.indexOf(question)

  //Check if question is in updated question
  if (upVoted !== -1)
    //Remove question from upVotedQuestions array
    this.upVotedQuestions.splice(upVoted, 1);

  //Find index of question in orderedQuestion array
  var orderedQuestion = this.orderedQuestions.indexOf(question)

  //Check if question exists in orderedQuestion array
  if (orderedQuestion !== -1)
    //Remove question from
    this.orderedQuestions.splice(orderedQuestion, 1);
  //Throw error if question is not in orderedQuestion array
  else
    throw "Error!!! Question not in ordered question";

  //Remove question from questionHeap
  delete this.questionHash[questionID];

  return {question_id: questionID};
}

/**
 * Looks up the user associated with the questionable question and returns it.
 *
 * @param questionID: String
 * @return asker_id: String
 */
Questions.prototype.warnUser = function(questionID) {
  return this.questionHash[questionID].asker;
}

/**
 * Adds or removes a question to/from upvotedQuestions if necessary.
 *
 * @param question: question object, prevScore: int
 * @return none
 */
Questions.prototype.placeOrRemoveUpvoted = function(question,prevScore) {
  //add to upvotedQuestions if question became eligible
  if(prevScore < 2 && question.score >= 2) {
    this.upVotedQuestions.push(question);
  } 

  //remove from upvotedQuestions if question no longer eligible
  if(prevScore >= 2 && question.score < 2) {
    var index = this.upVotedQuestions.indexOf(question);
    this.upvotedQuestions.splice(index, 1);
  }
}

module.exports = Questions;