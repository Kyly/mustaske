/**
 * Captures all events that happen within the application.
 */
var socket = io.connect();

$(document).ready(function () {

  ViewActions.setupUI();

  /**
   * Socket Listeners
   */
  socket.on('create room', ViewActions.enterRoomOwner);
  socket.on('join room', ViewActions.enterRoom);
  socket.on('new question', ViewActions.questionAdded);
  socket.on('leave room', ViewActions.showHomeScreen);
  socket.on('upvote question', ViewActions.updateScore);
  socket.on('downvote question', ViewActions.updateScore);
  socket.on('dismiss question', ViewActions.questionDismissed);
  socket.on('warn user', ViewActions.userWarned);
  socket.on('ban user', ViewActions.leaveRoom);
  socket.on('top questions', ViewActions.updateTopQuestionThreshold);
  socket.on('vote poll', ViewActions.updatePollScore);
  socket.on('start poll', ViewActions.startPoll);
  socket.on('stop poll', ViewActions.stopPoll);

  /**
   * UI Listeners for the HTML
   */
  var body = $('body');
  body.on('submit', 'form.askquestion', ViewActions.addQuestionOnClick);
  body.on('submit', '.search.search-questions', ViewActions.searchRecentQuestions);
  body.on('click', '.search-btn', ViewActions.searchRecentQuestions);
  body.on('click', '.clear-search-btn', ViewActions.clearSearchRecentQuestions);
  body.on('submit', '#login-info', ViewActions.joinMakeSubmit);
  body.on('input', '#login-info input', ViewActions.joinMakeInput);
  body.on('click', '#join-create-room .btn',ViewActions.joinMakeOnClick);
  body.on('click', 'a.thumbs-up-to-active', ViewActions.thumbsUpOnClick);
  body.on('click', 'a.thumbs-down-to-active', ViewActions.thumbsDownOnClick);
  body.on('click', '.start-poll-btn', ViewActions.clickStartPoll);
  body.on('click', '.stop-poll-btn', ViewActions.clickStopPoll);
  body.on('click', '#clicker-modal-btn-group a', ViewActions.votePoll);
  body.on('click', '.test-in-progress-btn', ViewActions.showClickerDialog);
  body.on('click', '.leave-room-btn', ViewActions.leaveRoom);
  body.on('click', '.dismiss-question', ViewActions.dismissQuestion);
  body.on('click', '.warn-user', ViewActions.warnUser);
  body.on('click', '.offcanvas-show-top-questions', ViewActions.showTopQuestions);
  body.on('click', '.offcanvas-show-recent-questions', ViewActions.showRecentQuestions);
  body.on('click', '#offcanvas-nav a.hide-on-click', ViewActions.hideOffcanvas);
  body.on('click', '#graph-modal .refresh-graph-btn', ViewActions.refreshGraph);
  body.one('shown.bs.modal', '#graph-modal', ViewActions.initializeGraph);
  $('#room-name-field > input').trigger('input').trigger('focus');
  $(window).load(ViewActions.attachScroll);

});
