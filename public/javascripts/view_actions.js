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
   * @param roomInfo = {room_id : string, room_name : string,
   * owner_id : string}
   */
  var enterRoomOwnerImpl = function (roomInfo) {

    if (!roomInfo) {
      $('#login-info .room-name-field').addClass('.has-error');
    }


    else {
      $('#room-name-field').removeClass('has-error');
      var roomName = $('.room-name');

      roomName.html('<small>Owner View for </small>' + roomInfo.room_name + ': <small>' + roomInfo.room_id + '</small>');
      roomName.attr('room-id', roomInfo.room_id);
      $('.login-overlay').addClass('animated slideOutUp');
      console.log('Room Id: ' + roomInfo.room_id);
    }
  }

  /**
   * Enter the room as an audience member
   * @param roomInfo = {room_name : string, room_id : string,
   * questions : array, top_questions : array}
   */
  var enterRoomImpl = function (roomInfo) {

    if (!roomInfo) {
      $('#room-name-field').addClass('has-error');
    }

    else {
      $('#room-name-field').removeClass('has-error');
      var roomName = $('.room-name');

      roomName.text(roomInfo.room_name + ': ' + roomInfo.room_id);
      roomName.attr('room-id', roomInfo.room_id);
      $('.login-overlay').addClass('animated slideOutUp');
      console.log('Room Id: ' + roomInfo.room_id);
      // TODO Add questions and top questions
    }
  }

  /**
   * Return to the home screen
   */
  var showHomeScreenImpl = function () {
    // TODO
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
    console.log(questionInfo);
    var newQuestion = createQuestion(questionInfo, 1);
    $('#recent-questions').prepend(newQuestion);
  }

  /**
   * Builds a question html element for use with questionAddedImpl.
   * @param questionInfo = {question_id : string, question_text : string}
   * @return string TODO fix 80 character per line limit
   */
  var createQuestion = function (questionInfo, score) {
    var newQuestion = '<div class=\"animated pulse\">' +'<div class=\"totalRecentQuestion\" question_id=\"' + questionInfo.question_id + '\" score=\"'+score+'\">' +
        '<div class=\"recentquestion_section\">' +
            '<p class=\"question\">'+questionInfo.question_text+'</p><br>' +
            '<div class=\"row\">' +
                '<a href=\"#\" id=\"thumbs_down_to_active\"><i class=\"fa fa-thumbs-o-down fa-2x col-md-1 col-sm-1 col-xs-1 col-lg-1\"></i></a>' +
                '<p class=\"numVotes col-md-1 col-sm-1 col-xs-1 col-lg-1\">' +
                    score+'</p>' +
                '<a href=\"#\" id=\"thumbs_up_to_active\"><i class=\"fa fa-thumbs-o-up fa-2x col-md-1 col-sm-1 col-xs-1 col-lg-1\"></i></a>' +
                '<p class=\"numComments col-md-offset-7 col-sm-offset-6 col-xs-offset-6 col-md-1 col-sm-1 col-xs-1 col-lg-1\">' +
                    '1</p>' +
                '<a href=\"#\" id=\"comment_to_active\"><img src=\"/images/comment.png\" class=\"col-md-1 col-sm-2 col-xs-2 col-lg-1 comment \"></a>' +
                '<a href=\"#\" id=\"comment_to_inactive\"><img src=\"/images/comment_active.png\" class=\"col-md-1 col-sm-1 col-xs-1 col-lg-1 comment com_active\"></a>' +
            '</div>' +
        '</div>' +
        '<!--end recentquestion_section-->' +
        '<div class=\"commentSection\">' +
            '<a href=\"#\" id=\"more\">view more comments</a>' +
            '<p>i need comments</p>' +
            '<input class=\"form-control\" placeholder=\"write a comment...\" type=\"text\">' +
        '</div>' +
        '<hr>' +
    '</div>'
    + '</div>';

    return newQuestion;
  }
  /**
   * Update UI reflecting the score of a question changing
   * @param scoreInfo = {question_id : string, question_score : number},
   * The ID of the question being updated, and its new score
   */
  var questionScoreChangedImpl = function (scoreInfo) {
    // TODO: Implementation
  }

  /**
   * Sets up the initial state of the page. When this function returns, the page
   * should be ready for the user
   */
  var setupUIImpl = function () {
    $('#join-create-room .btn').click(function () {
      var textBox = $('#room-name-field input');

      var roomName = textBox.val();

      if (roomName === '') {
        $('#room-name-field').addClass('has-error');
      }

      else {

        var data = {
          option: $(this).text().toLowerCase().trim(),
          room_name: textBox.val()
        };

        switch (data.option) {
        case 'make':
          console.log('Creating new room.');
          socket.emit('create room', data.room_name);
          break;
        case 'join':
          console.log('Joining room.');
          socket.emit('join room', data.room_name);
          break;
        }
      }

    });
  }

  /**
   * Returns a string containing the HTML of a topquestion_section div.
   * See line 193 of /views/index.html for a template
   * @param TODO: params list
   * @returns result = string, the recentquestion_section div
   */
  var recentQuestionsDiv = function() {

  }

  /**
   * Returns a string containing the HTML of a recentquestion_section div.
   * See line 94 of /views/index.html for a template
   * @param TODO: params list
   * @returns result = string, the topquestion_section div
   */
  var topQuestionsDiv = function() {

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
    questionScoreChanged: questionScoreChangedImpl,
    setupUI: setupUIImpl
  }
}();
