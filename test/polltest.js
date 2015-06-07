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
      voteResults = poll.vote({voter_id: 'Voter', option: 'A'});

      //check returned array is correct
      assert(voteResults['A'] === 1);
      //check voters and results correctly updated
      assert(poll.voters['Voter'] === 'A');
      assert(poll.results['A'] === 1);

      //check return values are correct
      voteResults = poll.vote({voter_id: 'Voter', option: 'B'});
      assert(voteResults['A'] === 0);
      assert(voteResults['B'] === 1);
      assert(poll.voters['Voter'] === 'B');
      assert(poll.results['A'] === 0);
      assert(poll.results['B'] === 1);

      voteResults = poll.vote({voter_id: 'foo', option: 'C'})
      assert(voteResults['C'] === 1);
    })
  })
})
