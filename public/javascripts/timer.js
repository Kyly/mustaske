
/**
 * Contains definition of the timer class
 * 
 * Author: Nick Gibson
 * @param none
 */
sec = 0.0;
min = 0.0;
function Timer() {};

Timer.prototype.start = function () {
  sec = 0.0;
  min = 0.0;

  this.timing = setInterval(this.update, 1000);
}

Timer.prototype.update = function() {
  sec++;

  if (sec == 60.0) {
    sec = 0.0;
    min++;
  }

  var padSec = sec.toString();
  var padMin = min.toString();
  if (sec < 10)
    padSec = '0' + padSec;
  if (min < 10)
    padMin = '0' + padMin;

  console.log(padMin + ':' + padSec);
}

Timer.prototype.stop = function() {
  clearInterval(this.timing);
}