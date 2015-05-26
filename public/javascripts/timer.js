
/**
 * Contains definition of the timer class
 * 
 * Author: Nick Gibson
 * @param none
 */
function Timer(selector) {
  this.sec = 0.0;
  this.min = 0.0;
  this.target = selector;
  this.targetText = this.target.text();
};

Timer.prototype.start = function () {
  this.sec = 0.0;
  this.min = 0.0;

  var _this = this;
  this.timing = setInterval(function () {_this.update();}, 1000);
}

Timer.prototype.update = function() {
  this.sec++;

  if (this.sec == 60.0) {
    this.sec = 0.0;
    this.min++;
  }

  var padSec = this.sec.toString();
  var padMin = this.min.toString();
  if (this.sec < 10)
    padSec = '0' + padSec;
  if (this.min < 10)
    padMin = '0' + padMin;

  this.target.text(padMin + ':' + padSec);
  console.log(padMin + ':' + padSec);
}

Timer.prototype.stop = function() {
  clearInterval(this.timing);
  this.target.text(this.targetText);

}