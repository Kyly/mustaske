var socket = io.connect();

$(document).ready(function () {

  ViewActions.setupUI();

  socket.on('create room', ViewActions.enterRoomOwner);
  socket.on('join room', ViewActions.enterRoom);
  socket.on('new question', ViewActions.questionAdded);
  socket.on('close room', ViewActions.showHomeScreen);
  socket.on('upvote question', ViewActions.questionScoreChanged);
  socket.on('downvote question', ViewActions.questionScoreChanged);
  socket.on('dismiss question', ViewActions.questionDismissed);
  socket.on('warn user', ViewActions.userWarned);


  // TODO: All stuff below here will be replaced by new functions in
  // ViewActions

  $('.topquestions #thumbs_up_to_active').click(function () {
    $('.topquestions #thumbs_up_to_active i')
      .removeClass("fa-thumbs-o-up")
      .addClass('fa-thumbs-up');
  });


  $('.topquestions #thumbs_down_to_active').click(function () {
    $('.topquestions #thumbs_down_to_active i')
      .removeClass("fa-thumbs-o-down")
      .addClass('fa-thumbs-down');

  });


  $('.topquestions .commentSection #more').click(function () {


  });

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

  $('.recentquestions #thumbs_up_to_active').click(function () {
    $('.recentquestions #thumbs_up_to_active i')
      .removeClass("fa-thumbs-o-up")
      .addClass('fa-thumbs-up');
  });

  $('.recentquestions #thumbs_down_to_active').click(function () {
    $('.recentquestions #thumbs_down_to_active i')
      .removeClass("fa-thumbs-o-down")
      .addClass('fa-thumbs-down');

  });


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

  $('#add-question').submit(function (event) {

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
  });

});
