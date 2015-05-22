var socket = io.connect();

$(document).ready(function () {

  ViewActions.setupUI();

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
});
