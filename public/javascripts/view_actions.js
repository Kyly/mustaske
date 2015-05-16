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
    $(".login-overlay").removeClass('animated slideOutUp').addClass('animated slideInDown');
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
    var newQuestionInfo = {
      question_id   : questionInfo.question_id,
      question_text : questionInfo.question_text,
      score         : 0,
      classes       : 'recent-question'
    };

    $('#recent-questions-container').prepend(topQuestionTpl(newQuestionInfo));
    $('.recent-question #thumbs-up-to-active').click(thumbsUpOnClickFn);
    $('.recent-question #thumbs-down-to-active').click(thumbsDownOnClickFn);
  }

  /**
   * Update UI reflecting the score of a question changing
   * @param scoreInfo = {question_id : string, question_score : number},
   * The ID of the question being updated, and its new score
   */
  var questionScoreChangedImpl = function (scoreInfo) {
    // TODO: Implementation
  }

  var topQuestionsUpdatedImpl = function (topQuestionsInfo) {

    var topQuestionAdded = function (topQuestionInfo) {
      // TODO: Function to add top question, called by topQuestionsUpdated
      // if we need to add a new top question to the list

      var newQuestionInfo = { // TODO: fields may not be right
        question_id   : topQuestionInfo.question_id,
        question_text : topQuestionInfo.question_text,
        score         : 0,
        classes       : 'top-question'
      };

      $('#top-questions-container').prepend(topQuestionTpl(newQuestionInfo));
      $('.top-question #thumbs-up-to-active').click(thumbsUpOnClickFn);
      $('.top-question #thumbs-down-to-active').click(thumbsDownOnClickFn);
    }

    // TODO: Remove questions no longer in the top X

    // TODO: Add new questions that joined the top X

    // TODO: Re-order questions to match new ordering
  }

  /**
   * Sets up the initial state of the page. When this function returns, the page
   * should be ready for the user
   */
  var setupUIImpl = function () {
    /**
     * Callback for add question button
     * @param event = Object, JQuery event object
     */
    var addQuestionOnClickFn = function (event) {

      console.log(event);
      var textBox = $('#add-question-text');
      var questionText = textBox.val();

      var data = {
        question_text: questionText,
        room_id: $('.room-name').attr('room-id')
      };
      socket.emit('new question', data);
      textBox.val('');
      event.preventDefault();
    }

    /**
     * Callback for the home screen join and make buttons
     */
    var joinMakeOnClickFn = function () {

      var textBox = $('#room-name-field input');
      var roomName = textBox.val();

      if (roomName === '') { // TODO: Validation
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
    }

    $('#join-create-room .btn').click(joinMakeOnClickFn);

    $('#add-question').submit(addQuestionOnClickFn);

    // TODO: Do we need this? Comment sections OBE?
    /*
    $('.topquestions .commentSection #more').click(function () {});

    $('.topquestions #comment_to_active').click(function () {
      $(".topquestions .comment").css("display", "none");
      $(".topquestions .com_active").css("display", "inline");

      $(".topquestions .commentSection").show();

    });
    $('.topquestions #comment_to_inactive').click(function () {
      $(".topquestions .comment").css("display", "inline");
      $(".topquestions .com_active").css("display", "none");

      $(".topquestions .commentSection").hide();

    });


    //REPEAT FOR RECENT QUESTIONS

    $('.recentquestions .commentSection #more').click(function () {


    });

    $('.recentquestions #comment_to_active').click(function () {
      $(".recentquestions .comment").css("display", "none");
      $(".recentquestions .com_active").css("display", "inline");

      $(".recentquestions .commentSection").show();

    });
    $('.recentquestions #comment_to_inactive').click(function () {
      $(".recentquestions .comment").css("display", "inline");
      $(".recentquestions .com_active").css("display", "none");

      $(".recentquestions .commentSection").hide();

    });

    */

  }

    // TODO: These two should be mutually exclusive
    /**
     * Callback for the upvote button
     */
    var thumbsUpOnClickFn = function () {
      $(this).children()
        .removeClass("fa-thumbs-o-up")
        .addClass('fa-thumbs-up');

      var upvoteInfo = { // TODO: Implement
        room_id : '',
        question_id : ''
        };

      socket.emit('upvote question', upvoteInfo);
    }

    /**
     * Callback for the downvote button
     * @param qClass = string, the question class
     */
    var thumbsDownOnClickFn = function (qClass) {
      $(this).children()
        .removeClass("fa-thumbs-o-down")
        .addClass('fa-thumbs-down');

      var downvoteInfo = { // TODO: Implement
        room_id : '',
        question_id : ''
        };

      socket.emit('downvote question', downvoteInfo);
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
    topQuestionsUpdated: topQuestionsUpdatedImpl,
    setupUI: setupUIImpl
  }
}();
