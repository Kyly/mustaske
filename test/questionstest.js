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
      }

      // Assign
      var ques = qs.addQuestion(q);

      // Assert
      expect(qs.hasQuestion(ques.question_id)).to.be.true;
    });
  });


  describe('#upvoteQuestion()', function(){
    it('Should increase score of question by one if voter hasn\'t voted, ' +
        'by two if voter has previously downvoted, or decrease by one if ' +
        'voter has previously upvoted.', function() {

      // Set up
      var qs = new Questions();

      var normalQUp = {
        asker_id          : 'p1',
        question_text     : 'Some text 1'
      }

      var downvotedQUp = {
        asker_id          : 'p1',
        question_text     : 'Some text 2'
      }

      var upvotedQUp = {
        asker_id          : 'p1',
        question_text     : 'Some text 3'
      }

      // Assign
      var q1 = qs.addQuestion(normalQUp).question_id;
      var q2 = qs.addQuestion(downvotedQUp).question_id;
      qs.questionHash[q2].voters['p2'] = -1;
      --(qs.questionHash[q2].score);
      var q3 = qs.addQuestion(upvotedQUp).question_id;
      qs.questionHash[q3].voters['p2'] = 1;
      ++(qs.questionHash[q3].score);

      qs.upvoteQuestion({question_id: q1, voter_id: 'p2'});
      qs.upvoteQuestion({question_id: q2, voter_id: 'p2'});
      qs.upvoteQuestion({question_id: q3, voter_id: 'p2'});

      // Assert
      expect(qs.questionHash[q1].score).to.equal(1);
      expect(qs.questionHash[q2].score).to.equal(1);
      expect(qs.questionHash[q3].score).to.equal(0);
    })
  })


  describe('#downvoteQuestion()', function(){
    it('Should decrease score of question by one if voter hasn\'t voted, ' +
        'by two if voter has previously upvoted, or increase by one if ' +
        'voter has previously downvoted.', function(){
      // Set up
      var qs = new Questions();

      var normalQDown = {
        asker_id          : 'p1',
        question_text     : 'Some text 1'
      }

      var upvotedQDown = {
        asker_id          : 'p1',
        question_text     : 'Some text 2'
      }

      var downvotedQDown = {
        asker_id          : 'p1',
        question_text     : 'Some text 3'
      }

      // Assign
      var q1 = qs.addQuestion(normalQDown).question_id;
      var q2 = qs.addQuestion(upvotedQDown).question_id;
      qs.questionHash[q2].voters['p2'] = 1;
      ++(qs.questionHash[q2].score);
      var q3 = qs.addQuestion(downvotedQDown).question_id;
      qs.questionHash[q3].voters['p2'] = -1;
      --(qs.questionHash[q3].score);

      var q1Score = qs.downvoteQuestion({question_id: q1, voter_id: 'p2'});
      var q2Score = qs.downvoteQuestion({question_id: q2, voter_id: 'p2'});
      var q3Score = qs.downvoteQuestion({question_id: q3, voter_id: 'p2'});

      // Assert
      expect(q1Score.question_score).to.equal(-1);
      expect(q2Score.question_score).to.equal(-1);
      expect(q3Score.question_score).to.equal(0);
    })
  })


  describe('#getTopVoted()', function(){
    it('should get the top voted questions.', function(){
      // Set up
      var qs = new Questions();

      var questions = [];

      for (var i in testquestions) {
        questions[i] = qs.addQuestion(testquestions[i]);

        qs.upvoteQuestion({
          question_id : questions[i].question_id,
          voter_id    : 'Sam Joe'
        })
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
//Describe expected outcome of function call to deleteQuestion
describe('#deleteQuestion()', function() {
it('should delete question from hash table, up-voted question array, and ordered question array', function(){

  //Make new Questions object
  var questions = new Questions();

  //Populate questions var with new questions
  var questionOne = {room_id: "r1" , question_text: "question one?", asker_id: "q1"};
  var info1 = questions.addQuestion(questionOne).id;

  var questionTwo = {room_id: "r1" , question_text: "question two?", asker_id: "q2"};
  var info2 = questions.addQuestion(questionTwo).id;

  var questionThree = {room_id: "r1", question_text: "question three?", asker_id: "q3"};
  var info3 = questions.addQuestion(questionThree).id;

  //Call deleteQuestion function
  questions.deleteQuestion(info2);

  //Check if question is no longer in questionHash, upvoteQuestions, and orderedQuestions
  assert(!(info2 in questions.questionHash));
  assert(!(info2 in questions.upvotedQuestions));
  assert(!(info2 in questions.orderedQuestions));


  })
})

//
describe('#deleteQuestion()', function() {
it('should return empty test var if the question is not created', function(){
  //Make new Questions object
  var questions = new Questions();
  
  //Populate questions var with new questions
  var questionOne = {room_id: "r1", question_text: "question?", asker_id: "q"};
  var info = questions.addQuestion(questionOne);
  
  //Delete question
  var test = questions.deleteQuestion(info);
  
  //Check if test is empty
  assert(!test);
  
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