function Question (text) {
  this.asker = null;
  //this.title = '';
  this.text = text;
  this.comments = [];
  this.score = 0;
  this.time = new Date().getTime();
};