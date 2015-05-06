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
            id             : '123456',
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
      expect(q.id).to.equal('123456');
      expect(q.asker).to.equal('me');
      expect(q.question).to.equal('Some text');
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
            id             : '1',
            asker          : 'p1',
            question       : 'Some text 1',
            voters         : {'p1' : 1},
            score          : 1
          }
      )

      var downvotedQUp = new Question(
          {
            id             : '2',
            asker          : 'p1',
            question       : 'Some text 2',
            voters         : {'p1' : 1, 'p2' : -1},
            score          : 0
          }
      )

      var upvotedQUp = new Question(
          {
            id             : '3',
            asker          : 'p1',
            question       : 'Some text 3',
            voters         : {'p1' : 1, 'p2' : 1},
            score          : 2
          }
      )

      // Assign
      normalQUp.upVote({voter_id : 'p2'});
      downvotedQUp.upVote({voter_id : 'p2'});
      upvotedQUp.upVote({voter_id : 'p2'});

      // Assert
      expect(normalQUp.score).to.equal(2);
    console.log(downvotedQUp.score);
      expect(downvotedQUp.score).to.equal(2);
      expect(upvotedQUp.score).to.equal(0);
    })
  })


  describe('#downVote()', function(){
    it('Should decrease score of question by one if voter hasn\'t voted, ' +
        'by two if voter has previously upvoted, or increase by one if ' +
        'voter has previously downvoted.', function() {

      // Set up
      var normalQDown = new Question(
          {
            id             : '4',
            asker          : 'p1',
            question       : 'Some text 4',
            voters         : {'p1' : 1},
            score          : 1
          }
      )

      var upvotedQDown = new Question(
          {
            id             : '5',
            asker          : 'p1',
            question       : 'Some text 5',
            voters         : {'p1' : 1, 'p2' : 1},
            score          : 2
          }
      )

      var downvotedQDown = new Question(
          {
            id             : '6',
            asker          : 'p1',
            question       : 'Some text 6',
            voters         : {'p1' : 1, 'p2' : -1},
            score          : 0
          }
      )

      // Assign
      normalQDown.downVote({voter_id : 'p2'});
      upvotedQDown.downVote({voter_id : 'p2'});
      downvotedQDown.downVote({voter_id : 'p2'});

      // Assert
      expect(normalQDown.score).to.equal(0);
      expect(downvotedQDown.score).to.equal(0);
      expect(upvotedQDown.score).to.equal(1);
    })
  })

})
