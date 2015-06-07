/**
 * Poll Model
 * Holds all data about a single poll. Created in room.js. Includes
 * functionality to handle the votine on polls.
 *
 * @param none
 */

function Poll() {
  this.results    = {};
  this.voters     = {};
}

/**
 * Update the results according to the user's vote
 *
 * @param {voter_id: String, option: String}
 * @return Hash
 */
Poll.prototype.vote = function(data) {
  var prevVote = 0;

  //Check whether the person has voted before; if so, decrement the original vote
  if(data.voter_id in this.voters){
  	prevVote = this.voters[data.voter_id];

    if (prevVote === data.option)
      return false;

  	this.results[prevVote] -= 1;
  }

  //Update the voter's current vote
  this.voters[data.voter_id] = data.option;

  //Update the results
  if(!(data.option in this.results)){
  	this.results[data.option] = 1;
  }
  else {
  	this.results[data.option] += 1;
  }

  return this.results;
}

module.exports = Poll;
