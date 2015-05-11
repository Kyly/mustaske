/**
 * TODO file header
 */

function Question (data) {
  this.id                 = data.question_id;
  this.asker              = data.asker_id;
  this.question           = data.question_text;
  this.comments           = [];
  this.voters             = {};
  this.voters[this.asker] = 1;
  this.score              = 1;
  this.time               = new Date().getTime();
}


/*
 Should increase score of question by one if voter hasn't voted,
 by two if voter has previously downvoted, or decrease by one if
 voter has previously upvoted.
*/
Question.prototype.upVote = function(data) {
  var voterID = data.voter_id;

  //voter has already voted
  if (this.voters[voterID] !== undefined) {

    //voter has downvoted
    if (this.voters[voterID] < 0) {
      this.voters[voterID] = 1;
      this.score += 2;
      return {question_score: this.score, question_id: this.id};

      //voter has upvoted
    } else {
      --(this.score);
      delete this.voters[voterID];
      return {question_score: this.score, question_id: this.id};
    }
  }

  //voter hasn't yet voted
  this.voters[voterID] = 1;
  ++(this.score);

  return {question_score : this.score, question_id : this.id};
}


/*
 Should decrease score of question by one if voter hasn't voted,
 by two if voter has previously upvoted, or increase by one if
 voter has previously downvoted.
*/
Question.prototype.downVote = function(data) {
  var voterID = data.voter_id;

  //voter has already voted
  if (this.voters[voterID] !== undefined) {

    //voter has upvoted
    if (this.voters[voterID] > 0) {
      this.voters[voterID] = -1;
      this.score -= 2;
      return {question_score : this.score, question_id : this.id};

      //voter has downvoted
    } else {
      ++(this.score);
      delete this.voters[voterID];
      return {question_score : this.score, question_id : this.id};
    }
  }

  //voter hasn't yet voted
  this.voters[voterID] = -1;
  --(this.score);

  return {question_score : this.score, question_id : this.id};
}

module.exports = Question;