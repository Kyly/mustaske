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

  /**
   * UI Listeners
   */
  var body = $('body');
  body.on('submit', '#add-question', ViewActions.addQuestionOnClick);
  body.on('submit', '#search-questions', ViewActions.searchRecentQuestions);
  body.on('click', '#join-create-room .btn',ViewActions.joinMakeOnClick);
  body.on('click', 'a.thumbs-up-to-active', ViewActions.thumbsUpOnClick);
  body.on('click', 'a.thumbs-down-to-active', ViewActions.thumbsDownOnClick);
  body.one('shown.bs.modal', '#graph-modal', ViewActions.initializeGraph);

});
