/**
 * Questions model
 * Holds a hash of all the Question objects within a room. Includes
 * functionality that allow the proper Question to be voted on as well as
 * sorting all the questions by score.
 *
 * @param none
 */

var Heap     = require('heap');
var Question = require('./question');
var uuid     = require('node-uuid');
var marked   = require('marked');

function Questions() {
  this.questionHash     = {};  // All questions
  this.upvotedQuestions = [];  // Reference to questions that have been upvoted
  this.orderedQuestions = [];  // Most recent --> Oldest questions

  // Set up for markdown filter
  marked.setOptions({
    renderer    : new marked.Renderer(),
    gfm         : true,
    tables      : true,
    breaks      : false,
    pedantic    : false,
    sanitize    : true,
    smartLists  : true,
    smartypants : false
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
      question_id   : uuid.v1(),
      asker_id      : data.asker_id,
      question_text : marked(data.question_text)
    }
  );

  this.orderedQuestions.unshift(question);
  this.questionHash[question.question_id] = question;

  return {
    question_id    : question.question_id,
    question_text  : question.question_text,
    question_score : question.score
  };
}

/**
 * upvotes a question in the repository. If question does not
 * exist then nothing is done.
 *
 * @param data = {question_id: id, voter_id: id}
 * @return none
 */
Questions.prototype.upvoteQuestion = function (data) {
  var retval = false;

  if (this.hasQuestion(data.question_id)) {
    var question = this.questionHash[data.question_id];
    var prevScore = question.score;
    retval = question.upvote(data);
    this.placeOrRemoveupvoted(question,prevScore);
  }

  return retval;
}

/**
 * downvotes a question in the repository. If question does not
 * exist then nothing is done.
 *
 * @param data = {question_id: id, voter_id: id}
 * @return none
 */
Questions.prototype.downvoteQuestion = function (data) {
  var retval = false;

  if (this.hasQuestion(data.question_id)) {
    var question = this.questionHash[data.question_id];
    //if(data.voter_id !== question.asker) {
      var prevScore = question.score;
      retval = question.downvote(data);
      this.placeOrRemoveupvoted(question,prevScore);
    //}
    //  retval = question.downvote(data);
    //  this.placeOrRemoveupvoted(question,prevScore);
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
  n = typeof n !== 'undefined' ? n : this.upvotedQuestions.length;

  return Heap.nlargest(this.upvotedQuestions, n, function (a, b) {
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
 * upvotedQuestion array, and ordered question array.
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

  //Find index of question in upvotedQuestion array
  var upvoted = this.upvotedQuestions.indexOf(question)

  //Check if question is in updated question
  if (upvoted !== -1)
    //Remove question from upvotedQuestions array
    this.upvotedQuestions.splice(upvoted, 1);

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
Questions.prototype.getAsker = function(questionID) {
  return this.questionHash[questionID].asker;
}

/**
 * Adds or removes a question to/from upvotedQuestions if necessary.
 *
 * @param question: question object, prevScore: int
 * @return none
 */
Questions.prototype.placeOrRemoveupvoted = function(question,prevScore) {
  //add to upvotedQuestions if question became eligible
  if(prevScore < 1 && question.score >= 1) {
    this.upvotedQuestions.push(question);
  }

  //remove from upvotedQuestions if question no longer eligible
  if(prevScore >= 1 && question.score < 1) {
    var index = this.upvotedQuestions.indexOf(question);
    if (index > -1) {
      this.upvotedQuestions.splice(index, 1);
    }
  }
}

module.exports = Questions;
