var Rooms = require('../modules/rooms');

var assert = require("assert")
describe('Rooms', function(){
  describe('#addRoom()', function(){
    it('should have room in questionrepo after addRoom is called.', function(){
      var rooms = new Rooms();

      // Assert
      assert.equal(true, rooms.addRoom({owner: 'tester', room: 'testroom'}));
      assert.equal(true, 'testroom' in rooms.questionrepos);
    })
  })
  describe('#hasRoom()', function(){
    it('should have room in questionrepo after addRoom is called.', function(){
      var rooms = new Rooms();
      rooms.addRoom({owner: 'tester', room: 'testroom'})
      // Assert
      assert.equal(true, rooms.hasRoom('testroom'));
    })
  })
  describe('#purgeRoom()', function(){
    it('should have room in questionrepo after addRoom is called.', function(){
      var rooms = new Rooms();
      rooms.addRoom({owner: 'tester', room: 'testroom'})
      // Assert
      assert.equal(true, 'testroom' in rooms.questionrepos);
      rooms.purgeRoom('testroom');
      assert.equal(false, 'testroom' in rooms.questionrepos);


    })
  })
})
