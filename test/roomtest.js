/**
 * TODO file header
 */

var Room = require('../modules/room');
var Question = require('../modules/question')
var assert = require('chai').assert;
var expect = require('chai').expect;

var assert = require("assert")
describe('Room', function(){

  describe('#warnUser()', function(){
    it('User should be added to warnedUsers hash after first warning,' +
      'and to bannedUsers hash after second warning.', function(){
      // Set
      var room = new Room({room_id: '110', owner_id: 'gary',
      room_name: 'lecture'});
      var studentID = 'kyly';
      var qID = room.addQuestion({asker_id: studentID, question_text:
      'what is a for loop?'}).question_id;
      var warnParam = {owner_id: 'gary', question_id: qID};
      // Assert

      //no warnings
      assert(!(studentID in room.warnedUsers));
      assert(!(studentID in room.bannedUsers));

      room.warnUser(warnParam);

      //1 warning
      assert(studentID in room.warnedUsers);
      assert(!(studentID in room.bannedUsers));

      room.warnUser(warnParam);

      //2 warnings
      assert(studentID in room.bannedUsers);
    })
  })
  describe('#banUser()', function(){
    it('User should be added to bannedUsers hash.', function(){
      // Set
      var room = new Room({room_id: '110', owner_id: 'gary', room_name: 'lecture'});
      var studentID = 'kyly';

      // Assert
      assert(!(studentID in room.bannedUsers));
      room.banUser(studentID);
      assert(studentID in room.bannedUsers);
    })
  })

  describe('#isBanned()', function(){
    it('Make sure returns correct values from isBanned hash.', function(){
      // Set
      var room = new Room({room_id: '110', owner_id: 'gary', room_name: 'lecture'});
      var studentID = 'kyly';

      // Assert
      assert(!room.isBanned(studentID));
      room.banUser(studentID);
      assert(room.isBanned(studentID));
    })
  })

  describe('#addQuestion()', function(){
    it('should have have a Question in questions after addQuestion is called.', function(){
      // Set
      var roomID = '110';
      var ownerID = 'gary';
      var roomName = 'center hall';

      var room = new Room({room_id: roomID, owner_id: ownerID,
        room_name: roomName});

      // Assign
      var newQuestion = {room_id: 'theDopePlace',
      question_text: 'What is a moustache?', asker_id: 'awesomeStudent'};

      var idToSearch = room.addQuestion(newQuestion).question_id;

      // Assert
      assert(room.hasQuestion(idToSearch));
      assert(!room.hasQuestion('what'));
    })
  })
})
