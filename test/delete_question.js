var Questions = require('../modules/questions');

var assert = require("assert");

//Describe expected outcome of function call to deleteQuestion
describe('#deleteQuestion()', function() {
it('should delete question from hash table, up-voted question array, and ordered question array', function(){

	//Make new a new Questions object
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

	assert(!(info2 in questions.questionHash));
	assert(!(info2 in questions.upVotedQuestions));
	assert(!(info2 in questions.orderedQuestions));


	})
})

describe('#deleteQuestion()', function() {
it('should throw exception and return an empty object if the question does not exist', function(){

	var questions = new Questions();
	
	var questionOne = {room_id: "r1", question_text: "question?", asker_id: "q"};
	var info = questions.addQuestion(questionOne);
	var test = questions.deleteQuestion(info);
	
	assert(!test);
	
	})
})

	
