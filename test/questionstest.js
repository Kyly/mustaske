/**
 * Test functionality for questions module
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
      var q = {
          asker_id       : '0',
          question_text  : 'Some text',
        };

      // Assign
      var ques = qs.addQuestion(q);

      // Assert
      expect(qs.hasQuestion(ques.id)).to.be.true;
    });
  });


  describe('#upVoteQuestion()', function(){
    it('Should increase score of question by one if voter hasn\'t voted, ' +
        'by two if voter has previously downvoted, or decrease by one if ' +
        'voter has previously upvoted.', function() {

      // Set up
      var qs = new Questions();

      var normalQUp = new Question(
          {
            id             : '1',
            asker          : 'p1',
            question       : 'Some text 1'
          }
      )

      var downvotedQUp = new Question(
          {
            id             : '2',
            asker          : 'p1',
            question       : 'Some text 2'
          }
      )

      downvotedQUp.voters['p2'] = -1;
      --(downvotedQUp.score);

      var upvotedQUp = new Question(
          {
            id             : '3',
            asker          : 'p1',
            question       : 'Some text 3'
          }
      )

      upvotedQUp.voters['p2'] = 1;
      ++(upvotedQUp.score);

      // Assign
      var q1 = qs.addQuestion(normalQUp);
      var q2 = qs.addQuestion(downvotedQUp);
      var q3 = qs.addQuestion(upvotedQUp);

      qs.upVoteQuestion({question_id: q1.id, voter_id: 'p2'});
      qs.upVoteQuestion({question_id: q2.id, voter_id: 'p2'});
      qs.upVoteQuestion({question_id: q3.id, voter_id: 'p2'});

      // Assert
      expect(q1.score).to.equal(2);
      expect(q2.score).to.equal(2);
      expect(q3.score).to.equal(1);
    })
  })

  //TODO get this like the upVoteQuestion test
  describe('#downVoteQuestion()', function(){
    it('should decrement score in question q.', function(){
      // Set up
      var qs = new Questions();
      var q  = {
        asker_id       : '0',
        question_text  : 'Some text',
      };

      // Assign

      // Assert
    })
  })


  describe('#getTopVoted()', function(){
    it('should get the top voted questions.', function(){
      // Set up
      var qs = new Questions();
      var questions = [];
      for (q in testquestions) {
        questions[q] = qs.addQuestion(testquestions[q]);
        qs.upVoteQuestion({
          question_id : questions[q].id,
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

    })
  })


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

    })
  })

})

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
