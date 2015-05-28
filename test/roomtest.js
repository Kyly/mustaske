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
      var room = new Room({room_id: '110', user_id: 'gary',
      room_name: 'lecture'});
      var studentID = 'kyly';
      var qID = room.addQuestion({asker_id: studentID, question_text:
      'what is a for loop?'}).question_id;
      var warnParam = {user_id: 'gary', question_id: qID};
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
      var room = new Room({room_id: '110', user_id: 'gary', room_name: 'lecture'});
      var newQuestion = {
        room_id:       'foo',
        question_text: 'bar',
        asker_id:      'fubar'
      };
      var questionID = room.addQuestion(newQuestion).question_id;
      // Assert
      assert(!('fubar' in room.bannedUsers));
      room.banUser({user_id: 'gary', question_id: questionID});
      assert('fubar' in room.bannedUsers);
    })
  })

  describe('#isBanned()', function(){
    it('Make sure returns correct values from isBanned hash.', function(){
      // Set
      var room = new Room({room_id: '110', user_id: 'gary', room_name: 'lecture'});
      var newQuestion = {
        room_id:       'foo',
        question_text: 'bar',
        asker_id:      'fubar'
      };

      var questionID = room.addQuestion(newQuestion).question_id;
      // Assert
      assert(!room.isBanned('fubar'));
      room.banUser({user_id: 'gary', question_id: questionID});
      assert(room.isBanned('fubar'));
    })
  })

  describe('#addQuestion()', function(){
    it('should have a Question in questions after addQuestion is called.', function(){
      // Set
      var roomID = '110';
      var ownerID = 'gary';
      var roomName = 'center hall';

      var room = new Room({room_id: roomID, user_id: ownerID,
        room_name: roomName});

      // Assign
      var newQuestion = {room_id: 'theDopePlace',
      question_text: 'What is a moustache?', asker_id: 'awesomeStudent'};

      var idToSearch = room.addQuestion(newQuestion).question_id;

      // Assert
      assert(room.questions.hasQuestion(idToSearch));
      assert(!room.questions.hasQuestion('what'));
    })
  })
  describe('#hasQuestion()', function(){
    it('should return true if question exists, else false.', function(){
      // Set
      var roomID = '110';
      var ownerID = 'gary';
      var roomName = 'center hall';

      var room = new Room({room_id: roomID, user_id: ownerID,
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

  describe('#upvoteQuestion()', function(){
    it('should return true if question exists, else false.', function(){
      // Set
      var roomID = '110';
      var ownerID = 'gary';
      var roomName = 'center hall';

      var room = new Room({room_id: roomID, user_id: ownerID,
        room_name: roomName});

      // Assign
      var newQuestion = {room_id: 'theDopePlace',
      question_text: 'What is a moustache?', asker_id: 'awesomeStudent'};

      var questionInfo = room.addQuestion(newQuestion);
      var upvoteInfo = room.upvoteQuestion({question_id: questionInfo.question_id, voter_id: 'bar'})

      // Assert
      assert(upvoteInfo.question_score === 1);
      assert(upvoteInfo.question_id === questionInfo.question_id);

      upvoteInfo = room.upvoteQuestion({question_id: questionInfo.question_id, voter_id: 'bar'})
      assert(upvoteInfo.question_score === 0);
    })
  })
  describe('#downvoteQuestion()', function(){
    it('should return true if question exists, else false.', function(){
      // Set
      var roomID = '110';
      var ownerID = 'gary';
      var roomName = 'center hall';

      var room = new Room({room_id: roomID, user_id: ownerID,
        room_name: roomName});

      // Assign
      var newQuestion = {room_id: 'theDopePlace',
      question_text: 'What is a moustache?', asker_id: 'awesomeStudent'};

      var questionInfo = room.addQuestion(newQuestion);
      var downvoteInfo = room.downvoteQuestion({question_id: questionInfo.question_id, voter_id: 'bar'})

      // Assert
      assert(downvoteInfo.question_score === -1);
      assert(downvoteInfo.question_id === questionInfo.question_id);

      upvoteInfo = room.downvoteQuestion({question_id: questionInfo.question_id, voter_id: 'bar'})
      assert(upvoteInfo.question_score === 0);
    })
  })

  describe('#getTopVoted()', function(){
    it('should return top questions.', function(){
      // Set
      var roomID = '110';
      var ownerID = 'gary';
      var roomName = 'center hall';

      var room = new Room({room_id: roomID, user_id: ownerID,
        room_name: roomName});

      // Assign
      var questionInfo = {question_text: 'What is a moustache?', asker_id: 'awesomeStudent'};
      var question = room.addQuestion(questionInfo);
      room.upvoteQuestion({question_id: question.question_id, voter_id: 'bar'})

      var topInfo = room.getTopVoted(1);

      // Assert
      assert(topInfo[0].question_id === question.question_id);
      assert(topInfo[0].question_score === 1);
    })
  })
  describe('#getTopVoted()', function(){
    it('should return all questions.', function(){
      // Set
      var roomID = '110';
      var ownerID = 'gary';
      var roomName = 'center hall';

      var room = new Room({room_id: roomID, user_id: ownerID,
        room_name: roomName});

      // Assign
      var questionInfo = {question_text: 'What is a moustache?', asker_id: 'awesomeStudent'};
      var question = room.addQuestion(questionInfo);
      room.upvoteQuestion({question_id: question.question_id, voter_id: 'bar'})

      var topInfo = room.getQuestions(1);

      // Assert
      assert(topInfo[0].question_id === question.question_id);
      assert(topInfo[0].question_score === 1);
    })
  })
  
  describe('#getTopVoted()', function(){
    it('should return all questions.', function(){
      // Set
      var roomID = '110';
      var ownerID = 'gary';
      var roomName = 'center hall';

      var room = new Room({room_id: roomID, user_id: ownerID,
        room_name: roomName});

      // Assign
      var questionInfo = {question_text: 'What is a moustache?', asker_id: 'awesomeStudent'};
      var question = room.addQuestion(questionInfo);
      room.upvoteQuestion({question_id: question.question_id, voter_id: 'bar'})

      var topInfo = room.getQuestions(1);

      // Assert
      assert(topInfo[0].question_id === question.question_id);
      assert(topInfo[0].question_score === 1);
    })
  })

  describe('#setActive()', function(){
    it('should return true if poll is active, else false.', function(){
      // Set
      var activeInfo;

      var room = new Room({room_id: '110', user_id: 'Gary',
        room_name: 'center hall'});

      // Assert
      assert(room.activePoll === false);

      activeInfo = room.setActive(false);
      assert(room.activePoll === false);
      assert(activeInfo.changed === false);
      assert(activeInfo.active === false);

      activeInfo = room.setActive(true);
      assert(room.activePoll === true);
      assert(activeInfo.changed === true);
      assert(activeInfo.active === true);

      activeInfo = room.setActive(true);
      assert(room.activePoll === true);
      assert(activeInfo.changed === false);
      assert(activeInfo.active === true);

      activeInfo = room.setActive(false);
      assert(room.activePoll === false);
      assert(activeInfo.changed === true);
      assert(activeInfo.active === false);
    })
  })
})
