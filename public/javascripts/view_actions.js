"use strict";
/**
 * Functions to interface with the DOM
 */
/**
 * This global, "static" object contains all functions for interacting with
 * the DOM. Additionally, all globals for DOM functions
 * are encapsulated here.
 */
var ViewActions = function () {

  var topQuestionsContainer, recentQuestionsContainer, MAX_TOP_QUESTIONS,
      BASE_SCORE, roomData, graph, owner, regexJoinRoom, activePoll, timer,
      questionTemplate, roomID, topQuestionsText, recentQuestionsText,
      deleteRoomMsg;

  /**
   * Sets up the initial state of the page. When this function returns, the page
   * should be ready for the user
   */
  var setupUIImpl = function () {

    regexJoinRoom            = /^([A-Za-z]+-[A-Za-z]+-\d+)$/;
    topQuestionsContainer    = $('#top-questions-container');
    recentQuestionsContainer = $('#recent-questions-container');
    questionTemplate         = Handlebars.compile($('#question-template').html());
    recentQuestionsText      = $('#recent-question-init-text').html();
    topQuestionsText         = $('#top-question-init-text').html();
    deleteRoomMsg            = $('#delete-room-msg').html();
    roomData                 = $('.room-name');
    timer                    = new Timer($('.start-poll-text'));
    activePoll               = false;
    MAX_TOP_QUESTIONS        = 5;
    BASE_SCORE               = 0;
    roomID                   = '';

    /**
     * Set up sorted container for top questions.
     * @see https://mixitup.kunkalabs.com/docs/#method-instantiate
     */
    topQuestionsContainer.mixItUp({
      layout: {
        display: 'block'
      },
      callbacks: {
        onMixEnd: checkMaxQuestions
      }
    });
  };

  /**
   * Actions for building graph in modal.
   * @see http://getbootstrap.com/javascript/#modals
   */
  var initializeGraphImpl = function () {
    var modal  = $(this);
    var canvas = modal.find('#pull-graph').get(0).getContext("2d");
    graph.createGraph(canvas);
  }


    var resizeQuestionContainers = function() {
        /**
         *    css doesn't really let you set the max-height to the parent container,
         *    then begin scrolling thereafter. As a result, we have to set the height
         *    manually on window resize
         */
        var topQ = $('#top-questions-container');
        var recQ = $('#recent-questions-container');
        var doc = $(document).height();
        var topQOffset = topQ.offset().top;
        var recQOffset = recQ.offset().top + $('.askquestion').outerHeight();
        topQ.css('height', doc - topQOffset +'px' );
        recQ.css('height', doc - recQOffset +'px' );
    };

//============================================================================//
//---------------------------- Join/Make Room --------------------------------//
//============================================================================//
  /**
   * Enter the room as an owner
   * @param roomInfo = {room_id : string, room_name : string,
   * owner_id : string}
   */
  var enterRoomOwnerImpl = function (roomInfo) {
    if (!roomInfo) {
      $('#login-info .room-name-field').addClass('has-error');
    }
    else {
      roomData.data('owner', true);
      $('body').find('.owner-view').each(function () {
        $(this).removeClass('hidden').addClass('show');
      });
      $('.student-view').addClass('hidden');
      $('span.leave-room-text').text('Delete Room');
      owner = true;
      graph = new Graph();
      roomInit(roomInfo);
    }
  }

  /**
   * Enter the room as an audience member
   * @param roomInfo = {room_name : string, room_id : string,
   * questions : array, top_questions : array}
   */
  var enterRoomImpl = function (roomInfo) {
    owner = false;
    if (!roomInfo) {
      $('#room-name-field').addClass('has-error');
    }
    else {
      if (roomID === '' || roomID !== roomInfo.room_id) {
        console.log('Room Id: ' + roomInfo.room_id);
        roomInit(roomInfo);
        addAllQuestions(roomInfo);
      } else {
        $('.login-overlay').addClass('animated slideOutUp');
      }

      if (roomInfo.active_poll) {
        activePoll = roomInfo.active_poll;
        $('.test-in-progress-btn').addClass('active');
      }
    }
  }

  var roomInit = function (roomInfo) {
    roomID = roomInfo.room_id;
    //topQuestionsContainer.html(topQuestionsText);
    //recentQuestionsContainer.html(recentQuestionsText);
    $('#room-name-field').removeClass('has-error');
    roomData.html(roomInfo.room_name);
    roomData.attr('data-room-id', roomID);
    $('.login-overlay').addClass('animated slideOutUp');
    $('.drop-down-room-id').text(roomID);

  }

  /**
   * Callback for leave room action.
   */
  var leaveRoomImpl = function () {
    var room_id = $('.room-name').data('room-id');

    if (owner) {
      bootbox.dialog({
        message: deleteRoomMsg,
        title: "<strong>Are you sure?</strong>",
        buttons: {
          main:    {
            label:     "Stay",
            className: "btn-success"
          },
          danger:  {
            label:     "Delete",
            className: "btn-danger",
            callback:  function () {
              owner = false;
              socket.emit('leave room', room_id);
            }
          }
        }
      });
    } else {
      socket.emit('leave room', room_id);
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

    if (topQuestions.length > 0 || questions.length > 0)
      removePlaceHolderImpl();


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
    topQuestionsContainer.mixItUp('sort', 'score:desc');
  }

  /**
   * Return to the home screen
   */
  var showHomeScreenImpl = function () {
    $(".login-overlay")
      .removeClass('animated slideOutUp')
      .addClass('animated slideInDown');

  }

  /**
   * Callback for the home screen join and make buttons
   */
  var joinMakeOnClickImpl = function () {
    var textBox  = $('#room-name-field input');
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
      ViewActions.resizeQuestionContainers();
    }
  }

  /**
   * Call back for join button on login view
   */
  var joinMakeInputImpl = function () {
    var input = $(this).val();
    var join  = $('#join-room');
    var make  = $('#make-room');

    if (input !== '') {
      make.removeClass('disabled');
    } else {
      make.addClass('disabled');
      join.addClass('disabled');
    }

    if (regexJoinRoom.test(input)) {
      join.removeClass('disabled').addClass('animated bounce');
    } else {
      join.addClass('disabled').removeClass('animated bounce');
    }
  }

  /**
   * Submit callback for login view
   */
  var joinMakeSubmitImpl = function (event) {
    $('.make-join-warning')
      .css('visibility','visible')
      .addClass('animated fadeInUp');

    setTimeout(function() {
      var makeJoin = $('.make-join-warning');
      makeJoin
        .removeClass('animated fadeInUp')
        .addClass('animated fadeOutDown');

      makeJoin
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
          $(this).removeClass('animated fadeOutDown').css('visibility', 'hidden');
        }
      );
    }, 5000);
    event.preventDefault();
  }


