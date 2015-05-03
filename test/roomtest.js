var Room = require('../modules/room');
var Question = require('../modules/question')

var assert = require("assert")
describe('Room', function(){
  describe('#addQuestion()', function(){
    it('should have have a Question in questions after addQuestion is called.', function(){
      // Set
      var room = new Room(
        {
          id          : 'testRoom',
          name        : 'CSE 110',
          owner       : 'boogeyman'
        }
      );

      // Assign
      var newQuestion = new Question(
        {
          id             : 'testid',
          asker          : 'me',
          questionTitle  : 'some quesiton',
          question       : 'Some text',
          comments       : [],
          voters         : ['me'],
          score          : 0,
          time           : new Date().getTime()
        });

      var badQuestion = new Question(
        {
          id             : 'badid',
          asker          : 'me',
          questionTitle  : 'some quesiton',
          question       : 'Some text',
          comments       : [],
          voters         : ['me'],
          score          : 0,
          time           : new Date().getTime()
        });

      var res = room.addQuestion(newQuestion);

      // Assert
      assert(room.hasQuestion(newQuestion));
      assert(!room.hasQuestion(badQuestion));
    })
  })
  
})
