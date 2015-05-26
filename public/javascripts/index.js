var socket = io.connect();

$(document).ready(function () {

  ViewActions.setupUI();

  /**
   * Socket Listeners
   */
  socket.on('create room', ViewActions.enterRoomOwner);
  socket.on('join room', ViewActions.enterRoom);
  socket.on('new question', ViewActions.questionAdded);
  socket.on('close room', ViewActions.showHomeScreen);
  socket.on('upvote question', ViewActions.updateScore);
  socket.on('downvote question', ViewActions.updateScore);
  socket.on('dismiss question', ViewActions.questionDismissed);
  socket.on('warn user', ViewActions.userWarned);
  socket.on('top questions', ViewActions.updateTopQuestionThreshold);
  socket.on('vote poll', ViewActions.updatePollScore);
  socket.on('start poll', ViewActions.startPoll);
  socket.on('stop poll', ViewActions.stopPoll);

  /**
   * UI Listeners
   */
  var body = $('body');
  body.on('submit', '#add-question', ViewActions.addQuestionOnClick);
  body.on('submit', '#search-questions', ViewActions.searchRecentQuestions);
  body.on('submit', '#login-info', ViewActions.joinMakeSubmit);
  body.on('click', '#join-create-room .btn',ViewActions.joinMakeOnClick);
  body.on('click', 'a.thumbs-up-to-active', ViewActions.thumbsUpOnClick);
  body.on('click', 'a.thumbs-down-to-active', ViewActions.thumbsDownOnClick);
  body.on('click', '.start-poll-btn', ViewActions.clickStartPoll);
  body.on('click', '.stop-poll-btn', ViewActions.clickStopPoll);
  body.on('click', '#clicker-modal-btn-group a', ViewActions.votePoll);
  body.on('click', '.drop-down-room-id', ViewActions.copyRoomId);
  body.on('click', '#test-in-progress-btn', ViewActions.showClickerDialog);
  body.on('show.bs.modal', '#graph-modal', ViewActions.flexModal);
  body.on('input', '#login-info input', ViewActions.joinMakeInput);
  body.one('shown.bs.modal', '#graph-modal', ViewActions.initializeGraph);

});
