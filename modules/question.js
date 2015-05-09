/**
 * TODO file header
 */

function Question (data) {
  this.id                 = data.id;
  this.asker              = data.asker;
  this.question           = data.question;
  this.comments           = [];
  this.voters             = {};
  this.voters[this.asker] = 1;
  this.score              = data.score;
  this.time               = new Date().getTime();
}


/*
 Should increase score of question by one if voter hasn't voted,
 by two if voter has previously downvoted, or decrease by one if
 voter has previously upvoted.
*/
Question.prototype.upVote = function(data) {
  var voterId = data.voter_id;

  //voted has already voted
  if (this.voters[voterId] !== undefined) {

    //voter has downvoted
    if (this.voters[voterId] < 0) {
      this.voters[voterId] = 1;
      this.score += 2;
      return this.score;

      //voter has upvoted
    } else {
      this.score -= 1;
      delete this.voters[voterId];
      return this.score;
    }
  }

  //voter hasn't yet voted
  this.voters[voterId] = 1;
  this.score += 1;

  return this.score;
}


/*
 Should decrease score of question by one if voter hasn't voted,
 by two if voter has previously upvoted, or increase by one if
 voter has previously downvoted.
*/
Question.prototype.downVote = function(data) {
  var voterId = data.voter_id;

  //voter has already voted
  if (this.voters[voterId] !== undefined) {

    //voter has upvoted
    if (this.voters[voterId] > 0) {
      this.voters[voterId] = -1;
      this.score -= 2;
      return this.score;

      //voter has downvoted
    } else {
      this.score += 1;
      delete this.voters[voterId];
      return this.score;
    }
  }

  //voter hasn't yet voted
  this.voters[voterId] = -1;
  this.score -= 1;

  return this.score;
}


module.exports = Question;