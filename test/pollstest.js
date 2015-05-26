/**
 * File: pollstest.js
 * Tests all functions in polls.js
 *
 * Author: Daniel Lee & Nick Gibson
 *
 */

var Polls   = require('../modules/polls');
var assert = require('chai').assert;
var expect = require('chai').expect;

var assert = require("assert")
describe('Polls', function(){
/*
  describe('createPoll()', function(){
    it('should add a new poll object to polls.', function(){
      // Set
      var pollRepo = new Polls();
      var pollInfo;

      // Assign
      pollInfo = pollRepo.createPoll({num_options: 3});

      // Assert
      assert(pollInfo.poll_id in pollRepo.polls);
    })
  })
  describe('setActive()', function(){
    it('should call lower layer function.', function(){
      // Set
      var pollRepo = new Polls();
      var pollInfo;
      var toggleInfo;

      // Assign
      pollInfo = pollRepo.createPoll({num_options: 3});
      toggleInfo = pollRepo.setActive({poll_id: pollInfo.poll_id, toggle: true});

      // Assert
      assert(toggleInfo.poll_id === pollInfo.poll_id);
      toggleInfo = pollRepo.setActive({poll_id: pollInfo.poll_id, toggle: false});
      assert(toggleInfo.poll_id === pollInfo.poll_id);
    })
  })
  describe('vote()', function(){
    it('should call lower layer function.', function(){
      // Set
      var pollRepo = new Polls();
      var pollInfo = pollRepo.createPoll({num_options: 3});
      var voteInfo;

      // Assign
      voteInfo = pollRepo.vote({poll_id: pollInfo.poll_id, voter_id: 'Gary', option: 'A'});

      // Assert
      assert(voteInfo.poll_id === pollInfo.poll_id);
      assert(voteInfo.voter_id === 'Gary');
      assert(voteInfo.prev_vote === 0);
      assert(voteInfo.cur_vote === 'A');
      assert(voteInfo.num_votes === 1);

      voteInfo = pollRepo.vote({poll_id: pollInfo.poll_id, voter_id: 'Gary', option: 'B'});

      assert(voteInfo.prev_vote === 'A');
      assert(voteInfo.cur_vote === 'B');
      assert(voteInfo.num_votes === 1);
    })
  })

  describe('getResults()', function(){
    it('should call lower layer function.', function(){
      // Set
      var pollRepo = new Polls();
      var pollInfo = pollRepo.createPoll({num_options: 3});
      var voteInfo;

      // Assign
      voteInfo = pollRepo.vote({poll_id: pollInfo.poll_id, voter_id: 'Gary', option: 'A'});

      // Assert
      assert(voteInfo.poll_id === pollInfo.poll_id);
      assert(voteInfo.voter_id === 'Gary');
      assert(voteInfo.prev_vote === 0);
      assert(voteInfo.cur_vote === 'A');

      voteInfo = pollRepo.vote({poll_id: pollInfo.poll_id, voter_id: 'Gary', option: 'B'});

      assert(voteInfo.prev_vote === 'A');
      assert(voteInfo.cur_vote === 'B');
    })
  })
*/

})
