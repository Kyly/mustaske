/**
 * Test functionality for quesitons module
 */

var Questions = require('../modules/questions');
var Question  = require('../modules/question');
var assert = require('chai').assert;
var expect = require('chai').expect;


describe('Questions', function(){
  describe('#addQuestion()', function(){
    it('should have question logged in orderedQuestions and questionHash.', function(){

      // Set up
      var qs = new Questions();
      var q = new Question({
          id             : 'testid',
          asker          : 'me',
          questionTitle  : 'some question',
          question       : 'Some text',
          comments       : [],
          voters         : ['me'],
          score          : 0,
          time           : new Date().getTime()
        }
      );

      // Assign
      qs.addQuestion(q);

      // Assert
      assert('testid' in qs.questionHash, 'Question not found in questionHash.');
      assert(q === qs.orderedQuestions[0], 'Question is in orderd questions.');

    });
  });

  describe('#addQuestion()', function(){
    it('should have question logged in orderedQuestions and questionHash.', function(){

      // Set up
      var qs = new Questions();
      var q = new Question({
          id             : 'testid',
          asker          : 'me',
          questionTitle  : 'some question',
          question       : 'Some text',
          comments       : [],
          voters         : ['me'],
          score          : 0,
          time           : new Date().getTime()
        }
      );

      // Assign
      qs.addQuestion(q);

      // Assert
      expect(qs.hasQuestion('testid')).to.be.true;
    });
  });

  describe('#upVoteQuestion()', function(){
    it('should increment score in qeution q.', function(){
      // Set up
      var qs = new Questions();
      var q  = {
        asker_id       : '0',
        question_text  : 'Some text',
      };

      // Assign
      var ques = qs.addQuestion(q);
      qs.upVoteQuestion({question_id: 'testid', voter_id: 'them'});

      // Assert
      assert(q.score === 1, 'Qestion score did not get up voted.');
    });
  });

  describe('#downVoteQuestion()', function(){
    it('should decrement score in qeution q.', function(){
      // Set up
      var qs = new Questions();
      var q  = {
        asker_id       : '0',
        question_text  : 'Some text',
      };

      // Assign

      // Assert
    });
  });

  describe('#getTopVoted()', function(){
    it('should get the top voted questions.', function(){
      // Set up
      var qs = new Questions();
      for (q in testquestions) {
        qs.addQuestion(testquestions[q]);
        qs.upVoteQuestion({
          question_id : testquestions[q].id,
          voter_id    : 'Sam Joe'
        });
      }

      // Assign
      var topVotedAll = qs.getTopVoted();
      var topVoted2   = qs.getTopVoted(2);

      // Assert
      expect(topVotedAll).to.have.length(testquestions.length);
      expect(topVoted2).to.have.length(2);
      // expect(topVoted2).to.contain(testquestions[2],testquestions[0]);

    });
  });

  describe('#getQuestions()', function(){
    it('should get some or all of the questions.', function(){
      // Set up
      var qs = new Questions();
      for (q in testquestions) {
        qs.addQuestion(testquestions[q]);
      }

      // Assign
      var count = testquestions.length;
      var all   = qs.getQuestions();
      var some  = qs.getQuestions(2);

      // Assert
      expect(all).to.have.length(count);
      expect(some).to.have.length(2);
      // expect(some)
      //   .to
      //   .contain(testquestions[count - 1],testquestions[count]);

    });
  });

});

var testquestions = [
  {
    asker_id       : '0',
    question_text  : 'Some text',
  },
  {
    asker_id       : '2',
    question_text  : 'Some text',
  },
  {
    asker_id       : '3',
    question_text  : 'Some text',
  },
  {
    asker_id       : '4',
    question_text  : 'Some text',
  },
  {
    asker_id       : '5',
    question_text  : 'Some text',
  }
];
