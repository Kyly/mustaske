/**
 * Poll Object
 * Holds all data about a single poll.
 *
 * Author: Daniel Lee & Nick Gibson
 *
 * @param {num_options: int, poll_id: String}
 */

function Poll(data) {
  this.active = false;
  this.results = {};
  this.voters = {};
  this.totalVotes = 0;
  this.pollID = data.poll_id
  this.numOptions = data.num_options;
}

/**
 * Set active according to the passed in value
 *
 * @param Data = {toggle: Boolean}
 * @return {poll_id: String}
 */
Poll.prototype.setActive = function(data) {
  this.active = data.toggle;

  return {poll_id : this.pollID};
}

/**
 * Update the results according to the user's vote
 *
 * @param {voter_id: String, option: String}
 * @return {poll_id: String, voter_id: String, prev_vote: String, cur_vote: String}
 */
Poll.prototype.vote = function(data) {
  var prevVote = 0;

  //Check whether the person has voted before; if so, decrement the original vote
  if(data.voter_id in this.voters){
  	prevVote = this.voters[data.voter_id];
  	this.results[prevVote] -= 1;

    //Decrement the totalVotes first
    this.totalVotes -= 1;
  }

  //Increment totalVotes
  this.totalVotes += 1;

  //Update the voter's current vote
  this.voters[data.voter_id] = data.option;

  //Update the results
  if(!(data.option in this.results)){
  	this.results[data.option] = 1;
  }
  else {
  	this.results[data.option] += 1;
  }

  return {
    poll_id:   this.pollID,
    voter_id:  data.voter_id,
    prev_vote: prevVote,
    cur_vote:  data.option
  };
}

/**
 * Return the results hashtable
 *
 * @param none
 * @return {poll_id: String, results: HashTable}
 */
Poll.prototype.getResults = function() {
  return {poll_id: this.pollID, results: this.results};
}

module.exports = Poll;