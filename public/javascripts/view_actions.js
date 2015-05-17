/**
 * Functions to interface with the DOM
 */

/**
 * This global, "static" object contains all functions for interacting with
 * the DOM. Additionally, all globals for DOM functions
 * are encapsulated here.
 */

var ViewActions = function () {

  var topQuestionsContainer = $('#top-questions-container');
  var topQuestionMax        = 5;
  var BASE_SCORE            = 1;

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
      var overlay = $('.login-overlay');

      $('#room-name-field').removeClass('has-error');
      var roomName = $('.room-name');

      roomName.text(roomInfo.room_name + ': ' + roomInfo.room_id);
      roomName.attr('room-id', roomInfo.room_id);
      overlay.addClass('animated slideOutUp');
      console.log('Room Id: ' + roomInfo.room_id);

      addAllQuestions(roomInfo)

    }
  }

  /**
   * Add all question to user screen. For when room is first joined.
   *
   * @param roomInfo = {room_name : string, room_id : string,
   * questions : array, top_questions : array}
   */
  var addAllQuestions = function(roomInfo) {

    var topQuestions = roomInfo.top_questions;
    var questions    = roomInfo.questions;

    if (questions.length !== 0) {
      $.each(questions, function(index, question) {
        question.class = 'recent-question';
        question.opt   = 'append';
        questionDiv(question);
      });
    }

    if (topQuestions.length !== 0) {
      $.each(topQuestions, function(index, question) {
        question.class = 'top-question';
        question.opt   = 'append';
        questionDiv(question);
      });
    }
  }

  /**
   * Return to the home screen
   */
  var showHomeScreenImpl = function () {
    // TODO
    $(".login-overlay").removeClass('animated slideOutUp')
      .addClass('animated slideInDown');
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
  var questionDismissedImpl = function (questionID) {
    var question = $("div[question_id='"+questionID+"']");
    var animationType = 'hinge';
    question.addClass("animated " + animationType);
    question.one(
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
      , function () { question.remove() }
    );

  }

  /**
   * Update UI reflecting a warning being issued
   * @param userId = string, the ID of the offending user
   */
  var userWarnedImpl = function (userID) {
    bootbox.alert('<h3><strong>Warning!!!!</strong> Must you really ask such a question?</h3>');
  }

  /**
   * Update UI reflecting a question being added
   * @param questionInfo = {question_id : string, question_text : string},
   * The ID of the question and the text content of the question
   */
  var questionAddedImpl = function (questionInfo) {

    questionInfo.class = 'recent-question';
    questionInfo.opt   = 'prepend';

    questionDiv(questionInfo);
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
   * Will update question score throughout page
   * @param questionInfo = {question_id : string, question_text : string,
   * score : int}
   */
  var updateScoreImpl = function(questionInfo) {

    var count    = topQuestionsContainer.mixItUp('getState').totalShow;
    var question = $('[question_id="'+questionInfo.question_id+'"]');
    var score    = questionInfo.score;

    question.attr('data-score', score);
    $('.num-votes', question).text(score);

    // Check if question is up voted
    if (score > BASE_SCORE) {

      if (inTopQuestions(question))
        // Re-sort top questions
        topQuestionsContainer.mixItUp('sort', 'score:desc');

      // Else add it to top questions
      else if (count <= topQuestionMax)
        topQuestionAdded(questionInfo)

    }

    // Remove question from top question has score less than BASE_SCORE
    else if (inTopQuestions(question)) {
      var animationType       = 'hinge';
      var questionInTop = topQuestionsContainer.find(question);

      questionInTop.addClass("animated " + animationType);
      questionInTop.one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
        , function () { questionInTop.remove() }
      );
    }
    // TODO updateTopQuestions
  }

  /**
   * Returns true if question is in top questions.
   *
   * @param question jQuery Object
   */
  var inTopQuestions = function (question) {
    return question.parent('#top-questions-container').length > 0;
  }

  var topQuestionAdded = function (topQuestionInfo) {
    // TODO: Function to add top question, called by topQuestionsUpdated
    // if we need to add a new top question to the list

    var topQuestion =  $('[question_id='+ topQuestionInfo.question_id+']').clone();
    topQuestion.removeClass('recent-question animated pulse');
    topQuestion.addClass('top-question mix');

    topQuestionsContainer.mixItUp('append', topQuestion);
    topQuestionsContainer.mixItUp('sort', 'score:desc');
  }

  /**
   * Call back for MixItUp top questions container. Removes excess question.
   *
   * @param state State Object from MixItUp
   * @see https://mixitup.kunkalabs.com/docs/#state-object
   */
  var checkMaxQuesitons = function(state) {
    var count = state.totalShow;

    for (; count > topQuestionMax; --count)
      $('.top-question:last').remove();
  }

  /**
   * Sets up the initial state of the page. When this function returns, the page
   * should be ready for the user
   */
  var setupUIImpl = function () {

    var mainContent = $('#main-content');


    /**
     * Callback for add question button
     * @param event = Object, JQuery event object
     */
    var addQuestionOnClickFn = function (event) {

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

    /**
     * Set up sorted container for top questions.
     * @see https://mixitup.kunkalabs.com/docs/#method-instantiate
     */
    topQuestionsContainer.mixItUp({
      layout: {
        display: 'block'
      },
      callbacks: {
        onMixEnd: checkMaxQuesitons
      }
    });


    $('#join-create-room .btn').click(joinMakeOnClickFn);

    $('#add-question').submit(addQuestionOnClickFn);

    mainContent.on('click', '.thumbs-up-to-active', thumbsUpOnClickFn);
    mainContent.on('click', '.thumbs-down-to-active', thumbsDownOnClickFn);

  }

  /**
   * Makes calls to either recent questions or top questions div functions.
   * @param questionInfo
   */
  var questionDiv = function(questionInfo) {

    switch (questionInfo.class) {
    case 'recent-question':
      recentQuestionsDiv(questionInfo);
      break;
    case 'top-question':
      topQuestionsDiv(questionInfo);
      break;
    }

  }

  /**
   * Returns a string containing the HTML of a topquestion_section div.
   * See line 193 of /views/index.html for a template
   * @param questionInfo = {question_id : string, question_text : string,
   * score : int}
   * @returns result = string, the recentquestion_section div
   */
  var recentQuestionsDiv = function(questionInfo) {

    var container = '#recent-questions-container';
    var html      = recentQuestionTpl(questionInfo);

    attachQuestion(questionInfo, container, html);

    // TODO Most likely need to append comments here
  }

  /**
   * Returns a string containing the HTML of a to totalTopQuestion div.
   * See line 94 of /views/index.html for a template
   * @param TODO: params list
   * @returns result = string, the topquestion_section div
   */
  var topQuestionsDiv = function(questionInfo) {

    var container = topQuestionsContainer;
    var html      = topQuestionTpl(questionInfo);


    attachQuestion(questionInfo, container, html);

    // TODO Most likely need to append comments here

  }

  // TODO: These two should be mutually exclusive
  /**
   * Callback for the upvote button
   */
  var thumbsUpOnClickFn = function () {

    var element = $(this).children();
    console.log(element);
    if (element.hasClass('fa-thumbs-o-up')) {
      element.removeClass("fa-thumbs-o-up").addClass('fa-thumbs-up');
    } else {
      element.removeClass("fa-thumbs-up").addClass('fa-thumbs-o-up');
    }

    var upvoteInfo = { // TODO: Implement
      room_id : '',
      question_id : ''
    };

    //socket.emit('upvote question', upvoteInfo);
  }

  /**
   * Callback for the downvote button
   */
  var thumbsDownOnClickFn = function () {

    var element = $(this).children();
    if (element.hasClass('fa-thumbs-o-down')) {
      element.removeClass("fa-thumbs-o-down").addClass('fa-thumbs-down');
    } else {
      element.removeClass("fa-thumbs-down").addClass('fa-thumbs-o-down');
    }

    var downvoteInfo = { // TODO: Implement
      room_id : '',
      question_id : ''
    };

    //socket.emit('downvote question', downvoteInfo);
  }

  /**
   * Either appends or prepend question html to a given container.
   * @param questionInfo
   * @param container
   * @param html
   */
  var attachQuestion = function (questionInfo, container, html) {

    switch(questionInfo.opt) {
    case 'prepend':
      $(container).prepend(html);
      break;
    case 'append':
      $(container).append(html);
      break;
    }

    $(container + ' [question_id='+ questionInfo.question_id +']')
      .addClass('animated pulse');

  }


  // TODO: Need Poll-related functions, when that functionality firms
  // up in the backend.

  return {
    enterRoomOwner: enterRoomOwnerImpl,
    enterRoom: enterRoomImpl,
    showHomeScreen: showHomeScreenImpl,
    updateTopQuestionThreshold: updateTopQuestionThresholdImpl,
    updateScore: updateScoreImpl,
    questionDismissed: questionDismissedImpl,
    userWarned: userWarnedImpl,
    questionAdded: questionAddedImpl,
    questionScoreChanged: questionScoreChangedImpl,
    setupUI: setupUIImpl
  }
}();
