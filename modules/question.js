function Question (data) {
  this.asker = data.asker;
  this.qestionTitle = data.qestionTitle;
  this.question = data.question;
  this.comments = [];
  this.voters = [this.asker];
  this.score = 0;
  this.time = new Date().getTime();
};

module.exports = Question;
