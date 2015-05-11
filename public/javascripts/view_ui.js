/**
 * Functions to interface with the Controller
 */

/**
 * This global, "static" object contains all functions for interacting with
 * the controller. Additionally, all globals for Controller functions
 * are encapsulated here.
 */
var ViewUI = function () {

  /**
   * Join a room
   * @param roomId = string, The id of the room to join
   * @return result = {room_name : string, room_id : string, questions : array,
   * top_questions : array} or {} on failure
   */
  var joinRoomImpl = function (data) {

    switch (data.option) {
      case 'make':
        //console.log('Creating new room.');
        ViewActions.enterRoomOwner(data.room_name);
        break;
      case 'join':
        //console.log('Joining room.');
        ViewActions.enterRoom(data.room_name);
        break;
    }

  };

  ///**
  // * Create a new room
  // * @param roomName = string, A descriptive name of the room to create
  // * @return result = {room_id : string, room_name : string, owner_id : string}
  // * or {} on failure
  // */
  //var createRoomImpl = function(roomName) {
  //  // TODO: Implementation
  //}

  /**
   * Destroys a room
   * @param roomId = string, The id of the room to close
   * @return result = true on success, false on failure
   */
  var closeRoomImpl = function (roomId) {
    // TODO: Implementation
  }

  /**
   * Ask a new question
   * @param questionInfo = {room_id : string, question_text : string}, A room id
   * to ask the question in, and the text of the question
   * @return result = The asked question {question_id : string,
   * question_text : string} or {} on failure
   */
  var newQuestionImpl = function (questionInfo) {
    // TODO: Implementation
  }

  /**
   * Upvote a question
   * @param questionInfo = {room_id : string, question_id : string}, The id of
   * the room that contains the question to upvote, and the id of the question
   * to upvote
   * @return result = The question {question_id : string,
   * question_score : number} or {} on failure
   */
  var upvoteQuestionImpl = function (questionInfo) {
    // TODO: Implementation
  }

  /**
   * Downvote a question
   * @param questionInfo = {room_id : string, question_id : string}, The id of
   * the room that contains the question to downvote, and the id of the question
   * to downvote
   * @return result = The question {question_id : string,
   * question_score : number} or {} on failure
   */
  var downvoteQuestionImpl = function (questionInfo) {
    // TODO: Implementation
  }

  /**
   * Dismiss a question
   * @param questionId = string, The id of the question to dismiss
   * @return result = {question_id : string} the dismissed question id or
   * {} on failure
   */
  var dismissQuestionImpl = function (questionId) {
    // TODO: Implementation
  }

  /**
   * Get the top N questions
   * @param amount = number, The number of questions to get
   * @return result = An array of Question objects
   */
  var getTopQuestionsImpl = function (amount) {
    // TODO: Implementation
  }

  /**
   * Get all questions
   * @return result = An array of all Question objects
   */
  var getAllQuestionsImpl = function () {
    // TODO: Implementation
  }

  /**
   * Warns a user
   * @param warningInfo = { user_id : string, room_id : string }, The
   * ID of the user to warn, and the room ID
   * @return result = { user_id : string, was_banned : boolean }, The
   * user ID of the offending user, and if they were banned
   */
  var warnUserImpl = function (warningInfo) {
    // TODO: Implementation
  }

  // TODO: Need Poll-related functions, when that functionality firms
  // up in the backend.

  return {
    joinRoom: joinRoomImpl,
    //createRoom: createRoomImpl,
    closeRoom: closeRoomImpl,
    newQuestion: newQuestionImpl,
    upvoteQuestion: upvoteQuestionImpl,
    downvoteQuestion: downvoteQuestionImpl,
    dismissQuestion: dismissQuestionImpl,
    getTopQuestions: getTopQuestionsImpl,
    getAllQuestions: getAllQuestionsImpl,
    warnUser: warnUserImpl
  }
}();
