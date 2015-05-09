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
  this.score              = 1;
  this.time               = new Date().getTime();
}


Question.prototype.upVote = function(data) {
  var voterId = data.voter_id;

  if (voterId in this.voters) {
    if (this.voters[voterId] === -1) {
      this.voters[voterId] = 1;
      this.score += 2;
      return this.score;
    } else {
      this.score -= 1;
      delete this.voters[voterId];
      return this.score;
    }
  }

  this.voters[voterId] = 1;
  this.score += 1;

  return this.score;
}


Question.prototype.downVote = function(data) {
  var voterId = data.voter_id;

  if (voterId in this.voters) {
    if (this.voters[voterId] === 1) {
      this.voters[voterId] = -1;
      this.score -= 2;
      return this.score;
    } else {
      this.score += 1;
      delete this.voters[voterId];
      return this.score;
    }
  }

  this.voters[voterId] = -1;
  this.score -= 1;

  return this.score;
}


module.exports = Question;