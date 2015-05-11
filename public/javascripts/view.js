/**
 * Functions to interface with the DOM
 */

/**
 * This global, "static" object contains all functions for interacting with
 * the DOM. Additionally, all globals for DOM functions
 * are encapsulated here.
 */

var ViewActions = function () {

  /**
   * Enter the room as an owner
   * @param roomName = String name of room
   */
  var enterRoomOwnerImpl = function (roomName) {
    socket.emit('create room', roomName);
  }

  /**
   * Enter the room as an audience member
   * @param roomName = String name of room
   */
  var enterRoomImpl = function (roomName) {
    socket.emit('join room', roomName)
  }

  /**
   * Return to the home screen
   */
  var showHomeScreenImpl = function () {
    // TODO: Implementation
  }

  /**
   * update UI reflecting top questions threshold updated
   * @param questions = [Question], New array of top questions
   */
  var updateTopQuestionThresholdImpl = function (questions) {
    // TODO: Implementation
  }

  /**
   * update UI reflecting a dismissed question
   * @param questionId = string, The ID of the dismissed question
   */
  var questionDismissedImpl = function (questionId) {
    // TODO: Implementation
  }

  /**
   * Update UI reflecting a warning being issued
   * @param userId = string, the ID of the offending user
   */
  var userWarnedImpl = function (userId) {
    // TODO: Implementation
  }

  /**
   * Update UI reflecting a question being added
   * @param questionInfo = {question_id : string, question_text : string},
   * The ID of the question and the text content of the question
   */
  var questionAddedImpl = function (questionInfo) {
    // TODO: Implementation
  }

  /**
   * Update UI reflecting the score of a question changing
   * @param scoreInfo = {question_id : string, question_score : number},
   * The ID of the question being updated, and its new score
   */
  var questionScoreChangedImpl = function (scoreInfo) {
    // TODO: Implementation
  }

  // TODO: Need Poll-related functions, when that functionality firms
  // up in the backend.

  return {
    enterRoomOwner: enterRoomOwnerImpl,
    enterRoom: enterRoomImpl,
    showHomeScreen: showHomeScreenImpl,
    updateTopQuestionThreshold: updateTopQuestionThresholdImpl,
    questionDismissed: questionDismissedImpl,
    userWarned: userWarnedImpl,
    questionAdded: questionAddedImpl,
    questionScoreChanged: questionScoreChangedImpl
  }
}();
