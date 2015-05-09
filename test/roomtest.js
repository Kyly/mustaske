/**
 * TODO file header
 */

var Room = require('../modules/room');
var Question = require('../modules/question')
var assert = require('chai').assert;
var expect = require('chai').expect;

var room = new Room(
  {
    id          : 'testRoom',
    name        : 'CSE 110',
    owner       : 'boogeyman'
  }
);

var assert = require("assert")
describe('Room', function(){
  describe('#addQuestion()', function(){
    it('should have have a Question in questions after addQuestion is called.', function(){
      // Set


      // Assign
      var newQuestion = {room_id: 'theDopePlace', question_text: 'What is a moustache?', asker_id: 'awesomeStudent'};
      var badQuestion = {room_id: 'notSoDope', question_text: 'What is a for-loop?', asker_id: 'badStudent'};

      var idToSearch = room.addQuestion(newQuestion).id;

      // Assert
      assert(room.hasQuestion(idToSearch));
      assert(!room.hasQuestion('what'));
    })
  })
})
