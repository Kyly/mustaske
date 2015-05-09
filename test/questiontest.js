/**
 * TODO file header
 */

var Question  = require('../modules/question');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Question', function(){

  describe('#new Question()', function(){
    it('Should initialize all variables correctly upon instantiation.', function(){

      // Set up
      var q = new Question(
          {
            id             : 'testid',
            asker          : 'me',
            question       : 'Some text',
            comments       : [],
            voters         : {'me' : 1},
            score          : 1,
            time           : new Date().getTime()
          }
      )

      // Assign


      // Assert
      assert.equal(q.id, 'testid', 'Question id is correct.');
      assert.equal(q.asker, 'me', 'Question asker is correct.');
      assert.equal(q.question, 'Some text', 'Question is correct.');
      assert.equal(q.voters['me'], 1, 'Question voters is correct');
      assert.equal(q.score, 1, 'Question score is correct.');
    })
  })


  describe('#upVote()', function(){
    it('Should increase score of question by one if voter hasn\'t voted, ' +
        'by two if voter has previously downvoted, or decrease by one if ' +
        'voter has previously upvoted.', function() {

      // Set up
      var normalQUp = new Question(
          {
            id             : 'q1',
            asker          : 'p1',
            question       : 'Some text',
            voters         : {'p1' : 1},
            score          : 1
          }
      )

      var downvotedQUp = new Question(
          {
            id             : 'q2',
            asker          : 'p1',
            question       : 'Some text 2',
            voters         : {'p1' : 1, 'p2' : -1},
            score          : 0
          }
      )

      var upvotedQUp = new Question(
          {
            id             : 'q3',
            asker          : 'p2',
            question       : 'Some text 3',
            voters         : {'p1' : 1, 'p2' : 1},
            score          : 2
          }
      )

      // Assign
      normalQUp.upVote({voter_id: 'p2'});
      downvotedQUp.upVote({voter_id: 'p2'});
      upvotedQUp.upVote({voter_id: 'p2'});

      // Assert

      expect(normalQUp.score).to.equal(2, 'Normal upvoting increases score correctly.');
      assert.equal(normalQUp.score, 2, 'Normal upvoting increases score correctly.');
      assert.equal(downvotedQUp.score, 2, 'Upvoting after downvoting increases score correctly.');
      assert.equal(upvotedQUp.score, 0, 'Upvoting after upvoting decreases score correctly.');
    })
  })


  describe('#downVote()', function(){
    it('Should decrease score of question by one if voter hasn\'t voted, ' +
        'by two if voter has previously upvoted, or increase by one if ' +
        'voter has previously downvoted.', function() {

      // Set up
      var normalQDown = new Question(
          {
            id             : 'q1',
            asker          : 'p1',
            question       : 'Some text',
            voters         : {'p1' : 1},
            score          : 1
          }
      )

      var upvotedQDown = new Question(
          {
            id             : 'q2',
            asker          : 'p1',
            question       : 'Some text 2',
            voters         : {'p1' : 1, 'p2' : 1},
            score          : 2
          }
      )

      var downvotedQDown = new Question(
          {
            id             : 'q3',
            asker          : 'p2',
            question       : 'Some text 3',
            voters         : {'p1' : 1, 'p2' : -1},
            score          : 0
          }
      )

      // Assign
      normalQDown.downVote({voter_id: 'p2'});
      upvotedQDown.downVote({voter_id: 'p2'});
      downvotedQDown.downVote({voter_id: 'p2'});

      // Assert
      assert.equal(normalQDown.score, 0, 'Normal downvoting decreases score correctly.');
      assert.equal(upvotedQDown.score, 0, 'Downvoting after upvoting decreases score correctly.');
      assert.equal(downvotedQDown.score, 1, 'Downvoting after downvoting increases score correctly.');
    })
  })

})