//============================================================================//
//---------------------------- Question View ---------------------------------//
//============================================================================//

  var removePlaceHolderImpl = function (questionInfo) {
    $('.init-text').addClass('animated fadeOutDown');

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
    var question = $('div[question_id="'+questionID+'"]');
    question.remove();

  }

  /**
   * Update UI reflecting a warning being issued
   * @param userId = string, the ID of the offending user
   */
  var userWarnedImpl = function () {
    bootbox.alert('<h3><strong>Warning!!!!</strong> Must you really ask such a question?</h3>');
  }

  /**
   * Update UI reflecting user being banned
   * @param userId = string, the ID of the offending user
   */
  var userBannedImpl = function (userID) {
    //right now showHomeScreen() is called when user is banned
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
   * @param questionInfo = {question_id : string, question_text : string,
   * score : int}
   */
  var updateScoreImpl = function(questionInfo) {

    var question = $('[question_id="'+questionInfo.question_id+'"]');
    var score    = questionInfo.question_score;
    question.attr('data-score', score);

    $('.num-votes', question).text(score);

    // Check if question is up voted
    if (score > BASE_SCORE) {
      if (!inTopQuestions(question))
        topQuestionAdded(questionInfo);
      else
        $("[question_id='"+questionInfo.question_id+"']",topQuestionsContainer)
          .removeClass('dont-show')
          .addClass('do-show');
    }
    // Hide question from top question has score less than BASE_SCORE
    else if (inTopQuestions(question)) {
      $("[question_id='"+questionInfo.question_id+"']",topQuestionsContainer)
        .removeClass('do-show')
        .addClass('dont-show');
    }
    //invoke mixItUp to sort the div
    topQuestionsContainer.mixItUp('filter', '.do-show');
    topQuestionsContainer.mixItUp('sort', 'score:desc');
  }

  /**
   * Returns true if question is in top questions.
   * @param question jQuery Object
   */
  var inTopQuestions = function (question) {
    return question.parent('#top-questions-container').length > 0;
  }

  var topQuestionAdded = function (topQuestionInfo) {
    var topQuestion =  $('[question_id='+ topQuestionInfo.question_id+']').clone();
    topQuestion.removeClass('recent-question animated pulse');
    topQuestion.addClass('top-question mix do-show');
    //invoke mixItUp to sort the div
    topQuestionsContainer.mixItUp('append', topQuestion, {sort:'score:desc'});
    //topQuestionsContainer.mixItUp('sort', 'score:desc');
  }

  /**
   * Call back for MixItUp top questions container. Removes excess question.
   *
   * @param state State Object from MixItUp
   * @see https://mixitup.kunkalabs.com/docs/#state-object
   */
  var checkMaxQuestions = function(state) {
    //var count = state.totalShow;
    //
    //for (; count > MAX_TOP_QUESTIONS; --count)
    //  $('.top-question:last').remove();
  }

  /**
   * Search callback
   */
  var searchRecentQuestionsImpl = function (event) {
    event.preventDefault();

    var term_offcanvas = $('#search-text-xs').val();
    var term_oncanvas  = $('#search-text-sm').val();
    var term           = '';
    var recentQuestion = $('.recent-question');

    term = ( term_offcanvas !== "" ) ? term_offcanvas
      : ( term_oncanvas !== "" ) ? term_oncanvas : '';
    
    if (term !== '') {
      recentQuestion.hide();
      recentQuestion.each(function(){
        if($(this).text().toLowerCase().indexOf(term.toLowerCase()) != -1){
          $(this).show();
        }
      });
    }

    else
      recentQuestion.show();

    hideOffcanvasImpl();
  }

  /**
   * Callback for add question button
   */
  var addQuestionOnClickImpl = function (event) {
    var textBox      = $('.add-question-text');
    var questionText = textBox.val();
    var data = {
      question_text: questionText,
      room_id: $('.room-name').data('room-id')
    };
    socket.emit('new question', data);
    textBox.val('');
    event.preventDefault();
  }


  /**
   * Update a field of the graph. Pass it the index of the sum of votes
   * and the new number of votes.
   * @param data = {key: data index number, value: number of votes}
   */
  var updateGraphImpl = function(data) {
    graph.updateValue(data.key, data.value);
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
   * question_score : int}
   * @returns result = string, the recentquestion_section div
   */
  var recentQuestionsDiv = function(questionInfo) {
    var container = '#recent-questions-container';
    var html      = questionTemplate(questionInfo);
    attachQuestion(questionInfo, container, html);
  }

  /**
   * Returns a string containing the HTML of a to totalTopQuestion div.
   * See line 94 of /views/index.html for a template
   * @param TODO: params list
   */
  var topQuestionsDiv = function(questionInfo) {
    // Add mix class for sorting
    questionInfo.class += ' mix do-show';
    var container       = $('#top-questions-container');
    var html  = questionTemplate(questionInfo);
    attachQuestion(questionInfo, container, html);

  }

  /**
   * Callback for the upvote button
   */
  var thumbsUpOnClickImpl = function () {
    var roomID     = roomData.data('room-id');
    var questionID = $(this).closest('.q').attr('question_id');
    var question   = $("[question_id='"+questionID+"']");
    var thumbsUp   = $('a.thumbs-up-to-active i', question);
    var thumbsDown = $('a.thumbs-down-to-active i', question);
    var upvoteInfo = {
      room_id     : roomID,
      question_id : questionID
    };

    if (thumbsUp.hasClass('fa-thumbs-o-up')) {
      thumbsUp.removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up clicked');
      if (thumbsDown.hasClass('clicked')) {
        thumbsDown.removeClass('fa-thumbs-down clicked').addClass('fa-thumbs-o-down');
      }
    } else {
      thumbsUp.removeClass('fa-thumbs-up clicked').addClass('fa-thumbs-o-up');
    }

    socket.emit('upvote question', upvoteInfo);

  }

  /**
   * Callback for the downvote button
   */
  var thumbsDownOnClickImpl = function () {

    var roomID     = roomData.data('room-id');
    var questionID = $(this).closest('.q').attr('question_id');
    var question   = $("[question_id='"+questionID+"']");
    var thumbsDown = $('a.thumbs-down-to-active i', question);
    var thumbsUp   = $('a.thumbs-up-to-active i', question);

    if (thumbsDown.hasClass('fa-thumbs-o-down')) {
      thumbsDown.removeClass('fa-thumbs-o-down').addClass('fa-thumbs-down clicked');
      if (thumbsUp.hasClass('clicked')) {
        thumbsUp.removeClass('fa-thumbs-up clicked').addClass('fa-thumbs-o-up');
      }
    } else {
      thumbsDown.removeClass('fa-thumbs-down clicked').addClass('fa-thumbs-o-down');
    }

    var downvoteInfo = { // TODO: Implement
      room_id     : roomID,
      question_id : questionID
    };

    socket.emit('downvote question', downvoteInfo);
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

    var question = $(' [question_id='+ questionInfo.question_id +']');

    if (questionInfo.class === 'recent-question')
      $(question, container).addClass('animated pulse');

    if (questionInfo.class.indexOf('top-question') > 0) {
      topQuestionsContainer.mixItUp('append', question, {sort:'score:desc'});
    }

    if (owner) {
      var body = $('body');
      body.find('.owner-view').each(function () {
        $(this).removeClass('hidden').addClass('show');
      });
      body.find('.student-view').each(function () {
        $(this).addClass('hidden');
      });
    }
  }

//============================================================================//
//-------------------------------- Polls -------------------------------------//
//============================================================================//

  /**
   * Sends out user vote for the poll.
   */
  var votePollImpl = function () {
    if (!owner) {
      var data = {
        room_id: $('.room-name').data('room-id'),
        option: $(this).text()
      };
      socket.emit('vote poll', data);
      $('.test-in-progress-btn').addClass('done');
    }
  }
  /**
   * Updates the poll results graph
   */
  var updatePollScoreImpl = function (results) {
    if (owner) {
      graph.updateData(results);
      graph.update();
    }
  }

  /**
   * Sets poll to active
   */
  var clickStartPollImpl = function () {
    if (owner) {
      var data = {
        room_id: $('.room-name').data('room-id'),
        active: true
      };
      socket.emit('set active poll', data);
    }
  }

  /**
   * Sets poll to inactive
   */
  var clickStopPollImpl = function () {
    if (owner) {
      var data = {
        room_id: $('.room-name').data('room-id'),
        active: false
      };
      socket.emit('set active poll', data);
    }
  }

  /**
   * Show dialog when poll first starts
   */
  var startPollImpl = function () {
    activePoll = true;
    if (!owner) {
      $('.test-in-progress-btn').addClass('active');
      $('#clicker-modal').modal('show');
    } else {
      timer.start();
      $('.start-poll-btn').addClass('poll-on');
      graph.clearData();
    }
  }

  /**
   * Sets poll to inactive
   */
  var stopPollImpl = function () {
    activePoll = false;
    if (!owner) {
      $('.test-in-progress-btn').removeClass('done active');
      $('#clicker-modal').modal('hide');
    } else {
      timer.stop();
      $('.start-poll-btn').removeClass('poll-on');
    }
  }

//============================================================================//
//------------------------------ Dismiss/Warn --------------------------------//
//============================================================================//

  /**
   * Calls controller to dismiss a question
   */
  var dismissQuestionImpl = function () {
    var data = {
      room_id: $('.room-name').data('room-id'),
      question_id: $(this).closest('.q').attr('question_id')
    };
    socket.emit('dismiss question', data);
  }

  /**
   * Calls controller to warn a user
   */
  var warnUserImpl = function () {
    var question = $(this);

    var data = {
      room_id: $('.room-name').data('room-id'),
      question_id: question.closest('.q').attr('question_id')
    };

    // TODO This need to work
    $('i',$(this)).addClass('text-danger');
    socket.emit('warn user', data);
  }

  /**
   * Calls controller to ban a user
   */
  var banUserImpl = function () {
    var data = {
      room_id: $('.room-name').data('room-id'),
      question_id: $(this).closest('.q').attr('question_id')
    };
    socket.emit('ban user', data);
  }

  /**
   * Displays clicker dialog after poll already started
   */
  var showClickerDialogImpl = function () {
    if (activePoll && !owner) {
      $('#clicker-modal').modal('show');
    }
  }

  // TODO Don't think this is really working
  var flexModalImpl = function () {
    $(this).find('.modal-body').css({
      width:'auto', //probably not needed
      height:'auto', //probably not needed
      'max-height':'100%'
    });
  }

  var refreshGraphImpl = function () {
    graph.refresh();
  }

//============================================================================//
//----------------------------- Room Controls --------------------------------//
//============================================================================//
  var copyRoomIdImpl = function (event) {
    event.stopPropagation();
  }

//============================================================================//
//--------------------------------- Nav --------------------------------------//
//============================================================================//
  var showTopQuestionsImpl = function() {
    var recentSection = $('.recent-questions-section');

    if (!recentSection.hasClass('hidden')) {
      recentSection.addClass('hidden');
      $(this).addClass('active');
      $('.offcanvas-show-recent-questions').removeClass('active');
    }
    ViewActions.resizeQuestionContainers();
  }

  var showRecentQuestionsImpl = function() {
    var recentSection = $('.recent-questions-section');
    if (recentSection.hasClass('hidden')) {
      recentSection.removeClass('hidden');
      $(this).addClass('active');
      $('.offcanvas-show-top-questions').removeClass('active');
    }
    ViewActions.resizeQuestionContainers();
  }

  var hideOffcanvasImpl = function () {
    $('#offcanvas-nav').offcanvas('hide');
  }

  var offCanvasFixImpl = function() {
    //$(.css('position','static');
  }

  return {
    refreshGraph               : refreshGraphImpl,
    removePlaceHolder          : removePlaceHolderImpl,
    hideOffcanvas              : hideOffcanvasImpl,
    resizeQuestionContainers   : resizeQuestionContainers,
    showRecentQuestions        : showRecentQuestionsImpl,
    showTopQuestions           : showTopQuestionsImpl,
    offCanvasFix               : offCanvasFixImpl,
    showClickerDialog          : showClickerDialogImpl,
    joinMakeSubmit             : joinMakeSubmitImpl,
    joinMakeInput              : joinMakeInputImpl,
    flexModal                  : flexModalImpl,
    copyRoomId                 : copyRoomIdImpl,
    initializeGraph            : initializeGraphImpl,
    thumbsDownOnClick          : thumbsDownOnClickImpl,
    thumbsUpOnClick            : thumbsUpOnClickImpl,
    joinMakeOnClick            : joinMakeOnClickImpl,
    addQuestionOnClick         : addQuestionOnClickImpl,
    searchRecentQuestions      : searchRecentQuestionsImpl,
    updateGraph                : updateGraphImpl,
    enterRoomOwner             : enterRoomOwnerImpl,
    enterRoom                  : enterRoomImpl,
    leaveRoom                  : leaveRoomImpl,
    showHomeScreen             : showHomeScreenImpl,
    updateTopQuestionThreshold : updateTopQuestionThresholdImpl,
    updateScore                : updateScoreImpl,
    questionDismissed          : questionDismissedImpl,
    userWarned                 : userWarnedImpl,
    userBanned                 : userBannedImpl,
    questionAdded              : questionAddedImpl,
    setupUI                    : setupUIImpl,
    votePoll                   : votePollImpl,
    updatePollScore            : updatePollScoreImpl,
    clickStartPoll             : clickStartPollImpl,
    clickStopPoll              : clickStopPollImpl,
    startPoll                  : startPollImpl,
    stopPoll                   : stopPollImpl,
    dismissQuestion            : dismissQuestionImpl,
    warnUser                   : warnUserImpl,
    banUser                    : banUserImpl
  }
}();
