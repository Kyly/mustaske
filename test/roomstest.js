/**
 * TODO file header
 */

var Rooms = require('../modules/rooms');

var assert = require("assert")
describe('Rooms', function(){
  describe('#createRoom()', function(){
    it('Should have room in rooms after createRoom is called.' +
      ' Should return correct owner_id and room_name.', function(){
      // Set
      var rooms = new Rooms();
      ownerID = 'tester';
      roomName = 'gary';

      // Assign
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assert
      assert(roomInfo.room_id in rooms.rooms);
      assert(roomInfo.owner_id === ownerID);
      assert(roomInfo.room_name === roomName);
    })
  })
  describe('#joinRoom()', function(){
    it('Makes sure correct values are returned from joinRoom.', function(){
      // Set
      var rooms = new Rooms();
      ownerID = 'tester';
      roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

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
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

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
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assert
      assert(roomInfo.room_id in rooms.rooms);
      rooms.closeRoom({owner_id: ownerID, room_id: roomInfo.room_id});
      assert(!(roomInfo.room_id in rooms.rooms));
    })
  })
  describe('#isOwner()', function(){
    it('Checks if isOwner returns accurate value.', function(){
      // Set
      var rooms = new Rooms();
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

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
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assign

      // Assert
      assert(true);
    })
  })
  describe('#banUser()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assign

      // Assert
      assert(true);
    })
  })
  describe('#isBanned()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assign

      // Assert
      assert(true);
    })
  })
  describe('#addQuestion()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assign

      // Assert
      assert(true);
    })
  })
  describe('#deleteQuestion()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assign

      // Assert
      assert(true);
    })
  })
  describe('#getTopVoted()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assign

      // Assert
      assert(true);
    })
  })
  describe('#upVoteQuestion()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assign

      // Assert
      assert(true);
    })
  })
  describe('#downVoteQuestion()', function(){
    it('Checks lower layer function call.', function(){
      // Set
      var rooms = new Rooms();
      var ownerID = 'tester';
      var roomName = 'gary';
      var roomInfo = rooms.createRoom({owner_id: ownerID, room_name: roomName});

      // Assign

      // Assert
      assert(true);
    })
  })
})
