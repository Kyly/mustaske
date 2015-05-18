/**
 * Polls Object
 * Reponsitory for holding poll objects.
 *
 * Author: Daniel Lee & Nick Gibson
 */

var Poll = require('./poll')
var uuid     = require('node-uuid');

function Polls() {
	this.polls = {};  // Hash containing poll objects
}

/**
 * Generates a uuid, creates a poll object, and stores
 * reference in polls hash.
 *
 * @param {num_options: int}
 * @return {poll_id: String}
 */
Polls.prototype.createPoll = function(data) {

  var uniqueID = uuid.v1();

  //Make sure uniqueID is unique
  while (uniqueID in this.polls)
    uniqueID = uuid.v1();

  //Create new room and add it to rooms
  this.polls[uniqueID] = new Poll({num_options: data.num_options, poll_id: uniqueID});

  return {poll_id: uniqueID};
}

/**
 * Sets a poll active (or not) according to the poll_id
 *
 * @param {poll_id: String, toggle: Boolean}
 * @return {poll_id: String}
 */
Polls.prototype.setActive = function (data) {
  // Check if poll exists
  if (!(data.poll_id in this.polls))
    return false;

  return this.polls[data.poll_id].setActive(data);
}

/**
 * Vote on a poll
 *
 * @param {poll_id: String, voter_id: String, option: String}
 * @return {poll_id: String, voter_id: String, prev_vote: String, cur_vote: String, num_votes: int}
 */
Polls.prototype.vote = function (data) {
  // Check if poll exists
  if (!(data.poll_id in this.polls))
    return false;

  return this.polls[data.poll_id].vote(data);
}

/**
 * Return the results hashtable
 *
 * @param none
 * @return {poll_id: String, results: HashTable}
 */
Polls.prototype.getResults = function (data) {
  // Check if poll exists
  if (!(data.poll_id in this.polls))
    return false;

  return this.polls[data.poll_id].getResults(data);
}

module.exports = Polls;