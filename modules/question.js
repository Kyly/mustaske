/**
 * TODO file header
 */

function Question (data) {
  this.id             = data.id;
  this.asker          = data.asker;
  this.questionTitle  = data.questionTitle;
  this.question       = data.question;
  this.comments       = [];
  this.voters         = [this.asker];
  this.score          = data.score;
  this.time           = new Date().getTime();
};

Question.prototype.upVote = function(data) {
  if (data.voter_id in this.voters)
    return false;

  ++this.score;
  return true;
}

/**
 * Return: Current score.
 */
Question.prototype.downVote = function(data) {
  return 'Not implimented';
}


module.exports = Question;
