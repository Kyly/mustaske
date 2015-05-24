/**
 * File: polltest.js
 * Tests all functions in poll.js
 *
 * Author: Daniel Lee & Nick Gibson
 *
 */

var Poll   = require('../modules/poll');
var assert = require('chai').assert;
var expect = require('chai').expect;

var assert = require("assert")
describe('Poll', function(){

  describe('#vote()', function(){
    it('should record user and their vote, updating appropriate fields.', function(){
      // Set
      var poll = new Poll();
      var voteResults;

      // Assert
      assert(poll.totalVotes === 0);
      voteResults = poll.vote({voter_id: 'Voter', option: 'A'});

      //check return values are correct
      assert(poll.totalVotes === 1);
      assert(voteResults.num_votes === 1);
      assert(voteResults.poll_id === 'CSE110');
      assert(voteResults.prev_vote === 0);
      assert(voteResults.cur_vote === 'A');
      //check voters and results correctly updated
      assert(poll.voters['Voter'] === 'A');
      assert(poll.results['A'] === 1);

      //check return values are correct
      assert(poll.totalVotes === 1);
      assert(voteResults.num_votes === 1);
      voteResults = poll.vote({voter_id: 'Voter', option: 'B'});
      assert(voteResults.poll_id === 'CSE110');
      assert(voteResults.prev_vote === 'A');
      assert(voteResults.cur_vote === 'B');
      //check voters and results correclty updated
      assert(poll.voters['Voter'] === 'B');
      assert(poll.results['A'] === 0);
      assert(poll.results['B'] === 1);

      voteResults = poll.vote({voter_id: 'foo', option: 'C'})
      assert(poll.totalVotes === 2);
      assert(voteResults.num_votes === 2);
    })
  })
})
