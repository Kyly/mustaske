/**
 * TODO file header
 */

var Question  = require('../modules/question');
var assert = require('chai').assert;
var expect = require('chai').expect;

 describe('Question', function(){
   describe('#new Question()', function(){
     it('Should initialize all variables correctlly upon instantiation.', function(){

       // Set up
       var q = new Question(
         {
           asker    : 'me',
           question : 'Some text',
           id       : '123456'
         }
       );

       // Assign


       // Assert
       expect(q.id).to.equal('123456');
       expect(q.asker).to.equal('me');
       expect(q.question).to.equal('Some text');
       expect(q.score).to.equal(0);
     });
   });
 });
