/**
 * File: delete_question.js
 * This file test the functionality of the deleteQuestion function
 *
 * Author: Robert Kronebusch
 *
 */

var Questions = require('../modules/questions');

var assert = require("assert");

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

	
