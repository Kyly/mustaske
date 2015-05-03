/**
 * TODO file header
 */

 var Question  = require('../modules/question');
 var assert    = require("assert")

 describe('Question', function(){
   describe('#new Question()', function(){
     it('Should initialize all variables correctlly upon instantiation.', function(){

       // Set up
       var q = new Question(
         {
           id             : 'testid',
           asker          : 'me',
           questionTitle  : 'some question',
           question       : 'Some text',
           comments       : [],
           voters         : ['me'],
           score          : 0,
           time           : new Date().getTime()
         }
       )

       // Assign


       // Assert
       assert.equal(q.id, 'testid', 'Question id is correct.');
       assert.equal(q.asker, 'me', 'Question asker is correct.');
       assert.equal(q.questionTitle, 'some question', 'Question titel is correct.');
       assert.equal(q.question, 'Some text', 'Question is correct.');
       assert.equal(q.score, 0, 'Question score is correct.');
     })
   })
 })
