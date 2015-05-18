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
            question_id     : '123456',
            asker_id        : 'me',
            question_text   : 'Some text'
          }
      )

      // Assign


      // Assert
      expect(q.question_id).to.equal('123456');
      expect(q.asker).to.equal('me');
      expect(q.question_text).to.equal('Some text');
      expect(q.score).to.equal(1);
    })
  })


  describe('#upVote()', function(){
    it('Should increase score of question by one if voter hasn\'t voted, ' +
        'by two if voter has previously downvoted, or decrease by one if ' +
        'voter has previously upvoted.', function() {

      // Set up
      var normalQUp = new Question(
          {
            question_id     : '1',
            asker_id        : 'p1',
            question_text   : 'Some text 1'
          }
      )

      var downvotedQUp = new Question(
          {
            question_id     : '2',
            asker_id        : 'p1',
            question_text   : 'Some text 2'
          }
      )

      downvotedQUp.voters['p2'] = -1;
      --(downvotedQUp.score);

      var upvotedQUp = new Question(
          {
            question_id     : '3',
            asker_id        : 'p1',
            question_text   : 'Some text 3'
          }
      )

      upvotedQUp.voters['p2'] = 1;
      ++(upvotedQUp.score);

      // Assign
      normalQUp.upVote({voter_id : 'p2'});
      downvotedQUp.upVote({voter_id : 'p2'});
      upvotedQUp.upVote({voter_id : 'p2'});

      // Assert
      expect(normalQUp.score).to.equal(2);
      expect(downvotedQUp.score).to.equal(2);
      expect(upvotedQUp.score).to.equal(1);
    })
  })


  describe('#downVote()', function(){
    it('Should decrease score of question by one if voter hasn\'t voted, ' +
        'by two if voter has previously upvoted, or increase by one if ' +
        'voter has previously downvoted.', function() {

      // Set up
      var normalQDown = new Question(
          {
            question_id     : '4',
            asker_id        : 'p1',
            question_text   : 'Some text 4'
          }
      )

      var upvotedQDown = new Question(
          {
            question_id     : '5',
            asker_id        : 'p1',
            question_text   : 'Some text 5'
          }
      )

      upvotedQDown.voters['p2'] = 1;
      ++(upvotedQDown.score);

      var downvotedQDown = new Question(
          {
            question_id     : '6',
            asker_id        : 'p1',
            question_text   : 'Some text 6'
          }
      )

      downvotedQDown.voters['p2'] = -1;
      --(downvotedQDown.score);

      // Assign
      normalQDown.downVote({voter_id : 'p2'});
      upvotedQDown.downVote({voter_id : 'p2'});
      downvotedQDown.downVote({voter_id : 'p2'});

      // Assert
      expect(normalQDown.score).to.equal(0);
      expect(upvotedQDown.score).to.equal(0);
      expect(downvotedQDown.score).to.equal(1);
    })
  })

})