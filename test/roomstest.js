/**
 * TODO file header
 */

var Rooms = require('../modules/rooms');

var assert = require("assert")
describe('Rooms', function(){
  describe('#createRoom()', function(){
    it('Should have room in rooms after createRoom is called.' +
      ' Should return correct user_id and room_name.', function(){
      // Set
      var rooms = new Rooms();
      ownerID = 'tester';
      roomName = 'gary';

      // Assign
      var roomInfo = rooms.createRoom({user_id: ownerID, room_name: roomName});

      // Assert
      assert(roomInfo.room_id in rooms.rooms);
      assert(roomInfo.user_id === ownerID);
      assert(roomInfo.room_name === roomName);
    })
  })
  describe('#joinRoom()', function(){
    it('Makes sure correct values are returned from joinRoom.', function(){
      // Set
      var rooms = new Rooms();
      ownerID = 'tester';
      roomName = 'gary';
      var roomInfo = rooms.createRoom({user_id: ownerID, room_name: roomName});

      // Assign
      var joinInfo = rooms.joinRoom(roomInfo.room_id);

      // Assert
      assert(joinInfo.room_name === roomName);
      assert(joinInfo.room_id === roomInfo.room_id);
    })
  })
  describe('#hasRoom()', function(){
    it('Makes sure room exists after it has been created.', function(){
      // Set
      var rooms = new Rooms();
      ownerID = 'tester';
      roomName = 'gary';

      // Assign
      var roomInfo = rooms.createRoom({user_id: ownerID, room_name: roomName});

      // Assert
      assert(rooms.hasRoom(roomInfo.room_id));
      assert(!rooms.hasRoom('gillespie'));
    })
  })
  describe('#closeRoom()', function(){
    it('Checks if room is succesfully deleted.', function(){
      // Set
      var rooms = new Rooms();
      ownerID = 'tester';
      roomName = 'gary';

      // Assign
      var roomInfo = rooms.createRoom({user_id: ownerID, room_name: roomName});

      // Assert
      assert(roomInfo.room_id in rooms.rooms);
      rooms.closeRoom({user_id: ownerID, room_id: roomInfo.room_id});
      assert(!(roomInfo.room_id in rooms.rooms));
    })
  })
  describe('#isOwner()', function(){
    it('Checks if isOwner returns accurate value.', function(){
      // Set
      var rooms = new Rooms();
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({user_id: ownerID, room_name: roomName});

      // Assign
      is_owner = rooms.isOwner({user_id: ownerID, room_id: roomInfo.room_id});
      is_not_owner = rooms.isOwner({user_id: 'gillespie', room_id: roomInfo.room_id});

      // Assert
      assert(is_owner);
      assert(!is_not_owner);
    })
  })
  describe('#warnUser()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var roomInfo = rooms.createRoom({user_id: 'gary', room_name: 'CSE110'});
      var qID = rooms.addQuestion({room_id: roomInfo.room_id, asker_id: 'kyly', question_text:
      'what is a for loop?'}).question_id;

      var warnParam = {room_id: roomInfo.room_id, user_id: 'gary', question_id: qID};

      // Assign
      var warnResults = rooms.warnUser(warnParam);

      // Assert
      assert(warnResults.user_banned === false);
      assert(warnResults.user_id === 'kyly')

      warnResults = rooms.warnUser(warnParam);

      assert(warnResults.user_banned === true);
    })
  })
  describe('#isBanned()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var roomInfo = rooms.createRoom({user_id: 'gary', room_name: 'CSE110'});
      var roomID = roomInfo.room_id;
      var qID = rooms.addQuestion({room_id: roomInfo.room_id, asker_id: 'kyly', question_text:
      'what is a for loop?'}).question_id;

      var warnParam = {room_id: roomInfo.room_id, user_id: 'gary', question_id: qID};

      // Assign
      var isBannedResults = rooms.isBanned({room_id: roomID, user_id: 'kyly'});

      // Assert
      assert(isBannedResults === false);
      var warnResults = rooms.warnUser(warnParam);
      warnResults = rooms.warnUser(warnParam);

      var isBannedResults = rooms.isBanned({room_id: roomID, user_id: 'kyly'});
      assert(isBannedResults === true);
    })
  })
  describe('#addQuestion()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var roomInfo = rooms.createRoom({user_id: 'gary', room_name: 'CSE110'});
      var roomID = roomInfo.room_id;

      // Assign
      var questionInfo= rooms.addQuestion({room_id: roomInfo.room_id, asker_id: 'kyly', question_text:
      'what is a for loop?'});

      // Assert
      assert(questionInfo.question_text === '<p>what is a for loop?</p>\n');
      assert(questionInfo.question_score === 0);
      assert(questionInfo.question_id !== undefined);
    })
  })
  describe('#deleteQuestion()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var roomInfo = rooms.createRoom({user_id: 'gary', room_name: 'CSE110'});
      var roomID = roomInfo.room_id;
      var questionID = rooms.addQuestion({room_id: roomInfo.room_id, asker_id: 'kyly', question_text:
      'what is a for loop?'}).question_id;
      // Assign
      var deletedInfo = rooms.deleteQuestion({room_id: roomID, user_id: 'gary', question_id: questionID});

      // Assert
      assert(deletedInfo.question_id === questionID);
    })
  })
  describe('#getTopVoted()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var roomInfo = rooms.createRoom({user_id: 'gary', room_name: 'CSE110'});
      var roomID = roomInfo.room_id;
      var questionInfo= rooms.addQuestion({room_id: roomInfo.room_id, asker_id: 'kyly', question_text:
      'what is a for loop?'});

      rooms.upvoteQuestion({room_id: roomID, question_id: questionInfo.question_id, voter_id: 'bar'})

      var topInfo = rooms.getTopVoted({room_id: roomID, num_questions: 1});

      // Assert
      assert(topInfo[0].question_id === questionInfo.question_id);
      assert(topInfo[0].question_text === '<p>what is a for loop?</p>\n');
      assert(topInfo[0].question_score === 1);
      assert(topInfo[0].time !== undefined);
    })
  })
  describe('#upvoteQuestion()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var roomInfo = rooms.createRoom({user_id: 'gary', room_name: 'CSE110'});
      var roomID = roomInfo.room_id;
      var questionInfo= rooms.addQuestion({room_id: roomInfo.room_id, asker_id: 'kyly', question_text:
      'what is a for loop?'});

      rooms.upvoteQuestion({room_id: roomID, question_id: questionInfo.question_id, voter_id: 'bar'});

      var topInfo = rooms.getTopVoted({room_id: roomID, num_questions: 1});

      // Assert
      assert(topInfo[0].question_score === 1);
    })
  })
  describe('#downvoteQuestion()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var roomInfo = rooms.createRoom({user_id: 'gary', room_name: 'CSE110'});
      var roomID = roomInfo.room_id;
      var questionInfo= rooms.addQuestion({room_id: roomInfo.room_id, asker_id: 'kyly', question_text:
      'what is a for loop?'});

      // Assign
      rooms.upvoteQuestion({room_id: roomID, question_id: questionInfo.question_id, voter_id: 'bar'});
      rooms.upvoteQuestion({room_id: roomID, question_id: questionInfo.question_id, voter_id: 'foo'});
      rooms.downvoteQuestion({room_id: roomID, question_id: questionInfo.question_id, voter_id: 'fubar'});

      var topInfo = rooms.getTopVoted({room_id: roomID, num_questions: 1});

      // Assert
      assert(topInfo[0].question_score === 1);
    })
  })
})
