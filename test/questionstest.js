var Questions = require('../modules/questions');
var Question  = require('../modules/question');
var assert    = require("assert")

describe('Questions', function(){
  describe('#logQuestion()', function(){
    it('should have question logged in orderedQuestions and questionHash.', function(){
      var qs = new Questions();

      // Set up
      var q = new Question(
        {
          id             : 'testid',
          asker          : 'me',
          questionTitle  : 'some quesiton',
          question       : 'Some text',
          comments       : [],
          voters         : ['me'],
          score          : 0,
          time           : new Date().getTime()
        }
      )

      // Assign
      qs.logQuestion(q);

      // Assert
      assert('testid' in qs.questionHash, 'Question is in questionHash.');
      assert.equal(q, qs.orderedQuestions[0], 'Question is in orderd questions.');
    })
  })
})
