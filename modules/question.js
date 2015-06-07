/**
 * Question Object
 * Holds all data about a single question. Also contains functions that
 * manipulate that data in the form of upvoting and downvoting a question.
 *
 * @param {question_id: String, question_text: String, asker_id: String}
 */

function Question(data) {
  this.question_id = data.question_id;
  this.asker = data.asker_id;
  this.question_text = data.question_text;
  this.comments = [];
  this.voters = {};
  this.score = 0;
  this.time = new Date().getTime();
}

/**
 * Should increase score of question by one if voter hasn't voted,
 * by two if voter has previously downvoted, or decrease by one if
 * voter has previously upvoted.
 *
 * @param {question_id: String, voter_id: String}
 * @return {question_score: String, question_id: String}
*/
Question.prototype.upvote = function(data) {
  var voterID = data.voter_id;
  if (this.voters[voterID] !== undefined) {	//voter has already voted
    if (this.voters[voterID] < 0) { 		    //voter has downvoted
      this.voters[voterID] = 1;
      this.score += 2;
    } else {                        		//voter has upvoted
      --(this.score);
      delete this.voters[voterID];
    }
  } else {                          		//voter hasn't yet voted
    this.voters[voterID] = 1;
    ++(this.score);
  }

  return {question_score: this.score, question_id: this.question_id};
}


/**
 * Should decrease score of question by one if voter hasn't voted,
 * by two if voter has previously upvoted, or increase by one if
 * voter has previously downvoted.
 *
 * @param {voter_id: String, question_id: String}
*/
Question.prototype.downvote = function(data) {
  var voterID = data.voter_id;

  if (this.voters[voterID] !== undefined) {	//voter has already voted
    if (this.voters[voterID] > 0) { 		//voter has upvoted
      this.voters[voterID] = -1;
      this.score -= 2;
    } else {                        		//voter has downvoted
      ++(this.score);
      delete this.voters[voterID];
    }
  } else {                          		//voter hasn't yet voted
    this.voters[voterID] = -1;
    --(this.score);
  }

  return {question_score: this.score, question_id: this.question_id};
}

module.exports = Question;
