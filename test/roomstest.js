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
    it('Should have room in rooms after createRoom is called.', function(){
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
    it('Should have room in rooms after createRoom is called.', function(){
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
    it('should have room in questionrepo after addRoom is called.', function(){
      // Set
      var rooms = new Rooms();

      // Assign
      rooms.addRoom({owner: 'tester', room_id: 'testroom', name: 'gary'})

      // Assert
      assert.equal(true, 'testroom' in rooms.rooms);
      rooms.closeRoom('testroom');
      assert.equal(false, 'testroom' in rooms.rooms);
    })
  })
})
