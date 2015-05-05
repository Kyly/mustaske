/**
 * TODO file header
 */

var Rooms = require('../modules/rooms');

var assert = require("assert")
describe('Rooms', function(){
  describe('#addRoom()', function(){
    it('should have room in rooms after addRoom is called.', function(){
      // Set
      var rooms = new Rooms();

      // Assign
      var res = rooms.addRoom({owner: 'tester', room_id: 'testroom'});

      // Assert
      assert('testroom' in rooms.rooms);
    })
  })
  describe('#hasRoom()', function(){
    it('should have room in questionrepo after addRoom is called.', function(){
      // Set
      var rooms = new Rooms();

      // Assign
      rooms.addRoom({owner: 'tester', room_id: 'testroom'})

      // Assert
      assert(rooms.hasRoom('testroom'));
    })
  })
  describe('#purgeRoom()', function(){
    it('should have room in questionrepo after addRoom is called.', function(){
      // Set
      var rooms = new Rooms();

      // Assign
      rooms.addRoom({owner: 'tester', room_id: 'testroom'})

      // Assert
      assert.equal(true, 'testroom' in rooms.rooms);
      rooms.purgeRoom('testroom');
      assert.equal(false, 'testroom' in rooms.rooms);


    })
  })
})
