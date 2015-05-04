var Questions = require('../modules/questions');
var Question  = require('../modules/question');
var Heap      = require('heap');
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
      );

      // Assign
      qs.logQuestion(q);

      // Assert
      assert('testid' in qs.questionHash, 'Question is in questionHash.');
      assert.equal(q, qs.orderedQuestions[0], 'Question is in orderd questions.');
    })
  })

  describe('#getQuestion()', function(){
    it('should have get n question from orderedQuestions.', function(){
      var qs = new Questions();

      // Set up
      for (q in sampleQuestions) {
        qs.logQuestion(q);
      }

      // Assign
      var nquestions = qs.getQuestions(2);

      // Assert
      assert(nquestions.length == 2, '==qs.getQuestions(2).length');
    })
  })

  describe('#getTopVoted()', function(){
    it('should have get n top voted question from orderedQuestions.', function(){
      var qs = new Questions();

      // Set up
      for (q in sampleQuestions) {
        qs.logQuestion(sampleQuestions[q]);
      }

      // Assign
      var nquestions = qs.getTopVoted(2);

      // Assert
      assert(nquestions.length === 2, '===qs.getTopVoted(2).length');
      assert(nquestions[0].id === 'topvoted', '===Top voted question');
    })
  })
})


var sampleQuestions = [
  new Question(
    {
      id             : '0',
      asker          : 'me',
      questionTitle  : 'some quesiton',
      question       : 'Some text',
      comments       : [],
      voters         : ['me'],
      score          : 0,
      time           : new Date().getTime()
    }
  ),
  new Question(
    {
      id             : 'topvoted',
      asker          : 'me',
      questionTitle  : 'some quesiton',
      question       : 'Some text',
      comments       : [],
      voters         : ['me','you', 'them'],
      score          : 4,
      time           : new Date().getTime()
    }
  ),
  new Question(
    {
      id             : '2',
      asker          : 'me',
      questionTitle  : 'some quesiton',
      question       : 'Some text',
      comments       : [],
      voters         : ['me','you', 'them'],
      score          : 2,
      time           : new Date().getTime()
    }
  )
];
